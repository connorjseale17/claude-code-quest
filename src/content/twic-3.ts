import type { LessonContent } from './types';

/**
 * twic-3 (Feature C) — /claude-api latency-optimize.
 * A new subcommand (CHANGELOG 2.1.319): /claude-api latency-optimize looks for
 * latency in Claude API code and tests faster settings. It reads your Claude
 * API integration code, identifies where response time is being lost, and
 * actually tries alternative settings to measure which are faster — turning
 * latency tuning from guesswork into something measured.
 * Sources:
 *   - Claude Code CHANGELOG 2.1.319: "New command: `/claude-api
 *     latency-optimize` looks for latency in Claude API code and tests faster
 *     settings."
 * Field shapes are fixed by the TWiC scaffolding; only the strings change weekly.
 */
export const twic3Content: LessonContent = {
  roomId: 'twic-room-3',
  intro:
    "Final room of the issue. The Beat Reporter points past a heap of half-finished scrolls to a vast, slow shape coiled on top of them — a dragon so laden it can barely lift its head, every movement arriving a long beat after it should. This week's closer is the command built to wake exactly that kind of sluggishness up: as of 2.1.319, `/claude-api latency-optimize` hunts for latency in your Claude API integration code and *tests* faster settings to see what actually speeds it up. One book covers the mechanic — what it reads, what it looks for, and what 'tests faster settings' really means; the other, how a consultant uses measured results instead of folklore before a launch. Claim the key, then face Sluggard, the leaden wyrm who mistakes slowness for strength.",
  prompt:
    "You've shipped a client-facing feature on the Claude API and it feels slow, but you're not sure where the time is going or which fix is worth making. You run `/claude-api latency-optimize`. What does it do?",
  choices: [
    { id: 'a', label: "It looks for latency in your Claude API code and tests faster settings — finding where response time is being lost and measuring alternative settings to see which are actually quicker", correct: true },
    { id: 'b', label: "It rewrites your prompts to be shorter so the model has less text to read, and makes no other change", correct: false },
    { id: 'c', label: "It permanently switches your integration to the smallest model available, since a smaller model is always faster", correct: false },
    { id: 'd', label: "It reports your account's current API rate limits and tells you to request a quota increase", correct: false },
  ],
  passFeedback: "HIT! It reads your integration code to locate where latency comes from, then tries faster settings and measures them — so the speed-up you land on is tested, not guessed.",
  failFeedback: "MISS! It isn't a prompt-shortener, it doesn't force the smallest model on you, and it isn't a rate-limit report — it finds latency in your code and tests faster settings to measure what's quicker. Re-read Book 1.",
  lore: [
    {
      id: 'twic-3-lore-a',
      text: `**Stop Guessing Where the Time Goes — A Command That Finds the Latency and Tests the Fix**

**What it reads**

\`/claude-api latency-optimize\`, new in 2.1.319, is a subcommand of \`/claude-api\` pointed at a specific job: making your Claude API integration faster. It works on *your code* — the part of your application that actually calls the API. It reads how those calls are shaped and run, because that's where response time is won or lost, long before the question of how fast the model itself is.

**What it looks for**

The first half of the name is *find the latency*. The command hunts through that calling code for where time is leaking — the places a request waits when it didn't have to, where work that could overlap is happening in series, where a setting is costing you seconds without buying you anything. Instead of you squinting at timings and guessing which line is the culprit, it surfaces the sources of slowness for you.

**What "tests faster settings" actually means**

The second half is the part that makes this more than a linter. It doesn't just *suggest* faster settings — it **tests** them. It tries alternative settings and measures them, so the recommendation that comes back isn't a hunch about what *should* be quicker; it's grounded in what *was* quicker when it ran. That's the difference between advice and evidence: you get a change backed by a measurement, not a maybe.

**A measured answer, not a rewrite**

Note the shape of what you get. It's not silently rewriting your app or forcing a single verdict like "always use the small model." It locates the latency and shows you which settings tested faster, leaving you to apply the ones that fit. The judgment stays yours; the measurement is what it adds.

> Takeaway: \`/claude-api latency-optimize\` reads your API-calling code, finds where latency is coming from, and *tests* faster settings so the speed-up you choose is one it actually measured.`,
    },
    {
      id: 'twic-3-lore-b',
      text: `**Latency Is a Deliverable — Why a Consultant Measures It Instead of Guessing**

**Speed is what the client feels**

When you ship a client-facing feature on the Claude API, the model's answer quality is only half the product. The other half is how long the user stares at a spinner. A brilliant response that arrives too late to feel responsive reads, to the person using it, as a slow tool — and "it's slow" is the kind of feedback that sinks an otherwise good build. Response time isn't a nice-to-have you tune if there's time left over; it's part of what you were hired to deliver.

**The folklore problem**

The trouble is that latency tuning is usually run on hearsay. Everyone has a rule of thumb — stream it, cache it, drop to a smaller model, batch the tool calls — and each is *sometimes* right and sometimes irrelevant to your actual bottleneck. Guess wrong and you spend a day on a change that moves nothing while the real culprit sits untouched. You end up optimizing the thing you had an opinion about rather than the thing that's slow.

**Measured tuning before the review**

This is where \`/claude-api latency-optimize\` earns its place in the workflow. Rather than arguing from rules of thumb, you run it against the integration before a launch or a performance review and let it tell you where the time is going and which settings tested faster on *your* code. You bring numbers to the conversation. The consultant move is to bake the settings that measurably won into the integration and to be able to say, when the client asks why it's faster, exactly what you changed and what it bought — a before-and-after you measured, not a story you tell.

> Takeaway: Treat response time as part of the deliverable — run \`/claude-api latency-optimize\` before you ship, fix what measured slow rather than what you assumed, and hand the client a speed-up you can prove.`,
    },
  ],
  practice: {
    id: 'twic-3-practice',
    template: `The client-facing feature we built on the Claude API works, but it feels sluggish and I'm not sure why.
Instead of guessing, I run ____ against the integration code.
It ____ where the response time is leaking, and then it ____ to measure which are actually quicker.
I bake the settings that ____ into the integration — not the ones I merely assumed would help.
When the client asks why it's faster, I can point to ____ instead of telling a story.`,
    blanks: [
      { id: 'the-command', suggestions: ['/claude-api latency-optimize', 'the latency-optimize command', 'the API latency optimizer'] },
      { id: 'finds', suggestions: ['finds', 'locates for me', 'surfaces'] },
      { id: 'tests', suggestions: ['tests faster settings', 'tries alternative settings', 'runs faster configurations'] },
      { id: 'measured-faster', suggestions: ['measured faster', 'actually tested quicker', 'won on the numbers'] },
      { id: 'the-numbers', suggestions: ['a measured before-and-after', 'the numbers it produced', 'the settings that tested faster'] },
    ],
    prize: { id: 'twic-3-prize', label: 'TWIC · ISSUE COMPLETE' },
  },
  conversations: {
    'twic-npc-3': {
      summary:
        "/claude-api latency-optimize (Claude Code 2.1.319): a new subcommand of /claude-api aimed at making your Claude API integration faster. It reads YOUR calling code — the part of your app that calls the API — finds where latency is coming from (requests waiting needlessly, work running in series that could overlap, settings costing time for no gain), and then TESTS faster settings: it tries alternatives and measures them, so the recommendation is backed by what was actually quicker, not a hunch. It doesn't silently rewrite your app or force a single verdict like 'always use the small model'; it locates the slowness and shows which settings tested faster, leaving the choice to you. For a consultant: response time is part of a client-facing deliverable, latency tuning is usually run on folklore (stream it, cache it, go smaller) that's only sometimes right, so run this before a launch or perf review, fix what measured slow rather than what you assumed, and hand the client a provable before-and-after.",
      beats: [
        { kind: 'say', text: "Last room of the issue. The closer is a new subcommand in 2.1.319: `/claude-api latency-optimize`. One job — make your Claude API integration faster — and it does it in a way worth understanding." },
        { kind: 'say', text: "Start with what it reads. It works on *your* code — the part of your app that actually calls the API. That's deliberate. Most of the time response-time is won or lost in how you shape and run the calls, well before the question of how fast the model itself is." },
        { kind: 'say', text: "The name is two halves. First half: *find the latency*. It hunts through that calling code for where time is leaking — a request that waits when it didn't need to, calls running one-after-another that could have overlapped, a setting costing you seconds for nothing. You don't squint at timings guessing which line is the culprit; it surfaces them." },
        { kind: 'say', text: "Second half is the part that makes it more than a linter: it *tests* faster settings. Not suggests — tests. It tries alternatives and measures them. So what comes back isn't 'this should be quicker,' it's 'this *was* quicker when I ran it.' Evidence, not a hunch." },
        {
          kind: 'choice',
          prompt: "Your feature feels slow and your gut says 'just switch to the smallest model.' What does `/claude-api latency-optimize` actually give you instead?",
          options: [
            { id: 'measured', label: "It finds where the latency really is and tests faster settings, so you fix what measured slow — which may not be the model at all", correct: true, reaction: "Exactly. That's the whole value: it replaces the rule of thumb with a measurement on your own code. Maybe the bottleneck is serial calls, not the model. You act on what tested faster." },
            { id: 'auto-small', label: "It confirms your gut and permanently switches you to the smallest model, since smaller is always faster", correct: false, reaction: "No — it doesn't force a single verdict, and 'smaller is always faster' is exactly the folklore it's built to replace. It measures; it doesn't hand you a one-size rule." },
            { id: 'rewrite', label: "It silently rewrites your whole app to be faster and you just ship it", correct: false, reaction: "Not quite. It locates the slowness and shows which settings tested faster — the judgment of what to apply stays yours. It adds the measurement, not a blind rewrite." },
          ],
        },
        { kind: 'say', text: "Here's why it belongs in a consultant's workflow. When you ship a client-facing feature, the model's answer is only half the product — the other half is how long someone watches a spinner. 'It's slow' sinks an otherwise good build, so response time is part of what you were hired to deliver." },
        { kind: 'say', text: "And latency tuning is usually run on hearsay — stream it, cache it, go smaller, batch the calls — each only sometimes right. Guess wrong and you burn a day on a change that moves nothing. Run this before a launch or a perf review and you bring numbers instead of opinions: fix what measured slow, and tell the client exactly what you changed and what it bought." },
        { kind: 'say', text: "That closes the issue. Claim the key — then face Sluggard, the leaden wyrm who's so sure its slowness is strength. Name what this command really does and you'll have it moving before it knows what woke it." },
      ],
    },
  },
  battle: {
    name: 'Sluggard, the Leaden Wyrm',
    spriteKey: 'dragon',
    maxHP: 1,
    playerHP: 5,
    phases: 1,
    introLine: "*an enormous dragon drags one eyelid open, a long beat after you'd expect* …speed… is for small things… I am VAST, and the world can wait on me… *its reply to its own thought arrives late* …you claim there's a reckoning that times my every lumbering breath and finds the fat I could shed… then measure me true, upstart, if you dare put a number to a dragon.",
    tauntLines: [
      "*exhales slowly, words trailing their own smoke* you'd just make me SMALLER and call it fast?! that's a child's rule — the reckoning doesn't shrink me on a whim, it tests what's truly quicker…",
      "*a claw moves, arriving after the thought* you think it rewrites the whole of me in silence and leaves me no say?! no — it finds where I drag and shows what measured faster; the choosing stays with the one holding the key…",
    ],
    victoryLine: "*Sluggard rises off the heap of scrolls, suddenly, startlingly quick* …so the drag was never my size — it was the waiting I didn't need, the steps I took one at a time… measured, not guessed… *it is already moving* …take the key, operator. you've a wyrm that answers before the smoke clears now.",
    questions: [
      {
        prompt:
          "You've shipped a client-facing feature on the Claude API and it feels slow, but you're not sure where the time is going or which fix is worth making. You run `/claude-api latency-optimize`. What does it do?",
        choices: [
          { id: 'a', label: "It looks for latency in your Claude API code and tests faster settings — finding where response time is being lost and measuring alternative settings to see which are actually quicker", correct: true },
          { id: 'b', label: "It rewrites your prompts to be shorter so the model has less text to read, and makes no other change", correct: false },
          { id: 'c', label: "It permanently switches your integration to the smallest model available, since a smaller model is always faster", correct: false },
          { id: 'd', label: "It reports your account's current API rate limits and tells you to request a quota increase", correct: false },
        ],
        passFeedback: "HIT! It reads your integration code to locate where latency comes from, then tries faster settings and measures them — so the speed-up you land on is tested, not guessed.",
        failFeedback: "MISS! It isn't a prompt-shortener, it doesn't force the smallest model on you, and it isn't a rate-limit report — it finds latency in your code and tests faster settings to measure what's quicker. Re-read Book 1.",
      },
    ],
  },
};
