import type { LessonContent } from './types';

/**
 * twic-1 (Feature A) — the `claude plugin eval` command. Claude Code adds a
 * command that runs a plugin against a suite of test cases and scores the
 * results. Each case is a realistic prompt plus one or more graders (a pass/fail
 * check: a regex over the reply, whether a tool was called, or a rubric a second
 * model judges against). Each case runs several times with the plugin loaded and
 * again with no plugin (the baseline / ablation), producing a WITH score, a
 * W/OUT score, and their difference Δ — what the plugin actually contributed.
 * It scores reliability, catches regressions when you change the plugin or a new
 * model ships, and can gate CI; it does not repair, validate, or publish.
 * Sources (Claude Code CHANGELOG 2.1.269 + docs.claude.com/en/plugin-evals):
 *   - "Added `claude plugin eval`: run a plugin's eval suite against Claude Code
 *      and get scored, reproducible results."
 *   - "Each case is a realistic prompt plus one or more graders. A grader is a
 *      pass/fail check on what Claude produced, such as a regex over the reply,
 *      whether a particular tool was called, or a rubric that a second model
 *      judges the reply against."
 *   - "each case runs three times by default ... each case's runs are repeated
 *      with no plugin loaded by default, and you get two scores, `WITH` and
 *      `W/OUT`. Their difference, `Δ`, is what the plugin contributed."
 *   - "Use evals to measure how reliably your plugin steers Claude ... to catch
 *      regressions when you change the plugin or a new model ships ... and gate
 *      CI on the score."
 * Field shapes are fixed by the TWiC scaffolding; only the strings change weekly.
 */
export const twic1Content: LessonContent = {
  roomId: 'twic-room-1',
  intro:
    "Room 1 of this week's rundown, and the Beat Reporter is crouched beside a skeleton that keeps swearing it works — swinging a rusted arm, insisting the motion is perfect — with no one having ever timed it against a skeleton that stayed still. The 2.1.269 release adds `claude plugin eval`, a command that runs a plugin against a suite of test cases and scores the results, running each case with the plugin loaded and again with no plugin so the *difference* shows what the plugin actually did. The two books cover exactly how that scoring works and why a consultant would never ship a plugin on a single lucky run again. Answer the door's question for the key — then face the thing that guards it, a skeleton certain of a claim it has never once measured.",
  prompt:
    "What does `claude plugin eval` do?",
  choices: [
    { id: 'a', label: "Runs a plugin against a suite of test cases, scoring each with graders, and runs every case both with the plugin and without it so the Δ shows what the plugin actually contributed", correct: true },
    { id: 'b', label: "Checks a plugin's files for syntax and schema errors — malformed manifests, missing required fields — and reports whether it is well-formed", correct: false },
    { id: 'c', label: "Automatically rewrites the plugin's skills and prompts to raise its score until every case passes", correct: false },
    { id: 'd', label: "Publishes the plugin to the community marketplace once it clears a passing score", correct: false },
  ],
  passFeedback: "HIT! `claude plugin eval` scores a plugin's behavior against real test cases, and it runs each case with the plugin and without it so the Δ separates what the plugin *contributed* from what Claude would have done anyway. It measures — it doesn't fix, validate, or publish.",
  failFeedback: "MISS! Checking file syntax is `plugin validate`; nothing here rewrites the plugin or ships it to a marketplace. `plugin eval` *measures* behavior against a no-plugin baseline. Re-read Book 1.",
  lore: [
    {
      id: 'twic-1-lore-a',
      text: `**\`claude plugin eval\` — Measuring Whether the Plugin Actually Helps**

**A case is a prompt plus graders**

An eval suite lives in an \`evals/\` directory inside your plugin, and each *case* is a realistic prompt — something a user of the plugin might actually type — paired with one or more *graders*. A grader is a plain pass/fail check on what Claude produced: a regex over the reply, a check for whether a particular tool was called, or a rubric that a second model judges the reply against. A case's score is the fraction of its graders that passed, and it passes overall when that score meets your \`--threshold\` (\`1.0\` by default). You don't have to hand-author the suite — \`claude plugin eval init\` reads your plugin and proposes the cases and graders for you.

**Runs, because one run tells you nothing**

An agent isn't deterministic, so a single run proves almost nothing. By default each case runs *three times*, and the case's score is the mean across those runs. Every run happens in a fresh, isolated, non-interactive session with only your plugin loaded, so nothing from your terminal leaks in to flatter the result. The report — an HTML page, optionally published to a link — shows each grader's verdict and, for the model-judged graders, the excerpt it read and how it voted.

**The no-plugin baseline is the whole point**

Here's the move that makes eval more than a vibe check: each case is *also* run with no plugin loaded. You get two scores — \`WITH\` and \`W/OUT\` — and their difference, \`Δ\`, is what the plugin actually contributed. If a case scores \`1.00\` both with and without your plugin, the plugin isn't what made it pass; Claude was already getting there on its own. A positive \`Δ\` is the evidence that the plugin earned its place.

> Takeaway: \`claude plugin eval\` scores a plugin's real behavior across repeated runs and, by re-running each case with no plugin, isolates the Δ that proves the plugin — not luck, and not Claude alone — did the work.`,
    },
    {
      id: 'twic-1-lore-b',
      text: `**Shipping on Evidence — Why a Consultant Runs the Suite Before the Client Does**

**"It worked when I tried it" is not a measurement**

The old way to check a plugin was to load it, type one request, watch it fire, and call it done. That tells you the plugin *can* work; it says nothing about how *often* it does. On a client engagement that gap is the whole risk — the skill that triggered flawlessly in your demo and then sat silent on three of the next five real prompts. The eval suite replaces the anecdote with a number you can stand behind: this plugin steers Claude to the right outcome on this fraction of realistic phrasings, measured, not remembered.

**Catching the regression you didn't cause**

A plugin doesn't only break when *you* change it. A new model ships, the phrasing that used to trigger your skill no longer does, and you find out from the client instead of from a test. Re-running the same suite after any change — yours or an upstream one — turns that silent drift into a red line in a report. The \`Δ\` is the early-warning system: when the number your plugin used to add quietly collapses, the suite catches it before the engagement does.

**Wiring it into the gate**

Because the results are scored and reproducible, the suite belongs in CI, not just on your laptop. Gate a plugin change on the score and a pull request that drops the plugin's contribution simply doesn't merge — the same discipline you'd apply to a test suite for any other deliverable. The consultant's version of "trust me, it's good" becomes "here's the suite, here's the Δ, here's the run that proves it," which is the only version a serious client should accept.

> Takeaway: Treat the eval suite as the plugin's test harness — measure the Δ before you ship, re-run it whenever the plugin or the model changes, and gate CI on the score so a regression fails the build instead of the engagement.`,
    },
  ],
  practice: {
    id: 'twic-1-practice',
    template: `My commit-message plugin fired perfectly in the demo, but I won't ship it to the client on one lucky run.
I'll write an eval suite where each case is a realistic ____ plus one or more ____ that pass or fail it.
Because the agent isn't deterministic, I'll let each case ____ rather than trust a single run.
Crucially, each case also runs with no plugin loaded, so the ____ tells me what the plugin actually added.
Then I'll ____ so a change that quietly kills the plugin's contribution fails the build, not the engagement.`,
    blanks: [
      { id: 'case-prompt', suggestions: ['prompt', 'user request', 'test prompt'] },
      { id: 'graders', suggestions: ['graders', 'pass/fail checks', 'grading rules'] },
      { id: 'runs', suggestions: ['run several times', 'run three times', 'repeat across runs'] },
      { id: 'delta', suggestions: ['Δ', 'WITH-minus-W/OUT difference', 'baseline gap'] },
      { id: 'ci', suggestions: ['gate CI on the score', 'wire the suite into CI', 're-run the suite on every change'] },
    ],
    prize: { id: 'twic-1-prize', label: 'TWIC · WEEK STARTER' },
  },
  conversations: {
    'twic-npc-1': {
      summary:
        "`claude plugin eval` (2.1.269) runs a plugin against a suite of test cases and scores the results. Each case is a realistic prompt plus one or more graders — a grader is a pass/fail check like a regex over the reply, whether a tool was called, or a rubric a second model judges against. Because an agent isn't deterministic, each case runs several times (three by default) and the score is the mean. The key move: each case also runs with no plugin loaded, giving a WITH score, a W/OUT score, and their difference Δ — what the plugin actually contributed. A case scoring 1.0 both ways means the plugin didn't cause the pass. Use it to measure reliability instead of trusting one lucky run, to catch regressions when you change the plugin or a new model ships, and to gate CI on the score. It measures behavior — it does not validate file syntax (that's `plugin validate`), rewrite the plugin, or publish it.",
      beats: [
        { kind: 'say', text: "Lead story this week is how you find out whether a plugin actually works — not whether it *can* work, whether it *does*. The command is `claude plugin eval`, and it runs your plugin against a suite of test cases and scores the results." },
        { kind: 'say', text: "A case is two things: a realistic prompt, the kind a user would actually type, and one or more graders. A grader is just a pass/fail check on what I produced — a regex over my reply, whether I called a particular tool, or a rubric that a second model judges my answer against. The case's score is the fraction of graders that passed." },
        { kind: 'say', text: "And because I'm not deterministic, one run tells you nothing. Each case runs three times by default and the score is the mean. Every run happens in a fresh, isolated session with only your plugin loaded, so nothing from your terminal sneaks in to flatter the number." },
        {
          kind: 'choice',
          prompt: "A case scores 1.00 with your plugin loaded. A colleague says, 'Perfect score — the plugin works.' What's the honest read?",
          options: [
            { id: 'baseline', label: "Not yet — you have to see the no-plugin score too; if it's also 1.00, the plugin didn't cause the pass", correct: true, reaction: "Exactly. Every case also runs with no plugin loaded. You get WITH and W/OUT, and the difference — Δ — is what the plugin contributed. A high WITH score alone can just mean I'd have gotten there anyway." },
            { id: 'ship', label: "Right — a perfect score means ship it", correct: false, reaction: "Careful. A perfect WITH score with an equally perfect W/OUT score means the plugin added nothing. The Δ against the no-plugin baseline is the number that actually matters." },
            { id: 'oneshot', label: "Sure, one clean run at 1.00 is proof enough", correct: false, reaction: "One run is noise. That's why each case runs three times by default — and why it's also run with no plugin, so you can see the Δ instead of a single lucky score." },
          ],
        },
        { kind: 'say', text: "That baseline is the whole point. If a case scores 1.00 both with and without your plugin, the plugin isn't what made it pass — I was already getting there. A positive Δ is the evidence that the thing earned its place in the session at all." },
        { kind: 'say', text: "Why you'd bother on a real engagement: 'it worked when I tried it' isn't a measurement. The suite replaces the anecdote with a number you can stand behind, and re-running it catches the regression you didn't cause — a new model ships, your trigger phrasing stops working, and the report goes red before the client notices." },
        { kind: 'say', text: "And because the results are scored and reproducible, the suite belongs in CI. Gate the merge on the score and a change that quietly kills the plugin's contribution just doesn't land. The books have the full read. The door asks one thing: what does `claude plugin eval` actually do? Answer for the key — then square up to Hunch past it, a skeleton certain it works and unable to prove it." },
      ],
    },
  },
  battle: {
    name: 'Hunch, the Unmeasured',
    spriteKey: 'skeleton',
    maxHP: 1,
    playerHP: 5,
    phases: 1,
    introLine: "*a skeleton hauls itself up, working one rusted arm back and forth with fierce conviction* …it *works*, operator… look at it move… I ran it once, long ago, and it fired perfectly — that was proof enough for a hundred years… you want to *score* me? against a version of me with no plugin at all? …tell me true, so I understand what you'd measure — what does that command actually do?",
    tauntLines: [
      "*the arm swings wild and grinds to a halt* you thought it merely *checked my bones for cracks* — malformed manifest, missing field? no! that is another rite entirely… this one scores what I *do*, not whether I am well-formed…",
      "*joints seize mid-motion* you thought it would *fix* me — rewrite my own skills until every case passed? no… it does not touch me… it runs me, and runs a me with no plugin at all, and shows the gap between us…",
    ],
    victoryLine: "*Hunch stills the arm at last and reads its own score beside the empty-handed baseline* …one run was never proof… the difference was… you measured what I *added*, not what I merely *claimed*… take the key, and never ship a thing on a single lucky swing again…",
    questions: [
      {
        prompt:
          "What does `claude plugin eval` do?",
        choices: [
          { id: 'a', label: "Runs a plugin against a suite of test cases, scoring each with graders, and runs every case both with the plugin and without it so the Δ shows what the plugin actually contributed", correct: true },
          { id: 'b', label: "Checks a plugin's files for syntax and schema errors — malformed manifests, missing required fields — and reports whether it is well-formed", correct: false },
          { id: 'c', label: "Automatically rewrites the plugin's skills and prompts to raise its score until every case passes", correct: false },
          { id: 'd', label: "Publishes the plugin to the community marketplace once it clears a passing score", correct: false },
        ],
        passFeedback: "HIT! `claude plugin eval` scores a plugin's behavior against real test cases, and it runs each case with the plugin and without it so the Δ separates what the plugin *contributed* from what Claude would have done anyway. It measures — it doesn't fix, validate, or publish.",
        failFeedback: "MISS! Checking file syntax is `plugin validate`; nothing here rewrites the plugin or ships it to a marketplace. `plugin eval` *measures* behavior against a no-plugin baseline. Re-read Book 1.",
      },
    ],
  },
};
