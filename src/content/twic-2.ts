import type { LessonContent } from './types';

/**
 * twic-2 (Feature B) — `archive` plugin source: a plugin can now be installed
 * from a zip fetched over HTTPS, without git or npm in the path, with optional
 * SHA-256 pinning so the download only installs if its hash matches the value
 * you recorded. This sits beside the existing git and npm plugin sources as a
 * third way to distribute a plugin — a self-contained package at a URL rather
 * than a repo to clone or a registry entry to resolve.
 * Sources (Claude Code CHANGELOG 2.1.224):
 *   - "Added `archive` plugin source: install plugins from a zip over HTTPS
 *      without git or npm, with optional SHA-256 pinning"
 * Field shapes are fixed by the TWiC scaffolding; only the strings change weekly.
 */
export const twic2Content: LessonContent = {
  roomId: 'twic-room-2',
  intro:
    "Room 2, and the Beat Reporter picks up how a plugin gets *to* you in the first place. Alongside cloning a git repo or resolving an npm package, there's now a third door: the `archive` source installs a plugin from a plain zip fetched over HTTPS — no git, no npm — and it can be *pinned* to a SHA-256 hash so the download installs only if its bytes match what you recorded. The two books cover how the archive source and its hash pin work, and why a consultant handing a plugin to a client (or pulling one into a locked-down environment) should reach for the sealed, pinned package. Clear the door's question for the key, then face the wraith beyond it: a ghost that hands you a sealed parcel and swears the seal will tell you if anyone's been inside.",
  prompt:
    "What does the new `archive` plugin source let you do?",
  choices: [
    { id: 'a', label: "Install a plugin from a zip fetched over HTTPS — no git or npm in the path — with optional SHA-256 pinning so it installs only if the download's hash matches the value you recorded", correct: true },
    { id: 'b', label: "Compress an installed plugin into a zip archive so you can email it to a teammate", correct: false },
    { id: 'c', label: "Encrypt a plugin at rest so it can only run after you supply a decryption key each session", correct: false },
    { id: 'd', label: "Mirror a git-hosted plugin locally so it keeps working after the upstream repository is deleted", correct: false },
  ],
  passFeedback: "HIT! `archive` is a *source* — a way to install. Point it at a zip over HTTPS and Claude Code fetches and installs it with neither git nor npm involved. Add a SHA-256 pin and the install is refused unless the download hashes to exactly the value you recorded, so a swapped or corrupted package can't slip in.",
  failFeedback: "MISS! It's not about zipping up or emailing an installed plugin, it's not at-rest encryption, and it's not a mirror of a git repo. It's a third install *source*: a zip over HTTPS, optionally SHA-256-pinned. Re-read Book 1.",
  lore: [
    {
      id: 'twic-2-lore-a',
      text: `**The \`archive\` Source — A Plugin From a Zip, Sealed With a Hash**

**A third way to say where a plugin comes from**

The 2.1.224 line is one sentence: *"Added \`archive\` plugin source: install plugins from a zip over HTTPS without git or npm, with optional SHA-256 pinning."* A plugin *source* is just the answer to "where does this come from." Two answers already existed: a git source clones a repository, an npm source resolves a package from a registry. \`archive\` adds a third — the plugin is a self-contained zip sitting at an HTTPS URL, and installing it means fetching that file and unpacking it. Nothing clones, nothing resolves a dependency tree.

**Why "without git or npm" is the point, not a footnote**

Dropping git and npm from the path is the feature, not a caveat. It means a machine can install a plugin with neither a git client nor a package manager present — a stripped-down CI image, a hardened runner, a locked-down client box where npm is simply not allowed. The install surface shrinks to one thing: an HTTPS GET. Fewer tools in the path means fewer moving parts to trust and fewer to go wrong.

**The SHA-256 pin, and what it actually guarantees**

The optional part is the interesting part. SHA-256 is a hash — a fixed fingerprint computed from a file's exact bytes, where changing a single byte changes the fingerprint completely. Pin an archive to a SHA-256 value and Claude Code computes the hash of what it downloaded and compares: match, it installs; mismatch, it refuses. That's *integrity*, not secrecy — the pin doesn't hide the plugin, it proves the bytes you got are the exact bytes you expected. A package silently swapped at the URL, or mangled in transit, fails the check instead of installing quietly.

> Takeaway: The \`archive\` source installs a plugin from a plain HTTPS zip with neither git nor npm required, and an optional SHA-256 pin makes the install verify the download's fingerprint against a value you recorded — so only the exact package you vetted ever lands.`,
    },
    {
      id: 'twic-2-lore-b',
      text: `**Shipping Tools You Can Stand Behind — Distribution on a Client Engagement**

**The trust problem in "just install our plugin"**

Book 1 was the how; here's why it matters when a plugin crosses an org boundary. On an engagement you often hand a client a plugin — your firm's review checklist, a scaffolder, an internal workflow — or pull a vendor's plugin into a client's environment. The uncomfortable questions are the client's: where is this coming from, and how do I know what I install today is what you vetted last week? "Clone our repo" and "npm install our package" both drag in a whole toolchain and a whole trust chain. A pinned archive answers both questions with one artifact and one hash.

**Reproducible installs in places that forbid the usual tools**

The "without git or npm" clause is what makes this land in the environments that matter. A hardened client runner, an air-gapped-adjacent build box, a minimal container — these are exactly the places that won't have npm and may not have git, and exactly the places a consultant needs a plugin to install *reproducibly*. Host the zip somewhere the box can reach over HTTPS, pin the hash, and every install of that URL is byte-identical or it doesn't happen. No "works on my machine" drift between what you tested and what the client ran.

**The pin is a supply-chain control, so treat it like one**

Record the SHA-256 the way you'd record any control: alongside the URL, in the config or runbook you hand over, so an auditor can see that the install is pinned and to what. If the upstream package legitimately changes, the hash changes and the install fails loudly — which is the behavior you want, because it forces a human to re-vet and re-pin rather than letting a new version slip in unnoticed. An unpinned archive is convenient; a pinned one is defensible.

> Takeaway: Use a pinned \`archive\` source when a plugin crosses an org boundary or lands in a locked-down box — one HTTPS zip installs without git or npm, the SHA-256 pin makes every install byte-identical to what you vetted, and a legitimate upstream change fails loudly instead of sneaking in.`,
    },
  ],
  practice: {
    id: 'twic-2-practice',
    template: `The client's build box is locked down — no npm, and git isn't guaranteed either —
but they still need our review plugin. So instead of a repo to clone, I'll ship it as a ____
that the box pulls over ____.
To make the install defensible, I'll ____ it to the exact hash of the package I vetted,
so a swapped or corrupted download ____ instead of installing quietly.
I'll record that hash right next to the URL in the runbook I hand over.`,
    blanks: [
      { id: 'artifact', suggestions: ['zip archive', 'self-contained package', 'sealed archive'] },
      { id: 'transport', suggestions: ['HTTPS', 'a plain HTTPS GET', 'an HTTPS URL'] },
      { id: 'pin-verb', suggestions: ['SHA-256-pin', 'pin', 'lock'] },
      { id: 'fail-mode', suggestions: ['fails the check', 'is refused', 'stops the install'] },
    ],
    prize: { id: 'twic-2-prize', label: 'TWIC · MID-WEEK' },
  },
  conversations: {
    'twic-npc-2': {
      summary:
        "The `archive` plugin source (2.1.224): a third way to install a plugin, beside git (clone a repo) and npm (resolve a package). `archive` installs a plugin from a plain zip fetched over HTTPS, with neither git nor npm required in the path — so a stripped-down CI image, hardened runner, or locked-down client box can install it with just an HTTPS GET. The optional SHA-256 pin is the safety feature: SHA-256 is a fingerprint of the file's exact bytes, so pinning makes Claude Code compute the download's hash and install only if it matches the value you recorded — a swapped or corrupted package fails the check instead of installing quietly. It's an integrity control, not secrecy: the pin proves the bytes are the ones you vetted, it doesn't hide the plugin. For a consultant this is how you distribute a plugin across an org boundary or into a minimal environment reproducibly — host the zip, pin the hash, record it in the runbook, and every install is byte-identical to what you vetted or it doesn't happen.",
      beats: [
        { kind: 'say', text: "Second story is about how a plugin even reaches you. A *source* is just 'where does this come from.' You already had two answers — git clones a repo, npm resolves a package. The 2.1.224 line adds a third: `archive`. Install a plugin straight from a zip over HTTPS, with neither git nor npm in the path." },
        { kind: 'say', text: "That 'without git or npm' bit isn't a footnote — it's the whole point. It means a box with no package manager and maybe no git client can still install a plugin. A hardened CI image, a locked-down client machine — the install shrinks to one thing: an HTTPS GET of a zip. Fewer tools in the path, fewer things to trust and fewer to break." },
        { kind: 'say', text: "Then the optional half, which is the part I care about most: SHA-256 pinning. SHA-256 is a fingerprint of a file's exact bytes — change one byte and the fingerprint changes completely. Pin an archive to a hash and Claude Code checks the download against it: match, it installs; mismatch, it refuses. You get exactly the bytes you vetted, or you get nothing." },
        {
          kind: 'choice',
          prompt: "A security lead asks what the SHA-256 pin buys them. What's the honest answer — what does the pin actually guarantee?",
          options: [
            { id: 'integrity', label: "Integrity: the install only proceeds if the download's bytes hash to the value you recorded, so a swapped or corrupted package is refused", correct: true, reaction: "Right, and say it precisely: it's integrity, not secrecy. The pin doesn't hide or encrypt the plugin — it proves the package you got is byte-identical to the one you vetted. A silent swap at the URL fails the check." },
            { id: 'encryption', label: "Confidentiality: the pin encrypts the plugin so nobody can read it without the hash", correct: false, reaction: "No — a hash isn't a key. SHA-256 pinning verifies the download hasn't changed; it doesn't encrypt or hide anything. The plugin is as readable as any zip; what's guaranteed is that it's the *right* zip." },
            { id: 'availability', label: "Availability: the pin keeps a local copy so the plugin still installs if the URL goes down", correct: false, reaction: "Not that. The pin is about the bytes matching, not about caching or uptime. If the URL is down there's nothing to hash; what the pin promises is that whatever you *do* download is exactly what you expected." },
          ],
        },
        { kind: 'say', text: "So the engagement play: any time a plugin crosses an org boundary — you handing a client your firm's review plugin, or pulling a vendor's into a client's box — reach for a pinned archive. One HTTPS zip installs without dragging in a toolchain, and the pin means every install is byte-identical to what you tested. No 'works on my machine' drift between your bench and theirs." },
        { kind: 'say', text: "And treat the hash like the control it is: record the SHA-256 right next to the URL in the runbook you hand over, so an auditor sees the install is pinned and to what. If the upstream legitimately changes, the hash changes and the install fails *loudly* — which is what you want, because it forces a human to re-vet and re-pin instead of letting a new version sneak in." },
        { kind: 'say', text: "Books have the full source model and exactly what the pin guarantees. The door wants one thing: what does the `archive` source let you do? Answer for the key. Then face Sealwarden past the arch — a wraith that hands you a parcel bound with a wax seal and swears the seal, not the wrapping, is what tells you whether anyone's been inside." },
      ],
    },
  },
  battle: {
    name: 'Sealwarden, the Pinned Parcel Wraith',
    spriteKey: 'ghost',
    maxHP: 1,
    playerHP: 5,
    phases: 1,
    introLine: "*a hooded shade drifts forward holding a plain parcel bound in cord, a wax seal pressed hard across the knot* …take the package, operator — no cart of tools rolls behind it, only the parcel and its seal… but tell me what the seal is *for*, or carry a stranger's bundle and never know whose hand packed it…",
    tauntLines: [
      "*the wax seal glints, unbroken* you think the seal *hides* what's within? no — press it and read it… it tells you only whether the bytes are the ones you trusted…",
      "*the cord tightens on its own* you'd swap my parcel for another and hope I don't notice? the seal would not match, and the door would not open… try again…",
    ],
    victoryLine: "*the seal holds firm as the wraith offers the parcel* …no git, no registry, only the package and a fingerprint that must match… you read the seal true… take the key, operator, and install only what you sealed yourself…",
    questions: [
      {
        prompt:
          "What does the new `archive` plugin source let you do?",
        choices: [
          { id: 'a', label: "Install a plugin from a zip fetched over HTTPS — no git or npm in the path — with optional SHA-256 pinning so it installs only if the download's hash matches the value you recorded", correct: true },
          { id: 'b', label: "Compress an installed plugin into a zip archive so you can email it to a teammate", correct: false },
          { id: 'c', label: "Encrypt a plugin at rest so it can only run after you supply a decryption key each session", correct: false },
          { id: 'd', label: "Mirror a git-hosted plugin locally so it keeps working after the upstream repository is deleted", correct: false },
        ],
        passFeedback: "HIT! `archive` is a *source* — a way to install. Point it at a zip over HTTPS and Claude Code fetches and installs it with neither git nor npm involved. Add a SHA-256 pin and the install is refused unless the download hashes to exactly the value you recorded, so a swapped or corrupted package can't slip in.",
        failFeedback: "MISS! It's not about zipping up or emailing an installed plugin, it's not at-rest encryption, and it's not a mirror of a git repo. It's a third install *source*: a zip over HTTPS, optionally SHA-256-pinned. Re-read Book 1.",
      },
    ],
  },
};
