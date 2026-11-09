import type { LessonContent } from './types';

/**
 * twic-1 (Feature A) — permissions.denyInsteadOfPrompting.
 * A new Claude Code setting (CHANGELOG 2.1.319): with it on, any tool call that
 * would otherwise pause and wait on a permission prompt is DENIED outright
 * instead of waiting. The call doesn't hang for an approval that may never
 * come — it's refused, and the session moves on. This is about what happens to
 * a would-be prompt, not about which permission mode you're in or which paths
 * are in bounds.
 * Sources:
 *   - Claude Code CHANGELOG 2.1.319: "New setting:
 *     `permissions.denyInsteadOfPrompting` denies calls that would wait on a
 *     permission prompt."
 * Field shapes are fixed by the TWiC scaffolding; only the strings change weekly.
 */
export const twic1Content: LessonContent = {
  roomId: 'twic-room-1',
  intro:
    "Room one of this week's rundown. The Beat Reporter nods toward a skeleton doorman rattling in the archway, a figure who was built to do exactly one thing when a visitor he can't place arrives: knock on the inner door and *wait* for someone to answer. The trouble is nobody's home tonight — and this week's lead item is the setting that finally tells him what to do about that. As of 2.1.319, `permissions.denyInsteadOfPrompting` makes any tool call that would otherwise stop and wait on a permission prompt get *denied* instead of hanging there. One book covers the mechanic — what a permission prompt is and what flipping it to a denial changes; the other, why a consultant running work unattended turns this on before they walk away. Answer the door for the key, then face Deadbolt, the doorman who has never once decided a thing for himself.",
  prompt:
    "You're kicking off a non-interactive Claude Code run — a scheduled cloud task that will execute with nobody at the keyboard. You want it to never hang waiting on an approval no one will give. What does `permissions.denyInsteadOfPrompting` do?",
  choices: [
    { id: 'a', label: "Any tool call that would otherwise pause and wait on a permission prompt is denied outright instead — so the run never blocks on an approval nobody is there to give", correct: true },
    { id: 'b', label: "It auto-approves any tool call that would have prompted, so the run can proceed without waiting", correct: false },
    { id: 'c', label: "It switches the session into bypassPermissions so no prompts are ever raised in the first place", correct: false },
    { id: 'd', label: "It queues the prompts and replays them for you to answer in a batch when the run finishes", correct: false },
  ],
  passFeedback: "HIT! It turns a would-be prompt into an immediate denial — the call is refused rather than left hanging, so an unattended run fails fast on anything you didn't pre-authorize instead of stalling on it.",
  failFeedback: "MISS! It doesn't auto-approve, it isn't a mode switch, and it doesn't defer the prompt for later — it *denies* the call that would have waited. Re-read Book 1.",
  lore: [
    {
      id: 'twic-1-lore-a',
      text: `**When Nobody's There to Say Yes — Turning the Unanswered Prompt Into a Clean No**

**What a permission prompt actually is**

Most of what Claude Code does it does without stopping to ask, because an *allow* rule already covers it or your permission mode is permissive. But when a tool call falls outside those — a command that isn't on the allowlist, an edit a cautious mode wants you to sign off on — Claude pauses and raises a *permission prompt*: a little gate that waits for you to approve or reject before the call runs. In an interactive session that's exactly right. You glance at it, you say yes or no, the work continues.

**What breaks when the session is headless**

The prompt only works if someone is watching the screen. The moment the session isn't interactive — a scheduled task, a CI job, a headless \`-p\` run, an automation kicked off while you're asleep — there's no one to answer. The call that raised the prompt has nothing to resolve it, so the run stalls on a question no human will ever read.

**What the setting changes**

As of 2.1.319, \`permissions.denyInsteadOfPrompting\` resolves that question for you, and it resolves it the safe way. With it on, any tool call that *would* have waited on a permission prompt is instead **denied** on the spot. There's no pause, no approval to wait for, no gamble on someone noticing. The call is simply refused, and the session carries on past it rather than freezing.

**Deny, not approve — the direction matters**

The easy misread is to assume "don't prompt" means "just let it through." It's the opposite. This setting fails *closed*: the uncovered call is turned away, not waved on. So the only things that run unattended are the things you authorized in advance with explicit allow rules. Everything else meets a locked door.

> Takeaway: \`denyInsteadOfPrompting\` swaps a prompt that would hang forever for an instant denial — anything you didn't pre-authorize is refused, not stalled on and not slipped through.`,
    },
    {
      id: 'twic-1-lore-b',
      text: `**Automation You Can Walk Away From — Why Consultants Flip This Before They Leave the Room**

**The unattended-run problem**

The whole point of a scheduled or headless Claude Code run is that you aren't sitting there. A nightly report regenerates, a cloud task triages a repo, a CI step runs a check — all while you're doing something else. But the default prompt behaviour assumes an audience. Hit one uncovered call and the run doesn't fail and it doesn't finish; it hangs, holding a question open against a room that's empty. You come back to a job that did nothing and burned its window waiting.

**A run with a predictable floor**

Turning on \`denyInsteadOfPrompting\` gives that unattended run a hard, predictable shape. Instead of an open-ended stall, an unauthorized call produces a clean refusal the run can react to immediately — log it, skip it, or stop. The job either does the work you allowed or it fails fast and tells you why, which is a far better outcome than a silent hang you discover hours later. You've traded "might wait forever" for "will decide instantly."

**Pair it with a tight allowlist**

The setting is only half the pattern; the allowlist is the other half. Before you schedule the task, pin down exactly the tools and commands its job needs and grant those explicitly. Then flip this on. Now the automation *can only* do the allowed set — anything outside it is denied automatically, so a stray or injected instruction can't quietly escalate into an action you never sanctioned while your back is turned. That's a guarantee you can put in front of a client: the scheduled job is boxed to its brief.

> Takeaway: Scope the allowlist to the job, turn \`denyInsteadOfPrompting\` on, and an unattended run becomes something you can trust to either stay in bounds or fail loudly — never to hang, never to overreach.`,
    },
  ],
  practice: {
    id: 'twic-1-practice',
    template: `I'm setting up a scheduled Claude Code task to run overnight with nobody watching.
First I pin the allowlist to exactly ____, so the only things it can do without a prompt are the ones the job actually needs.
Then I turn on ____, so any call that falls outside that list is ____ instead of ____.
That way the overnight run either finishes the work I sanctioned or ____, and it never stalls on a gate no one is awake to open.`,
    blanks: [
      { id: 'allowlist', suggestions: ['the handful of read and build commands the report needs', 'the specific tools this job touches and nothing else', 'the minimal set of calls the task requires'] },
      { id: 'the-setting', suggestions: ['permissions.denyInsteadOfPrompting', 'the deny-instead-of-prompting setting', 'the no-hang denial setting'] },
      { id: 'denied', suggestions: ['denied outright', 'refused on the spot', 'turned away'] },
      { id: 'waiting', suggestions: ['left hanging on a prompt', 'waiting for an approval nobody will give', 'stalling the whole run'] },
      { id: 'fails-fast', suggestions: ['fails fast with a logged denial', 'stops cleanly and tells me why', 'skips the unauthorized step and moves on'] },
    ],
    prize: { id: 'twic-1-prize', label: 'TWIC · WEEK STARTER' },
  },
  conversations: {
    'twic-npc-1': {
      summary:
        "permissions.denyInsteadOfPrompting (Claude Code 2.1.319): a setting that changes what happens to a tool call that would otherwise raise a permission prompt. Normally Claude pauses and waits for you to approve or reject an uncovered call. With this on, that call is DENIED outright instead of waiting — no pause, no approval to chase. It fails closed: the uncovered call is refused, not auto-approved, so only pre-authorized (allowlisted) calls run. The headline use is unattended runs — scheduled cloud tasks, CI, headless -p — where no human is there to answer a prompt, so the default behaviour would hang the whole job on a question nobody reads. For a consultant: pin the allowlist to exactly what the job needs, turn this on, and the unattended run can only do the allowed set — it either completes in bounds or fails fast with a clean denial, never hanging and never overreaching. It's about the prompt's fate, not about which permission mode you're in.",
      beats: [
        { kind: 'say', text: "Lead item, room one. New setting in 2.1.319 with a plain-spoken name: `denyInsteadOfPrompting`. It decides one thing — what happens when Claude hits a call it would normally stop and *ask* you to approve." },
        { kind: 'say', text: "Back up to what a permission prompt is. When Claude wants to run something that isn't already allowed — a command off the allowlist, an edit a cautious mode wants signed off — it doesn't just do it. It pauses and raises a little gate: approve or reject. You answer, work continues. Fine when you're watching." },
        { kind: 'say', text: "Now picture nobody watching. A scheduled task at 3am. A CI job. A headless run you kicked off and walked away from. That same gate goes up — and there's no one to answer it. The call can't resolve, so the whole run just… hangs there, holding a question against an empty room." },
        { kind: 'say', text: "Here's the fix. Turn `denyInsteadOfPrompting` on and that would-be prompt stops being a wait. The call gets *denied* instead — right away, no pause. The session doesn't freeze; it moves on past the refused call." },
        {
          kind: 'choice',
          prompt: "So — does 'deny instead of prompting' mean the uncovered call gets quietly let through so the run doesn't stall, or does it mean the call is refused?",
          options: [
            { id: 'denied', label: "Refused — it fails closed; the uncovered call is turned away, not run", correct: true, reaction: "Exactly. That's the safe direction. 'Don't prompt' here means 'deny,' not 'allow.' Only the calls you authorized up front get to run; everything else meets a locked door." },
            { id: 'allowed', label: "Let through — not prompting means the call just proceeds", correct: false, reaction: "That's the trap, and it'd be dangerous. It fails *closed*, not open. The uncovered call is denied, not waved on. Otherwise you'd have built a setting that silently green-lights anything unattended." },
            { id: 'deferred', label: "Deferred — it saves the prompt for you to answer later", correct: false, reaction: "No — there's no later queue. The decision is made now, and it's a no. That immediacy is the point: the run never carries an unanswered question." },
          ],
        },
        { kind: 'say', text: "So the setting is only half of it. The other half is your allowlist. Before you schedule anything, pin down the exact tools and commands the job needs and grant *those*. Then flip the switch." },
        { kind: 'say', text: "Put together, the unattended run can only do the allowed set. Anything outside it is denied automatically — so a stray instruction, or one slipped in from somewhere it shouldn't be, can't quietly escalate while you're gone. The job either does its brief or fails fast and says why." },
        { kind: 'say', text: "That's the sentence you hand a client: the scheduled task is boxed to what we sanctioned, and it can't hang and can't wander. Grab the key — then meet Deadbolt, the doorman who was only ever told to knock and wait, and never what to do when no one comes." },
      ],
    },
  },
  battle: {
    name: 'Deadbolt, the Doorman Who Only Knocks',
    spriteKey: 'skeleton',
    maxHP: 1,
    playerHP: 5,
    phases: 1,
    introLine: "*a skeleton doorman straightens in the archway, knuckles poised against the inner door* …my orders are simple… a caller I can't place, I knock, and I WAIT for the master to answer… *the bones go still* …but the master never comes, and so I wait, and the hall fills behind me with callers I've frozen in place… you say there's a word now that lets me stop waiting and simply turn them away?… then say it true, before I knock on a door no one will ever open.",
    tauntLines: [
      "*raps the door and holds, trembling* you'd have me fling the door WIDE because no one answers?! that's not what it does — not-prompting means I DENY the caller, not usher them in…",
      "*bones rattle against the frame* you think the word changes which gear the house runs in?! no — I knock the same in every mode; what changes is that the knock becomes a refusal instead of a wait…",
    ],
    victoryLine: "*Deadbolt lowers his fist, and the frozen callers behind him file out one by one, unblocked* …so that's it… the caller I can't vouch for, I turn away at once — no endless knocking, no empty hall… only the names on my list get through… take the key, operator. no one waits on me now.",
    questions: [
      {
        prompt:
          "You're kicking off a non-interactive Claude Code run — a scheduled cloud task that will execute with nobody at the keyboard. You want it to never hang waiting on an approval no one will give. What does `permissions.denyInsteadOfPrompting` do?",
        choices: [
          { id: 'a', label: "Any tool call that would otherwise pause and wait on a permission prompt is denied outright instead — so the run never blocks on an approval nobody is there to give", correct: true },
          { id: 'b', label: "It auto-approves any tool call that would have prompted, so the run can proceed without waiting", correct: false },
          { id: 'c', label: "It switches the session into bypassPermissions so no prompts are ever raised in the first place", correct: false },
          { id: 'd', label: "It queues the prompts and replays them for you to answer in a batch when the run finishes", correct: false },
        ],
        passFeedback: "HIT! It turns a would-be prompt into an immediate denial — the call is refused rather than left hanging, so an unattended run fails fast on anything you didn't pre-authorize instead of stalling on it.",
        failFeedback: "MISS! It doesn't auto-approve, it isn't a mode switch, and it doesn't defer the prompt for later — it *denies* the call that would have waited. Re-read Book 1.",
      },
    ],
  },
};
