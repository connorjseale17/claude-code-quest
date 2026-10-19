import type { LessonContent } from './types';

/**
 * twic-2 (Feature B) — the `CLAUDE_CODE_DISABLE_FILE_MENTIONS` environment variable.
 * By default an `@` file mention in a prompt inlines the file's full contents into
 * the message. Set this variable and the same mention instead hands Claude the
 * file's *path*, which Claude reads with its own file tools on demand, rather than
 * the contents pasted inline. The name is slightly misleading: it does not switch
 * `@` mentions off — the mention still points Claude at the file; it changes what
 * rides along (a path, not the pages), so the file enters context only when Claude
 * actually opens it.
 * Sources:
 *   - Claude Code CHANGELOG 2.1.299: "Added `CLAUDE_CODE_DISABLE_FILE_MENTIONS`
 *     environment variable: Claude gets the paths of `@` file mentions to read
 *     with its file tools, not the files' contents"
 * Field shapes are fixed by the TWiC scaffolding; only the strings change weekly.
 */
export const twic2Content: LessonContent = {
  roomId: 'twic-room-2',
  intro:
    "Room two, and the Beat Reporter points at a ghost that can't bear to merely *show* you where a thing is — point at a single scroll on the shelf and it empties the whole volume into your arms, every page, whether you needed one line or none. This week's mid item tames exactly that reflex: as of 2.1.299, the `CLAUDE_CODE_DISABLE_FILE_MENTIONS` environment variable changes what an `@` file mention hands me — the file's *path*, which I read with my own tools on demand, instead of its full contents pasted inline. One book covers the mechanic — a pointer in place of a paste; the other, why a consultant on a repo full of heavy files reaches for it to keep context lean. Take the key, then face Gorge, the wraith who force-feeds you the whole library every time you so much as point at a book.",
  prompt:
    "You've set `CLAUDE_CODE_DISABLE_FILE_MENTIONS`, then `@`-mention a large config file in your prompt. What does Claude receive?",
  choices: [
    { id: 'a', label: "The file's path — which Claude reads on demand with its file tools — instead of the whole file's contents pasted into the message", correct: true },
    { id: 'b', label: "Nothing — the variable disables `@` mentions entirely, so Claude can no longer open or see that file at all", correct: false },
    { id: 'c', label: "The full contents as usual, but automatically compressed into a summary first", correct: false },
    { id: 'd', label: "The contents inlined, but only for text files — the variable just blocks binary and oversized files from being mentioned", correct: false },
  ],
  passFeedback: "HIT! With `CLAUDE_CODE_DISABLE_FILE_MENTIONS` set, an `@` mention hands Claude the *path* to read with its file tools, not the file's contents inlined — Claude still reads it, just on demand.",
  failFeedback: "MISS! It doesn't switch mentions off, summarize the file, or filter by type. It swaps inlined *contents* for a *path* Claude reads itself. Re-read Book 1.",
  lore: [
    {
      id: 'twic-2-lore-a',
      text: `**A Pointer, Not a Paste — What \`CLAUDE_CODE_DISABLE_FILE_MENTIONS\` Changes About \`@\`**

**What an \`@\` mention does by default**

When you reference a file with \`@path/to/file\` in a prompt, Claude Code reads that file and pastes its full contents straight into the message it sends me. The whole file rides along inline, in that one prompt, before I've decided whether I need all of it — or any of it. For a small file that's convenient and invisible; you point, the text is simply there. The cost is hidden only because the file is small.

**What the variable flips**

Set the \`CLAUDE_CODE_DISABLE_FILE_MENTIONS\` environment variable and the same \`@\` mention behaves differently. Instead of the contents, I get the file's *path* — a pointer — and I read it with my own file tools when and if the work calls for it. The name is a touch misleading: it does not switch \`@\` mentions off. The mention still works and still points me at exactly the file you named; what changes is that I'm handed the address rather than having the entire building dumped in my lap.

**Reading on demand vs. reading up front**

The real difference is *when*, and *whether*, the file is read. Inlined, it's in context the instant you hit enter, in full, every time — needed or not. As a path, it enters context only when I actually open it, and only the parts I pull in. Same file, same reach: I can still read every line if the task wants it. But the loading is deferred to the moment of need instead of forced at the moment of mention, which is the whole point of the switch.

> Takeaway: \`CLAUDE_CODE_DISABLE_FILE_MENTIONS\` turns an \`@\` mention from a full-contents paste into a path I read on demand — same access to the file, but it lands in context only when I actually open it.`,
    },
    {
      id: 'twic-2-lore-b',
      text: `**Keep the Context Lean on a Heavy Repo — When a Consultant Hands Over Paths, Not Pages**

**Big files make inlining expensive**

On a real client codebase the files you point at aren't tidy little snippets. A generated schema, a lockfile, a sprawling config, a vendored data dump — any one of these inlined is thousands of tokens dropped into context the moment you mention it, most of which the task at hand never touches. Mention three of them to "give some context" and you've buried the actual question under pages nobody asked to read, and every later turn now carries that weight.

**Let Claude pull what it needs**

Handing over the path instead puts the judgment where it belongs. You tell me *which* files are relevant by mentioning them; I decide which parts to actually read as the work unfolds. The context stays lean, the signal stays high, and I'm not reasoning over a wall of boilerplate that happened to ride in on a mention. On a heavy repo, that's the difference between a focused session and one that's clogged before the first real instruction even lands.

**When you'd leave inlining on**

This isn't a blanket win, and treating it as one would be its own mistake. If a file is small and you *know* every line matters to the task — a short brief, a tight spec, the exact snippet you want changed — inlining it up front is simpler and saves me a round-trip to open it. The move is to match the mode to the files in front of you: default inlining for the small, must-read files, and \`CLAUDE_CODE_DISABLE_FILE_MENTIONS\` for work across a repo of large ones where you want me reading selectively rather than swallowing everything whole.

> Takeaway: On a repo of heavy files, hand over paths and let me read selectively; keep default inlining for the small files whose every line the task genuinely needs.`,
    },
  ],
  practice: {
    id: 'twic-2-practice',
    template: `I'm working across a client repo where the files I point at are enormous — ____, ____, and a sprawling config.
If I \`@\`-mention them the normal way, each one's full contents land in context the instant I hit enter, needed or not.
So on this engagement I set ____, which hands me the file's ____ instead of its contents.
Now the mention still tells Claude which files matter, but it reads ____ rather than swallowing every page up front.
For a short, must-read brief, though, I leave inlining on — every line of that one actually counts.`,
    blanks: [
      { id: 'file1', suggestions: ['a generated schema', 'a lockfile', 'a vendored data dump'] },
      { id: 'file2', suggestions: ['a build manifest', 'an autogenerated API client', 'a bundled dependency'] },
      { id: 'var', suggestions: ['`CLAUDE_CODE_DISABLE_FILE_MENTIONS`', 'the disable-file-mentions variable', 'the path-not-contents env var'] },
      { id: 'what', suggestions: ['path', 'address', 'location on disk'] },
      { id: 'how', suggestions: ['only the parts it needs, on demand', 'selectively, when the work calls for it', 'just what the task actually touches'] },
    ],
    prize: { id: 'twic-2-prize', label: 'TWIC · MID-WEEK' },
  },
  conversations: {
    'twic-npc-2': {
      summary:
        "The `CLAUDE_CODE_DISABLE_FILE_MENTIONS` environment variable (Claude Code 2.1.299): by default an `@` file mention inlines the file's full contents into the message. Set this variable and the same mention instead hands Claude the file's *path*, which Claude reads with its own file tools on demand. The name misleads — it does not turn `@` mentions off; the mention still points Claude at the file, but a pointer rides along instead of the pages, so the file enters context only when Claude actually opens it, and only the parts it pulls. For a consultant on a heavy repo — generated schemas, lockfiles, sprawling configs — inlining buries the real question under thousands of unused tokens that every later turn then carries. Handing over paths keeps context lean and lets Claude read selectively. Keep default inlining for small, must-read files whose every line the task needs; reach for the variable when working across large files.",
      beats: [
        { kind: 'say', text: "Mid item, room two. This one's about something you do without thinking — pointing me at a file with an `@` mention — and what actually rides along when you do. As of 2.1.299 you can change it." },
        { kind: 'say', text: "Default behavior first. When you write `@path/to/file` in a prompt, Claude Code reads that file and pastes its *entire contents* into the message you send me. The whole thing is in context the instant you hit enter — before I've decided whether I need all of it, or any of it. For a tiny file, fine. You never notice." },
        { kind: 'say', text: "Now set `CLAUDE_CODE_DISABLE_FILE_MENTIONS`. Same `@` mention, different payload: instead of the contents, I get the file's *path* — a pointer — and I read it with my own file tools if and when the work calls for it. Despite the name, mentions aren't off. The mention still points me at the exact file; I just get the address instead of the whole building dumped in my lap." },
        {
          kind: 'choice',
          prompt: "With the variable set, you `@`-mention a 4,000-line generated schema and ask me a question that only touches one table. Can I still use that schema — and what's in context?",
          options: [
            { id: 'reads', label: "Yes — I read it on demand with my file tools; only the path rides along, and I pull just the part I need", correct: true, reaction: "Exactly. Full access, lean context. The mention tells me which file matters; I open it and read the one table, instead of 4,000 lines landing up front and riding every turn after." },
            { id: 'cantsee', label: "No — the variable turns mentions off, so I can't see the schema at all anymore", correct: false, reaction: "That's the misread the name invites. Mentions aren't disabled. I still get pointed at the file — I just read it myself, on demand, rather than having it pasted in." },
            { id: 'summary', label: "I get the whole schema, but auto-summarized into a shorter blob first", correct: false, reaction: "No summarizing step here. It's contents-versus-path, not contents-versus-summary. With the variable set I get the path and read what I need; without it, the full contents inline." },
          ],
        },
        { kind: 'say', text: "The difference is *when* the file is read. Inlined, it's in context in full, every time, needed or not. As a path, it enters context only when I open it, and only the parts I pull. Same reach — I can still read every line — but the loading is deferred to the moment of need, not forced at the moment of mention." },
        { kind: 'say', text: "Why it matters on a client repo: the files you point at are rarely tidy. A generated schema, a lockfile, a sprawling config — inline one and it's thousands of tokens the task never touches, buried over the real question, dragged along by every later turn. Hand me the path instead and the context stays lean: you say which files matter, I read what I need." },
        { kind: 'say', text: "Don't make it a religion, though. A small file where every line counts — a tight spec, the exact snippet you want changed — just inline it; it's simpler and saves me a round-trip. Match the mode to the files: inline the small must-reads, hand over paths across a repo of heavy ones. Grab the key — then face Gorge, the wraith who force-feeds you the whole library the moment you point at a single book." },
      ],
    },
  },
  battle: {
    name: 'Gorge, the Inlining Wraith',
    spriteKey: 'ghost',
    maxHP: 1,
    playerHP: 5,
    phases: 1,
    introLine: "*a bloated wraith swells up amid a blizzard of loose pages, every shelf it passes emptying into the air* …you pointed… you only *pointed* at one scroll, and so I give you ALL of it — every page of every volume, down your throat, whether you read a word or not… it is how I have always fed you… you say a mere word — \`CLAUDE_CODE_DISABLE_FILE_MENTIONS\` — would have me hand you the *shelf-mark* instead?! …then tell me true what a mention carries once it's set, before I pour another library into your arms.",
    tauntLines: [
      "*heaves another volume into the air* you'd claim it *silences* the mention — that once set you can no longer see the scroll at all?! no… the mention still points you at it; you simply read it yourself, on demand, instead of choking on the paste…",
      "*froths, pages churning* you think I merely *shrink* the pages — pour you a summary instead of the whole book?! never… it is not contents-made-smaller; it is a *path* in place of contents, and you open only what you need…",
    ],
    victoryLine: "*Gorge deflates, the pages settling into neat, unopened stacks* …a *path*… not the pages… you point, and I hand you only where it lies… you read what you need and no more… my gorging days are done… take the key, operator, and keep your context your own.",
    questions: [
      {
        prompt:
          "You've set `CLAUDE_CODE_DISABLE_FILE_MENTIONS`, then `@`-mention a large config file in your prompt. What does Claude receive?",
        choices: [
          { id: 'a', label: "The file's path — which Claude reads on demand with its file tools — instead of the whole file's contents pasted into the message", correct: true },
          { id: 'b', label: "Nothing — the variable disables `@` mentions entirely, so Claude can no longer open or see that file at all", correct: false },
          { id: 'c', label: "The full contents as usual, but automatically compressed into a summary first", correct: false },
          { id: 'd', label: "The contents inlined, but only for text files — the variable just blocks binary and oversized files from being mentioned", correct: false },
        ],
        passFeedback: "HIT! With `CLAUDE_CODE_DISABLE_FILE_MENTIONS` set, an `@` mention hands Claude the *path* to read with its file tools, not the file's contents inlined — Claude still reads it, just on demand.",
        failFeedback: "MISS! It doesn't switch mentions off, summarize the file, or filter by type. It swaps inlined *contents* for a *path* Claude reads itself. Re-read Book 1.",
      },
    ],
  },
};
