#!/usr/bin/env node
/*
 * Packages Claude Code Quest as a self-contained SCORM 1.2 course (.zip).
 * ---------------------------------------------------------------------------
 * Output: claude-code-quest-scorm12.zip in the repo root — a SCORM 1.2
 * "Package Interchange File" (imsmanifest.xml at the archive root + the full
 * web build + the LMS run-time bridge). Importable into virtually any LMS
 * (Moodle, Cornerstone, SuccessFactors, TalentLMS, Docebo, SCORM Cloud, …).
 *
 * Steps:
 *   1. Build the app with a RELATIVE base ("./") so every asset URL resolves
 *      from whatever nested directory the LMS serves the package out of.
 *   2. Stage the build, drop in scorm-api.js, and wire it into index.html.
 *   3. Normalize any leftover root-absolute URLs to relative (LMS-subdir safe).
 *   4. Generate imsmanifest.xml enumerating every packaged file.
 *   5. Zip the staged folder with imsmanifest.xml at the archive root.
 *
 * Run:  npm run build:scorm
 */
import { execSync } from 'node:child_process';
import {
  existsSync, rmSync, mkdirSync, cpSync,
  readFileSync, writeFileSync, readdirSync, statSync,
} from 'node:fs';
import { join, relative, dirname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const dist = join(root, 'dist');
const stage = join(root, 'scorm-build');
const zipName = 'claude-code-quest-scorm12.zip';
const outZip = join(root, zipName);

function run(cmd, opts = {}) {
  execSync(cmd, { cwd: root, stdio: 'inherit', ...opts });
}

// 1) Type-check + build with a relative base.
console.log('\n› [1/5] building app (tsc + vite, base="./") ...');
run('npx tsc -b');
run('npx vite build --base=./');

// 2) Stage the build and add the SCORM run-time bridge.
console.log('› [2/5] staging build + adding SCORM bridge ...');
if (existsSync(stage)) rmSync(stage, { recursive: true, force: true });
mkdirSync(stage, { recursive: true });
cpSync(dist, stage, { recursive: true });
cpSync(join(here, 'scorm-api.js'), join(stage, 'scorm-api.js'));

// 3) Wire the bridge into index.html + harden asset URLs for LMS subdirs.
console.log('› [3/5] patching index.html ...');
const indexPath = join(stage, 'index.html');
let html = readFileSync(indexPath, 'utf8');
if (!html.includes('scorm-api.js')) {
  // Load the bridge before the app bundle so window.SCORM is ready on mount.
  html = html.replace('</head>', '    <script src="scorm-api.js"></script>\n  </head>');
}
// Any remaining `src="/..."` / `href="/..."` (e.g. favicon) → relative.
html = html.replace(/\b(src|href)="\/(?!\/)/g, '$1="./');
writeFileSync(indexPath, html);

// 4) Generate the SCORM 1.2 manifest enumerating every staged file.
console.log('› [4/5] writing imsmanifest.xml ...');
function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else out.push(relative(stage, full).split(sep).join('/'));
  }
  return out;
}
const files = walk(stage).filter(f => f !== 'imsmanifest.xml').sort();
const fileEls = files.map(f => `        <file href="${f}"/>`).join('\n');

const manifest = `<?xml version="1.0" encoding="UTF-8"?>
<manifest identifier="CLAUDE-CODE-QUEST" version="1.2"
  xmlns="http://www.imsproject.org/xsd/imscp_rootv1p1p2"
  xmlns:adlcp="http://www.adlnet.org/xsd/adlcp_rootv1p2"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.imsproject.org/xsd/imscp_rootv1p1p2 imscp_rootv1p1p2.xsd http://www.imsglobal.org/xsd/imsmd_rootv1p2p1 imsmd_rootv1p2p1.xsd http://www.adlnet.org/xsd/adlcp_rootv1p2 adlcp_rootv1p2.xsd">
  <metadata>
    <schema>ADL SCORM</schema>
    <schemaversion>1.2</schemaversion>
  </metadata>
  <organizations default="ORG-CCQ">
    <organization identifier="ORG-CCQ">
      <title>Claude Code Quest</title>
      <item identifier="ITEM-CCQ" identifierref="RES-CCQ" isvisible="true">
        <title>Claude Code Quest</title>
        <adlcp:masteryscore>100</adlcp:masteryscore>
      </item>
    </organization>
  </organizations>
  <resources>
    <resource identifier="RES-CCQ" type="webcontent" adlcp:scormtype="sco" href="index.html">
${fileEls}
    </resource>
  </resources>
</manifest>
`;
writeFileSync(join(stage, 'imsmanifest.xml'), manifest);

// 5) Zip with imsmanifest.xml at the archive ROOT (required by SCORM).
console.log('› [5/5] zipping package ...');
if (existsSync(outZip)) rmSync(outZip);
run(`zip -r -X "${outZip}" . -x ".*"`, { cwd: stage });

const sizeMB = (statSync(outZip).size / (1024 * 1024)).toFixed(2);
console.log(`\n✓ SCORM 1.2 package ready: ${zipName} (${sizeMB} MB, ${files.length + 1} files)`);
