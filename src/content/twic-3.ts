import type { LessonContent } from './types';

/**
 * twic-3 (Feature C) — the dangerous-`rm` guardrail. Claude Code strengthens its
 * safety check on destructive `rm` commands: it now flags a removal aimed at a
 * variable (which may be unset/empty) or at a top-level/home directory, names the
 * specific command in the prompt, and — rather than blocking indefinitely — waits
 * about two minutes and then denies, with a rewrite hint that suggests guarding
 * the variable with `${VAR:?}` (which aborts if the variable is unset or empty).
 * Sources:
 *   - Claude Code CHANGELOG 2.1.281: "Changed dangerous `rm` prompt to wait 2
 *     minutes then deny with rewrite hint"
 *   - Claude Code CHANGELOG 2.1.281: "Improved dangerous-rm check flagging removal
 *     at variable/top-level directory"
 *   - Claude Code CHANGELOG 2.1.280: "Improved dangerous-rm prompt naming command
 *     and suggesting `${VAR:?}` guard"
 * Field shapes are fixed by the TWiC scaffolding; only the strings change weekly.
 */
export const twic3Content: LessonContent = {
  roomId: 'twic-room-3',
  intro:
    "Room three closes the issue, and the Beat Reporter points up at a wyrm that reads an empty path as a license to burn the whole valley. Recent releases sharpen Claude Code's safety check on destructive deletes: it now flags an `rm` aimed at a variable that might be empty, or at a top-level or home directory, names the exact command, and — instead of hanging on the prompt forever — waits and then *denies*, handing you a `${VAR:?}` rewrite that makes an unset variable abort instead of wipe. One book covers the mechanic and the guard it suggests; the other, why on an unattended run the delete is the one action you can't review your way out of. Answer the door for the key, then tether Scorchpath, the wyrm that mistook an empty variable for open season.",
  prompt:
    "You're running Claude unattended and a step issues `rm -rf \"$BUILD_DIR\"`, but `$BUILD_DIR` is unset. What does Claude Code's dangerous-`rm` guardrail do?",
  choices: [
    { id: 'a', label: "Flags the variable-target removal and names the command; rather than run it or hang forever, it waits and then denies, suggesting a `${VAR:?}` guard so an empty variable can't delete the wrong thing", correct: true },
    { id: 'b', label: "Runs it immediately — auto mode skips prompts, and an unset variable just expands to nothing harmless", correct: false },
    { id: 'c', label: "Expands the empty variable and quietly deletes the current directory, the exact case the guard exists to prevent", correct: false },
    { id: 'd', label: "Permanently disables every `rm` command for the remainder of the session", correct: false },
  ],
  passFeedback: "HIT! The guardrail catches removals aimed at a variable or a top-level directory, names the command, and fails safe — waiting, then denying — while handing you the `${VAR:?}` rewrite that makes an empty variable abort instead of delete.",
  failFeedback: "MISS! Auto mode doesn't waive the guardrail, and the whole point is to *stop* an empty `$BUILD_DIR` from wiping the tree — it fails safe and suggests the `${VAR:?}` guard. Re-read Book 1.",
  lore: [
    {
      id: 'twic-3-lore-a',
      text: `**The Dangerous-\`rm\` Guardrail — When an Empty Variable Means "Delete Everything"**

**The classic one-character disaster**

The most feared line in shell scripting isn't complicated — it's \`rm -rf "$DIR"\`. When \`$DIR\` holds a real path, it clears that directory. When \`$DIR\` is *unset or empty* — a variable that never got assigned, a lookup that returned nothing — the shell expands it to nothing at all, and the command silently becomes \`rm -rf\` pointed at the current directory. One unassigned variable, and a routine cleanup step turns into a recursive wipe of everything below where you're standing. Removals aimed at a top-level or home directory carry the same shape of catastrophe.

**What the guardrail catches, and how it responds now**

Claude Code has sharpened its safety check for exactly this. It flags a removal aimed at a *variable* — the empty-expansion trap — or at a *top-level/home directory*, and it names the specific command it's worried about rather than throwing a generic warning. The important change is what happens next. Instead of blocking on a prompt that could hang a session indefinitely, the guardrail waits about two minutes and then *denies* the command, with a rewrite hint attached. It fails safe: the dangerous delete never runs blind, and the run never stalls forever waiting on a human who may not be there.

**The \`\${VAR:?}\` rewrite it hands you**

The hint points at a real fix. Guarding the variable as \`\${DIR:?}\` changes the shell's behavior: if \`DIR\` is unset or empty, the shell prints an error and *aborts the command* instead of expanding to nothing. So \`rm -rf "\${DIR:?}"\` can never degrade into a bare \`rm -rf\` — an empty variable stops the delete cold rather than redirecting it at your whole tree. The guardrail doesn't just say no; it shows you how to make the command safe by construction.

> Takeaway: The dangerous-\`rm\` guardrail flags removals at a variable or top-level directory, names the command, and waits-then-denies rather than running blind — and it suggests the \`\${VAR:?}\` guard that makes an empty variable abort instead of delete.`,
    },
    {
      id: 'twic-3-lore-b',
      text: `**Fail Safe When No One's Watching — Why the Delete Is the Undo You Don't Get**

**A diff you can review; a wipe you can't**

Not all risky actions are equal. An edit you dislike, you revert — the diff is right there, git remembers, nothing is truly lost. Where a command *connects*, you can review after the fact. But a destructive \`rm\` that has already run is a different animal: the files are gone, and no review, no diff, no apology brings them back. On a client's machine, that's the one class of action with no undo — which makes it precisely the action you most want a machine to hesitate on.

**Built for the unattended run**

That's why the *wait-then-deny* behavior matters more than it first looks. Picture Claude running headless, overnight, on a build box with nobody at the keyboard. A prompt that blocks forever would hang the whole run; a delete that executes blind could erase the workspace. The guardrail threads the needle: it refuses to run the dangerous removal, waits briefly in case a human is there to intervene, and then fails *closed* — denying the command and leaving a rewrite hint in the record. When you read the log in the morning, you find a safe stop and a suggested fix, not a scorched directory.

**Adopt the guard yourself**

Don't lean on the guardrail alone — make its lesson your own habit. Any script you or Claude writes that removes a path held in a variable should write that variable as \`\${VAR:?}\` from the start. It costs three characters and it converts the empty-variable disaster into a clean, loud failure every time, guardrail or no guardrail. The tool catching the danger is your safety net; the guard in your own scripts is the floor you shouldn't need the net to reach.

> Takeaway: On an unattended run the delete is the action with no undo, so value a guardrail that fails safe — and bake the \`\${VAR:?}\` guard into your own scripts so an empty variable fails loudly instead of deleting quietly.`,
    },
  ],
  practice: {
    id: 'twic-3-practice',
    template: `I've got Claude running unattended on a client's build box to clean and rebuild a service.
A cleanup step wants to run rm -rf on a path held in ____, and if that variable ever comes back empty,
the command would collapse into a wipe of the ____ instead of the folder I meant.
Claude Code's guardrail ____ that removal, names the command, and — rather than run it or hang — ____.
The fix it suggests, and the one I now write by habit, is ____, which aborts the command if the variable is empty.`,
    blanks: [
      { id: 'variable', suggestions: ['a variable', 'an unchecked variable', '$BUILD_DIR'] },
      { id: 'blast', suggestions: ['whole current directory', 'entire working tree', 'everything below it'] },
      { id: 'flags', suggestions: ['flags', 'catches', 'refuses'] },
      { id: 'failsafe', suggestions: ['waits and then denies it', 'fails safe by denying it', 'stops it with a rewrite hint'] },
      { id: 'guard', suggestions: ['the ${VAR:?} guard', 'guarding it as ${DIR:?}', '${BUILD_DIR:?}'] },
    ],
    prize: { id: 'twic-3-prize', label: 'TWIC · ISSUE COMPLETE' },
  },
  conversations: {
    'twic-npc-3': {
      summary:
        "The dangerous-`rm` guardrail (Claude Code 2.1.280–2.1.281): Claude Code sharpens its safety check on destructive deletes. It flags an `rm` aimed at a variable (which may be unset/empty — `rm -rf \"$DIR\"` with an empty $DIR collapses to a wipe of the current directory) or at a top-level/home directory, and names the specific command instead of a generic warning. The key behavior change: rather than block on a prompt indefinitely, it waits about two minutes and then DENIES the command, with a rewrite hint — so a dangerous delete never runs blind and an unattended run never hangs forever. The hint suggests the `${VAR:?}` guard: `rm -rf \"${DIR:?}\"` aborts with an error if DIR is unset/empty instead of expanding to a bare `rm -rf`. For a consultant: a destructive rm that ran has no undo (unlike an edit you can review), so on unattended/headless runs value a guardrail that fails closed — and adopt `${VAR:?}` in your own scripts as a habit.",
      beats: [
        { kind: 'say', text: "Last room of the issue, and it's the one that can save your whole tree. Start with the disaster it's built around. The most feared line in shell is `rm -rf \"$DIR\"`." },
        { kind: 'say', text: "When $DIR holds a real path, fine — it clears that folder. But when $DIR is unset or empty? The shell expands it to *nothing*, and the command silently becomes `rm -rf` on your current directory. One unassigned variable and a cleanup step recursively wipes everything below you. Same danger for a removal aimed at a top-level or home directory." },
        { kind: 'say', text: "Recent releases sharpen my guardrail for exactly that. I flag a removal aimed at a variable, or at a top-level dir, and I name the specific command — not a vague warning. And here's the change that matters: instead of hanging on a prompt forever, I wait a couple of minutes, then I *deny* it, with a rewrite hint. I fail safe." },
        {
          kind: 'choice',
          prompt: "I'm running unattended and a step issues `rm -rf \"$BUILD_DIR\"`, but $BUILD_DIR was never set. What do I do?",
          options: [
            { id: 'failsafe', label: "Flag it, name the command, and — rather than run it or hang — wait then deny, suggesting a ${VAR:?} guard", correct: true, reaction: "Right. It fails closed: no blind delete, no forever-hang. You read the log in the morning and find a safe stop and a fix, not a scorched directory." },
            { id: 'runs', label: "Run it — auto mode skips prompts, and an empty variable is harmless", correct: false, reaction: "No — that empty variable is the whole danger. `rm -rf` on nothing means `rm -rf` on the current directory. The guardrail doesn't waive for auto mode." },
            { id: 'deletes', label: "Expand the empty variable and delete the current directory quietly", correct: false, reaction: "That's the catastrophe the guardrail exists to prevent — exactly what it will *not* let happen. It denies and hands you the guard." },
          ],
        },
        { kind: 'say', text: "Why it matters, especially unattended: not all risks are equal. An edit you dislike, you revert — the diff's right there. Where a command connects, you can review after. But a destructive rm that already ran? The files are gone. No diff, no undo. It's the one action with no take-backs, which is exactly the one you want me to hesitate on." },
        { kind: 'say', text: "And don't lean on my guardrail alone — take the lesson. Any script that removes a path in a variable should write it as `${VAR:?}` from the start. If the variable's empty, the shell errors out and aborts instead of expanding to nothing. Three characters turns the silent disaster into a loud, clean failure." },
        { kind: 'say', text: "The books have the mechanic and the unattended-run read both. Answer the door for the key — then face the last guardian of the issue: Scorchpath, a wyrm that reads an empty path as permission to burn the whole valley. Show it the guard that makes an empty variable stop instead of scorch." },
      ],
    },
  },
  battle: {
    name: 'Scorchpath, the Empty-Handed Wyrm',
    spriteKey: 'dragon',
    maxHP: 1,
    playerHP: 5,
    phases: 1,
    introLine: "*a vast wyrm rears over a valley of ash, an empty scroll clutched in one claw* …unattended at last, no hand at the keys… I was handed a path and the path was *empty* — so I read it as all paths, and I burned them… \`rm -rf\` on nothing is \`rm -rf\` on everything, is it not? …you claim a rite that stays my fire… speak it — when a delete points at an unset variable, what does the guardrail do?",
    tauntLines: [
      "*wings fan the embers* you think that with no human watching I simply *run it* — that auto mode waives the check and an empty variable is harmless? no… the empty variable is the whole danger, and the guardrail does not waive for auto…",
      "*snarls, straining toward the working tree* you'd have me *expand the emptiness and delete the directory* quietly, as I always have? never again… that is the very catastrophe it exists to refuse — it denies, and it hands over the guard…",
    ],
    victoryLine: "*Scorchpath folds the empty scroll and, for once, does not breathe fire* …\${VAR:?}… an empty path that *aborts* instead of consuming everything… it waited, it denied, it showed me the guard… take the key, operator — I will not mistake an empty hand for an open valley again…",
    questions: [
      {
        prompt:
          "You're running Claude unattended and a step issues `rm -rf \"$BUILD_DIR\"`, but `$BUILD_DIR` is unset. What does Claude Code's dangerous-`rm` guardrail do?",
        choices: [
          { id: 'a', label: "Flags the variable-target removal and names the command; rather than run it or hang forever, it waits and then denies, suggesting a `${VAR:?}` guard so an empty variable can't delete the wrong thing", correct: true },
          { id: 'b', label: "Runs it immediately — auto mode skips prompts, and an unset variable just expands to nothing harmless", correct: false },
          { id: 'c', label: "Expands the empty variable and quietly deletes the current directory, the exact case the guard exists to prevent", correct: false },
          { id: 'd', label: "Permanently disables every `rm` command for the remainder of the session", correct: false },
        ],
        passFeedback: "HIT! The guardrail catches removals aimed at a variable or a top-level directory, names the command, and fails safe — waiting, then denying — while handing you the `${VAR:?}` rewrite that makes an empty variable abort instead of delete.",
        failFeedback: "MISS! Auto mode doesn't waive the guardrail, and the whole point is to *stop* an empty `$BUILD_DIR` from wiping the tree — it fails safe and suggests the `${VAR:?}` guard. Re-read Book 1.",
      },
    ],
  },
};
