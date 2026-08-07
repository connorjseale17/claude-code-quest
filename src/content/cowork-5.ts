import type { LessonContent } from './types';

/**
 * Claude Cowork Quest — Module 5: The Deliverable Forge.
 * Produce real consulting deliverables — decks, live Excel models, cited
 * writeups — as a coordinated set. Ids match buildCowork5Level() in roomConfigs.
 */
export const cowork5Content: LessonContent = {
  roomId: 'deliverable-forge',
  intro:
    "Welcome to the Crimson Forge — where briefs go in and finished files come out. Anvils stamp out .pptx, .xlsx, and .pdf; sparks of cited artifacts fly. Forgemaster Quill works the bellows, teaching you to forge the three-artifact market-sizing set — deck, model, and cited writeup — so they hang together. But beware Mock, the Hollow Mockup, lurking in the heat: he forges things that LOOK done and shatter the moment a partner taps them.",
  prompt:
    "A partner asks you to run a market sizing in Cowork. You point it at the project folder and say \"size this market for me.\" What does a well-forged Cowork deliverable look like — the kind that survives partner review?",
  choices: [
    { id: 'a', label: "One beautiful PowerPoint with confident round numbers and no spreadsheet — partners only ever look at the slides.", correct: false },
    { id: 'b', label: "Three coordinated artifacts — a 10-12 slide deck, an Excel model with live formulas and a methodology tab, and a Markdown writeup whose numbers cite back to the actual source files.", correct: true },
    { id: 'c', label: "A single Excel file with every number hardcoded as text so nothing can accidentally recalculate.", correct: false },
    { id: 'd', label: "A chat answer in the Cowork window summarizing the TAM, which you then retype into your own deck by hand.", correct: false },
  ],
  passFeedback:
    "[PASS] Three artifacts that agree with each other, a methodology tab that shows the math, and citations a partner can audit. That is a forged deliverable, not a mockup.",
  failFeedback:
    "[FAIL] Cowork's strength is the COORDINATED set — deck plus working model plus cited writeup — not one pretty file. Round numbers with no source and no math is exactly what Mock forges. Make the work auditable.",
  lore: [
    {
      id: 'three-artifact-pattern',
      text: `**The Three-Artifact Pattern**

When Anthropic showed off Cowork doing a market sizing, the headline wasn't "it made a slide." It was that ONE prompt produced three things that agreed with each other: a 10-12 slide PowerPoint, an Excel workbook with the actual calculations plus a methodology tab, and a cited Markdown writeup explaining the logic. Think of it the way a good engagement ships: the deck is the story, the model is the math, the memo is the audit trail. A partner can flip from a slide that says "$4.2B TAM" to the exact cell that computed it to the writeup paragraph that names the source. That coherence is the product. The mistake juniors make — human and AI alike — is treating these as three separate asks done at three different times, so the deck rounds to $4B, the model says $4.17B, and the memo cites a number that appears nowhere. Forge them in one coordinated pass and they stay in sync by construction.

> Takeaway: The market-sizing flex is a coordinated SET — deck + working model + cited writeup — generated together so the numbers can never drift apart.`,
    },
    {
      id: 'four-workflows',
      text: `**The Four Core Workflows**

Most consulting grunt-work collapses into four shapes, and Cowork is built for all four. FILE ORGANIZATION: point it at a folder of chaos — "2023 final FINAL v7.docx" energy — and have it rename, sort, and de-duplicate into something a fresh analyst could navigate. DOCUMENT PREP: hand it a messy source (a transcript, a wall of notes, a client's ugly Word doc) and get back a structured draft with headings, sections, and a clean hierarchy. RESEARCH SYNTHESIS: aim it at a whole folder of PDFs and reports and ask for the throughline — what do twelve sources collectively say, where do they disagree. DATA EXTRACTION: feed it unstructured input (emails, invoices, a pile of one-pagers) and get structured rows out — the database-style table you can actually pivot on. Notice these aren't "chatbot" tasks; each one starts and ends with files on your disk. That's the whole identity of Cowork: it doesn't describe the work, it produces the artifact and leaves it in your folder.

> Takeaway: File org, document prep, research synthesis, and data extraction are the four reusable molds — almost every deliverable is one of these, or a few stacked together.`,
    },
    {
      id: 'native-files',
      text: `**Native Files, Real Formulas**

Here's what separates Cowork from a chat tool that pastes a table into the window: it writes genuine, native Office files to your actual folder. The .xlsx it produces is a real workbook — open it in Excel and the formulas are live. A VLOOKUP still looks up. A SUM still sums. The charts are real charts, not screenshots. Change an input assumption and the model recalculates, because the math is wired in, not baked into static text. Same with the .pptx: a PowerPoint you can open, edit, and reformat — not an image of a slide. This matters because a deliverable that can't recalculate is a deliverable a partner can't pressure-test. "What if penetration is 8% instead of 12%?" should be a one-cell edit, not a request to regenerate everything. When you ask for a model, say so explicitly — "build the calculations as live formulas, not pasted values" — so you get a working instrument, not a snapshot of one.

> Takeaway: Cowork writes real native Office files with working formulas and editable slides — ask for LIVE calculations so the model can be stress-tested, not just admired.`,
    },
    {
      id: 'citations',
      text: `**Citations Make It Auditable**

The single habit that earns trust on a deliverable is also the easiest to skip: make the output point back to its sources. A good Cowork writeup doesn't just assert "the market grew 14% last year" — it ties that claim to the specific file, page, or message it came from, the way a footnote does. Why this matters more for an AI draft than a human one: when a partner asks "where did this number come from?", you need an answer in five seconds, not a frantic re-derivation. Source-grounded output turns a black-box draft into something you can defend in a review. Practically, you ask for it: "cite every figure back to the source file it came from" belongs in your brief, and a methodology tab in the model belongs there too. An uncited number is the most dangerous thing in any deck — it might be right, it might be a hallucination, and you genuinely cannot tell which by looking. Citations are how you tell.

> Takeaway: Demand source citations and a methodology tab — an auditable draft is one where every number names the file it came from, so a partner can verify instead of trust.`,
    },
    {
      id: 'forge-limits',
      text: `**Know the Forge's Limits**

A master smith knows what the metal won't do. Cowork has real edges, and pretending otherwise is how you ship something embarrassing. First, the spreadsheet trap: xlsx generation and parsing struggle with presentation-style layouts — merged cells, section banners, multi-region tabs built for human eyes. It thrives on database-style tables: one header row, clean columns, one record per row. So design models columnar, and if a client hands you a pretty merged-cell sheet, expect to reshape it before Cowork can reliably work it. Second, browser and computer-use tasks are slow — every click means a screenshot sent back for the next decision, so a job that touches the web can take many minutes, not seconds. Third, very large files may be skipped to avoid timeouts, so a giant PDF or a fat workbook might silently not get read. And the meta-rule over all of it: treat every output as a DRAFT that needs your judgment. Cowork forges fast; you still inspect the blade before it ships.

> Takeaway: Build models columnar (merged cells break xlsx), expect browser tasks to crawl, watch for skipped large files — and treat every output as a draft you must verify.`,
    },
  ],
  practice: {
    id: 'forge-practice',
    template:
      "Project folder: /Clients/Helix/market-sizing\n\n" +
      "Brief for Cowork:\n" +
      "Run a market sizing for the EU wearables market. Produce ____ coordinated artifacts: a 10-12 slide deck, an Excel model, and a written summary.\n" +
      "In the Excel model, build all calculations as ____ and include a ____ tab that shows how each number was derived.\n" +
      "Design the model as a ____ table — clean columns, one record per row — not a merged-cell layout.\n" +
      "In the writeup, ____ every figure back to the source file it came from.\n" +
      "Follow the deck formatting in ____ in this folder.\n" +
      "Treat the result as a ____ for me to review before it goes to the partner.",
    blanks: [
      { id: 'count', suggestions: ["three", "one", "seven"], correctIndex: 0 },
      { id: 'formulas', suggestions: ["live formulas (VLOOKUP, SUM)", "static pasted text", "screenshots"], correctIndex: 0 },
      { id: 'method-tab', suggestions: ["methodology", "cover", "blank"], correctIndex: 0 },
      { id: 'shape', suggestions: ["columnar / database-style", "merged-cell", "multi-region banner"], correctIndex: 0 },
      { id: 'cite', suggestions: ["cite", "hide", "estimate"], correctIndex: 0 },
      { id: 'style-file', suggestions: ["the style file (brand.md)", "whatever looks nice", "a random template"], correctIndex: 0 },
      { id: 'draft', suggestions: ["draft", "final", "finished deliverable"], correctIndex: 0 },
    ],
    prize: { id: 'deliverable-forgemaster', label: 'DELIVERABLE FORGEMASTER' },
  },
  conversations: {
    'forgemaster-quill': {
      summary:
        "Quill teaches the three-artifact market-sizing pattern (deck + live model + cited writeup), insists on source citations and a methodology tab, and drills the forge's limits — columnar tables only, and treat every output as a draft you verify.",
      beats: [
        { kind: 'say', text: "Ah — a fresh hand at the forge. Sit. Up here we don't make answers. We make FILES. Things that land in your folder and survive a partner poking at them." },
        { kind: 'say', text: "Watch the big pour first. You point me at a project folder and say 'size this market.' One brief. Out comes three pieces of metal that ring the same note: a deck of ten-to-twelve slides, an Excel model with the math wired in AND a methodology tab, and a writeup whose every number names the file it came from." },
        { kind: 'say', text: "The reason they ring together is that I forge them in ONE pass, from ONE source of truth. Ask for them separately and they drift — the slide rounds to four billion, the model says four-point-one-seven, the memo cites a number from nowhere. Coordinated, or it's scrap." },
        { kind: 'say', text: "Now — the model. When you ask for the spreadsheet, what do you demand of it?" },
        {
          kind: 'choice',
          prompt: "When you ask Quill for the Excel model in a market sizing, what do you demand of it?",
          options: [
            { id: 'live', label: "Live formulas (VLOOKUP, SUM, real charts) and a methodology tab — a working instrument.", correct: true, reaction: "Real metal. A model a partner can edit one cell of and watch recalculate. THAT survives review." },
            { id: 'static', label: "Every number pasted in as static text so nothing can accidentally change.", correct: false, reaction: "A painting of a model. The first 'what if penetration is 8%?' and it's useless. Forge it LIVE — working formulas, not a snapshot." },
            { id: 'merged', label: "Lots of merged cells and section banners so it looks like a polished client sheet.", correct: false, reaction: "That's the trap, not the goal. Merged cells choke the forge. Build it columnar — clean rows the model can actually compute on." },
          ],
        },
        { kind: 'say', text: "Good instinct. Real metal, not a painting of metal. Last lesson before you face what's in the back of the forge. Every smith knows what the metal won't do. Tell me you know the spreadsheet trap." },
        {
          kind: 'choice',
          prompt: "Quill asks: do you know the spreadsheet trap? What is it?",
          options: [
            { id: 'merged-cells', label: "xlsx struggles with merged cells and presentation layouts — design models as columnar, database-style tables.", correct: true, reaction: "You've got it. One header row, one record per row. That's the metal that pours clean." },
            { id: 'no-formulas', label: "xlsx can't do formulas at all, so always export to PDF instead.", correct: false, reaction: "No — the formulas work fine, that's the whole point. The trap is LAYOUT. Merged cells and section banners are what break it, not formulas." },
            { id: 'pptx-trap', label: "Spreadsheets are always perfectly safe; the trap is in PowerPoint.", correct: false, reaction: "If only. The deck's fine. It's the merged-cell, multi-region sheet that fights the forge. Keep models columnar." },
          ],
        },
        { kind: 'say', text: "There it is. Columnar tables, clean rows, one record each. Hand me a merged-cell beauty and I'll choke on it. Now — back there, in the heat. Something I made on a bad day. Mock. Looks finished. Hollow as a bell. Go ring him until he cracks." },
      ],
    },
  },
  battle: {
    name: 'Mock, the Hollow Mockup',
    spriteKey: 'skeleton',
    maxHP: 5,
    playerHP: 5,
    phases: 1,
    introLine: "Behold — DONE. Twelve slides. Big confident numbers. Nobody asks where they came from. (taps own chest, it rings hollow) Try and break me.",
    tauntLines: [
      "No citation? No problem. Nobody checks. (the number is invented and you can't prove it)",
      "Look how PRETTY my spreadsheet is. Shame it won't compute a single row.",
      "There — I hardcoded a value over the formula. Now nothing recalculates. Now nothing can DISAGREE with me.",
    ],
    victoryLine: "...fine. Fine. Cite the source. Show the math. Build it columnar. ...I was never actually DONE, was I.",
    questions: [
      {
        prompt: "Mock hands you a slide reading '$6.1B TAM' with no source anywhere. What's the right move before this goes to the partner?",
        choices: [
          { id: 'a', label: "Round it to $6B so it looks more authoritative and ship it.", correct: false },
          { id: 'b', label: "Trace the number back to its source file and add the citation; if it cites nothing, treat it as suspect until verified.", correct: true },
          { id: 'c', label: "Trust it — Cowork wrote it, so it must be correct.", correct: false },
          { id: 'd', label: "Delete the number entirely so no one can question it.", correct: false },
        ],
        passFeedback: "HIT! An uncited number is the most dangerous thing in a deck — might be right, might be hallucinated, and you can't tell by looking. Source it or suspect it.",
        failFeedback: "MISS! Rounding or trusting an uncited figure is exactly Mock's con. Trace every number to a source file before it survives review.",
      },
      {
        prompt: "You ask Cowork for a market-sizing model and want a partner to pressure-test assumptions. How should the spreadsheet be built?",
        choices: [
          { id: 'a', label: "As a columnar, database-style table with live formulas and a methodology tab, so one input edit recalculates everything.", correct: true },
          { id: 'b', label: "With merged cells and section banners for a polished, client-ready look.", correct: false },
          { id: 'c', label: "With every figure typed in as static text to prevent accidental changes.", correct: false },
          { id: 'd', label: "As a single screenshot of a model pasted onto a slide.", correct: false },
        ],
        passFeedback: "HIT! Columnar, live formulas, methodology tab. Change one cell, watch it recalc — that's a model that survives 'what if penetration is 8%?'",
        failFeedback: "MISS! Merged cells choke xlsx and static text can't be tested. Build it columnar with working formulas so it actually pressure-tests.",
      },
      {
        prompt: "The Anthropic market-sizing demo produced a coordinated SET from one prompt. What three artifacts?",
        choices: [
          { id: 'a', label: "A deck, a second deck, and a third deck in different color schemes.", correct: false },
          { id: 'b', label: "A chat summary, a tweet thread, and a voicemail script.", correct: false },
          { id: 'c', label: "A 10-12 slide deck, an Excel model with calculations + methodology, and a cited Markdown writeup.", correct: true },
          { id: 'd', label: "A single PDF with no underlying model or sources.", correct: false },
        ],
        passFeedback: "HIT! Deck (the story), model (the math), writeup (the audit trail) — forged together so the numbers can't drift apart.",
        failFeedback: "MISS! The flex is the coordinated trio: slide deck, working Excel model with methodology, and a cited writeup — one source of truth, three faces.",
      },
      {
        prompt: "A client sends a 90MB master workbook and Cowork's output never references it. What likely happened?",
        choices: [
          { id: 'a', label: "The file was probably skipped to avoid a timeout — large files can be silently passed over, so verify it was actually read.", correct: true },
          { id: 'b', label: "Cowork read it perfectly; large files are always fine.", correct: false },
          { id: 'c', label: "Cowork deleted the file to save space.", correct: false },
          { id: 'd', label: "The workbook was too colorful for Cowork to open.", correct: false },
        ],
        passFeedback: "HIT! Very large files may be skipped to avoid timeouts. Don't assume it was read — confirm, or split it down to a size Cowork will actually ingest.",
        failFeedback: "MISS! Large files can be silently skipped to dodge timeouts. Always verify the source was actually read instead of assuming.",
      },
      {
        prompt: "Cowork just produced your deck, model, and writeup. What's the correct mindset before it reaches the partner?",
        choices: [
          { id: 'a', label: "It's auto-generated, so it's automatically partner-ready.", correct: false },
          { id: 'b', label: "Treat every output as a draft that needs your judgment — inspect the numbers, the citations, and the model before it ships.", correct: true },
          { id: 'c', label: "Only the deck needs checking; the model and memo are always correct.", correct: false },
          { id: 'd', label: "Skip review to save time — Mock never checks his work either.", correct: false },
        ],
        passFeedback: "HIT! Cowork forges fast; you still inspect the blade. Every output is a draft you verify — that's what separates a deliverable from a hollow mockup.",
        failFeedback: "MISS! 'Auto-generated' is not 'partner-ready.' Treat every artifact as a draft needing your judgment before it ships.",
      },
    ],
  },
};
