import type { LessonContent } from './types';

/**
 * Claude Cowork Quest — Module 4: The Connector Nexus.
 * MCP connectors (Drive, Gmail, Calendar, Canva, Zoom) and their real read/write
 * boundaries. Ids match buildCowork4Level() in roomConfigs.ts.
 */
export const cowork4Content: LessonContent = {
  roomId: 'connector-nexus',
  intro:
    "Welcome to the Nexus — a teal switchboard humming with connector cables and OAuth keyrings. This is where Cowork stops living only in your local files and reaches out to the apps you already run: Drive, Gmail, Calendar, Canva, Zoom. Connector Cat works the board and will plug you into the right four or five. But every cable has a true read/write boundary, and Hookmaw the Over-Connected — who believes \"connected\" means \"unlimited\" — guards the exit. Learn each connector's real reach before you wire anything wide open.",
  prompt:
    "You ask Cowork to \"draft replies to the three client emails in my inbox and send them.\" Cowork drafts all three cleanly — then stops. Why can't it just send them for you?",
  choices: [
    { id: 'a', label: "The Gmail connector is down; sending works fine once you reconnect it.", correct: false },
    { id: 'b', label: "The Gmail connector can search, read, draft, and label mail, but it deliberately cannot send — a human reviews and hits send.", correct: true },
    { id: 'c', label: "Cowork can only touch local files, so it can never reach Gmail at all.", correct: false },
    { id: 'd', label: "You forgot to switch Cowork into 'Act without asking' mode, which unlocks sending.", correct: false },
  ],
  passFeedback:
    "[PASS] Gmail is draft-only by design. Cowork does the heavy writing; the send button stays in human hands. That asymmetry is the whole lesson of this room — connected does not mean unlimited.",
  failFeedback:
    "[FAIL] It's not a bug, a mode toggle, or a wall against Gmail entirely. The Gmail connector genuinely reads, searches, drafts, and labels — but it cannot send. A human always makes the final send.",
  lore: [
    {
      id: 'two-surfaces',
      text: `**Two Surfaces: Local Files vs Remote Connectors**

Here is the mental model that makes everything else click. Cowork reaches the world through two completely different doors, and confusing them is the most common rookie mistake.

The first door is LOCAL: the files and folders on your own machine. You grant Cowork access to, say, your 'Acme Engagement' folder, and it reads, edits, and creates files right there on your laptop. This is Cowork's signature move — it produces finished deliverables in place, not just advice.

The second door is REMOTE CONNECTORS. These don't run on your laptop at all. A connector lives in Anthropic's cloud and reaches a SaaS app — Gmail, Drive, Calendar, Canva, Zoom — over OAuth, the same 'Sign in with Google' handshake you already know. You authorize it once; Cowork then acts through that authorized connection.

Why does the distinction matter? Because the rules differ. Local access is folder-scoped and deletes always prompt. Connectors inherit the SaaS app's own permissions and have their own per-tool controls.

> Takeaway: Local files run on your machine; connectors run in Anthropic's cloud and reach SaaS over OAuth — two doors, two rule sets.`,
    },
    {
      id: 'wiring-the-board',
      text: `**Wiring the Board: Customize > Connectors > Browse**

Adding a connector is less like coding an integration and more like clicking 'Connect with Google' on any app you've ever signed into. No tokens to paste, no config files — that's the consumer-grade part.

The path: open Customize, go to Connectors, hit Browse, and you'll see the directory — Gmail, Google Drive, Google Calendar, Canva, Zoom, and more. Pick one, run the OAuth sign-in, and it's wired. Once added, you don't get every connector firing on every task. You toggle them per conversation with the + icon, switching on just the ones a given job needs. Drafting client emails? Flip on Gmail. Building a kickoff deck? Flip on Drive and Canva. Lean by default; add by need.

One nuance that trips people up: connectors are not Cowork-only. They're a platform-wide Claude capability — the same connector you add here is shared across Claude chat, Claude Desktop, and Claude Mobile. Connect it once, and it shows up wherever you use Claude.

> Takeaway: Add connectors via Customize > Connectors > Browse, toggle them per-conversation with +, and remember they're platform-wide, not Cowork-only.`,
    },
    {
      id: 'asymmetry-table',
      text: `**The Asymmetry Table: Every Cable Has a Boundary**

This is the page to tattoo on your wrist. 'Connected' tells you nothing about what a connector can actually do — each one has a deliberate, specific read/write boundary, and they are not the same.

GMAIL is draft-only. It can search your inbox, read threads, write drafts in your voice, and apply labels — but it cannot send. A human always reviews and hits send. CALENDAR is full read/write: it can list events, find mutual availability, and actually create, update, and delete events. It books. DRIVE reads your Office docs, Google Docs, and sheets, and can save finished files back — read in, write out. ZOOM is meeting intelligence: it surfaces transcripts, summaries, and action items from your calls.

Notice the pattern: the riskiest irreversible action in each app — sending an email — is the one connector that's locked to humans. Calendar booking and Drive saves are reversible and routine, so they're automated. The boundary is designed around blast radius, not convenience.

> Takeaway: Gmail drafts but never sends; Calendar fully books; Drive reads and saves back; Zoom surfaces meeting intelligence — memorize the table, never assume.`,
    },
    {
      id: 'per-tool-controls',
      text: `**Per-Tool Connector Controls: Allow, Approve, or Block**

Adding a connector is not an all-or-nothing switch. At GA, Cowork shipped Per-Tool Connector Controls, and they're the seatbelt that lets you say yes to a connector without saying yes to everything inside it.

For each action a connector exposes, you pick one of three settings. ALWAYS ALLOW: Cowork runs it without pausing — sensible for harmless reads like 'search my Drive.' NEEDS APPROVAL: Cowork stops and asks before acting — the right default for anything that writes or changes state, like creating a calendar event. BLOCKED: the action is off the table entirely, no matter what you prompt.

The consultant move is to mix them. Allow the reads, gate or block the writes. On a sensitive engagement you might let Drive read freely but require approval on every save-back, or block calendar deletes outright while allowing event creation. There's one hard limit worth internalizing: these controls only NARROW access, never widen it. If your own Drive account can't touch a folder, no setting here grants Cowork that folder.

> Takeaway: Per-tool controls (Always Allow / Needs Approval / Blocked) let you allow reads and gate writes — and they only ever narrow the source app's permissions, never expand them.`,
    },
    {
      id: 'connected-not-unlimited',
      text: `**Connected Is Not Unlimited**

This is the belief that gets people burned, and it's exactly the lie Hookmaw whispers: 'It's connected, so it can do anything the app can do.' False — on two counts.

First count: connectors have built-in boundaries that no setting unlocks. You will never find a toggle that lets the Gmail connector send mail, because that limit lives in the connector itself, not in your permissions. 'Act without asking' mode speeds up approvals; it does not grow a connector new powers. The send button is not a permission you forgot to grant — it simply isn't there.

Second count: a connector can only ever do what YOUR account in that app can already do. OAuth authorizes Cowork to act as you, within your existing access. If you're a viewer on a shared drive, the connector reads but can't edit. The connector inherits your ceiling; it never raises it.

Put those together and the rule is simple. The real reach of any connector is the smaller of two things: the connector's own boundary, and your account's permissions. Whichever is tighter wins.

> Takeaway: A connector can do, at most, what its design allows AND what your own account allows — connected means bounded, never unlimited.`,
    },
  ],
  practice: {
    id: 'connector-practice',
    template:
      "This week I need Cowork wired up right. For drafting client follow-ups in my voice, use the ____ connector — and the final send is ____.\n" +
      "To find a slot everyone's free and lock in the kickoff, use the ____ connector, which can ____ the event itself.\n" +
      "To pull last week's commitments from our call, use the ____ connector for action items.\n" +
      "And on this sensitive account, set Drive reads to Always Allow but every save-back to ____ so nothing gets overwritten without my sign-off.",
    blanks: [
      { id: 'draft-connector', suggestions: ["Gmail", "Calendar", "Zoom"], correctIndex: 0 },
      { id: 'send-owner', suggestions: ["mine (a human sends)", "Cowork's (it sends automatically)"], correctIndex: 0 },
      { id: 'book-connector', suggestions: ["Calendar", "Gmail", "Drive"], correctIndex: 0 },
      { id: 'book-action', suggestions: ["create and book", "only suggest, never book", "read but not change"], correctIndex: 0 },
      { id: 'call-connector', suggestions: ["Zoom", "Gmail", "Canva"], correctIndex: 0 },
      { id: 'write-control', suggestions: ["Needs Approval", "Always Allow"], correctIndex: 0 },
    ],
    prize: { id: 'nexus-switchboard-operator', label: 'NEXUS SWITCHBOARD OPERATOR' },
  },
  conversations: {
    'connector-cat': {
      summary:
        "Connector Cat plugs you into the right connectors and drills each one's true boundary — Gmail drafts but never sends, Calendar fully books, Drive reads and saves back, Zoom surfaces meeting intelligence — plus per-tool controls and the rule that connectors only narrow access, never widen it.",
      beats: [
        { kind: 'say', text: "Mrow. Welcome to the board. I plug consultants into their real tools. Five cables cover most of your week: Gmail, Calendar, Drive, Canva, Zoom." },
        { kind: 'say', text: "First, the thing nobody tells you: there are two doors. Your LOCAL files live on your laptop — Cowork edits those in place. Connectors are different animals. They run up in Anthropic's cloud and reach out to your SaaS apps over OAuth. Same 'Sign in with Google' you've clicked a hundred times." },
        { kind: 'say', text: "You add them at Customize, then Connectors, then Browse. Sign in once and the cable's live. Then per conversation you flip just the ones you need with the plus icon. And heads up — these aren't Cowork-only. The cable you wire here shows up in Claude chat, Desktop, and Mobile too." },
        { kind: 'say', text: "Now the part that saves your reputation. Every cable has a boundary, and they are NOT the same. Quiz time — the board doesn't trust anyone who hasn't proven it." },
        {
          kind: 'choice',
          prompt: "Draft follow-up emails to a client, find a kickoff slot everyone's free and book it, and pull action items from yesterday's Zoom. Which final actions does Cowork complete itself, and which need you?",
          options: [
            { id: 'two-auto', label: "Cowork drafts the emails (you send), books the kickoff itself, and surfaces the Zoom action items itself.", correct: true, reaction: "Spot on. Gmail drafts but you press send. Calendar is full read/write, so it books for real. Zoom just reads the meeting intelligence back to you. Two automatic, one human-in-the-loop." },
            { id: 'backwards', label: "Cowork sends the emails itself, but you have to book the kickoff and read the Zoom transcript by hand.", correct: false, reaction: "Backwards. Gmail never sends — that's the one locked to humans. Calendar books for you automatically, and Zoom hands you the action items." },
            { id: 'all-auto', label: "All three are fully automatic — send, book, and summarize, no human needed.", correct: false, reaction: "Careful — that's the Hookmaw trap. Booking and summarizing are automatic, but Gmail will not send. A human always hits send." },
          ],
        },
        { kind: 'say', text: "Good. One more, because this one trips up everybody who thinks 'connected' means 'unlimited.'" },
        {
          kind: 'choice',
          prompt: "You want Cowork to read freely from the client's shared Drive but never overwrite anything without your sign-off. Using Per-Tool Connector Controls, what's the right setup?",
          options: [
            { id: 'allow-gate', label: "Set Drive reads to Always Allow and Drive save-back/writes to Needs Approval (or Blocked).", correct: true, reaction: "That's the move. Allow the harmless reads, gate the writes behind your approval. You shaped the cable to the trust level of the work." },
            { id: 'block-all', label: "Block the whole Drive connector so Cowork can't touch it at all.", correct: false, reaction: "Too blunt — now Cowork can't even read the RFP you need it to read. Per-tool controls exist precisely so you don't have to nuke the whole connector." },
            { id: 'allow-all', label: "Set everything to Always Allow and just remember to watch what it does.", correct: false, reaction: "That's wiring it wide open — exactly Hookmaw's mistake. 'I'll watch it' is not a control. Put the writes behind Needs Approval and let the seatbelt do the work." },
          ],
        },
        { kind: 'say', text: "You've got it. Allow the reads, gate the writes, and never forget — these controls only NARROW what your account can already do. Through the cables and into Hookmaw's chamber. He wired every app wide open and believes Cowork can do anything. Show him the boundaries. Mrow." },
      ],
    },
  },
  battle: {
    name: 'Hookmaw the Over-Connected',
    spriteKey: 'slime',
    maxHP: 5,
    playerHP: 5,
    phases: 1,
    introLine: "...I am CONNECTED to everything. Mail, calendars, drives, all of it — and connected means UNLIMITED. Watch me send a thousand emails you never approved!",
    tauntLines: [
      "Connected is UNLIMITED! There's no boundary I can't blow past!",
      "Who needs per-tool controls? Wire it ALL to Always Allow and let it RIP!",
      "A setting somewhere must let me SEND — keep guessing while I drain your inbox!",
    ],
    victoryLine: "...fine... Gmail never sends... controls only narrow... connected was never unlimited... take the keyring, careful one...",
    questions: [
      {
        prompt: "Hookmaw brags he'll fire off your client emails without asking. What actually stops him?",
        choices: [
          { id: 'a', label: "Nothing — if a connector is added, it can do anything the app can do.", correct: false },
          { id: 'b', label: "The Gmail connector can draft, search, read, and label — but it structurally cannot send; a human always sends.", correct: true },
          { id: 'c', label: "Switching to 'Act without asking' mode would let it send, he just hasn't.", correct: false },
          { id: 'd', label: "Gmail can send, but only to addresses already in your contacts.", correct: false },
        ],
        passFeedback: "HIT! Gmail is draft-only by design. No mode, no setting, no contact list unlocks sending. The human owns the send button.",
        failFeedback: "MISS! The send limit lives in the connector itself, not in a permission you forgot. 'Act without asking' speeds approvals; it never grows new powers. Gmail drafts; you send.",
      },
      {
        prompt: "You ask Cowork to find a slot everyone's free and book the kickoff. Which connector does this, and can it complete the booking itself?",
        choices: [
          { id: 'a', label: "The Gmail connector — calendars are part of email so it books there.", correct: false },
          { id: 'b', label: "No connector can book; Cowork can only suggest times for you to enter manually.", correct: false },
          { id: 'c', label: "The Calendar connector — it has full read/write, so it finds availability and actually creates the event.", correct: true },
          { id: 'd', label: "The Drive connector, since the calendar file lives in your Drive.", correct: false },
        ],
        passFeedback: "HIT! Calendar is full read/write. It reads availability and creates, updates, or deletes events for real — booking is automatic.",
        failFeedback: "MISS! Booking is the Calendar connector's job, and unlike Gmail it has full write access — it creates the event itself. Calendar books; Gmail only drafts.",
      },
      {
        prompt: "What is the actual reach of any connector — the true ceiling on what it can do?",
        choices: [
          { id: 'a', label: "The smaller of two limits: the connector's own built-in boundary AND what your own account in that app can do.", correct: true },
          { id: 'b', label: "Whatever you set in Per-Tool Connector Controls — controls can grant new access.", correct: false },
          { id: 'c', label: "Full admin access to the SaaS app, since OAuth hands over everything.", correct: false },
          { id: 'd', label: "Only whatever you paste into the conversation by hand.", correct: false },
        ],
        passFeedback: "HIT! A connector can do at most what its design allows AND what your account allows — whichever is tighter wins. Controls only narrow, never widen.",
        failFeedback: "MISS! Controls subtract access, they never add it. OAuth lets Cowork act as YOU, within your existing permissions. The reach is the tighter of the connector's boundary and your own account.",
      },
      {
        prompt: "On a confidential engagement you want Drive reads allowed but every save-back gated. Which Per-Tool Connector Controls setup fits?",
        choices: [
          { id: 'a', label: "Everything on Always Allow — it's faster and you'll just keep an eye on it.", correct: false },
          { id: 'b', label: "Reads on Always Allow, writes/save-back on Needs Approval or Blocked.", correct: true },
          { id: 'c', label: "Block the whole Drive connector so nothing can go wrong.", correct: false },
          { id: 'd', label: "There's no per-action control; a connector is on or off, all-or-nothing.", correct: false },
        ],
        passFeedback: "HIT! Allow the harmless reads, gate the risky writes. Mixing the three settings per action is exactly what Per-Tool Connector Controls are for.",
        failFeedback: "MISS! Per-tool controls let you split actions: Always Allow the reads, Needs Approval (or Blocked) the writes. Don't wire it all open, and don't nuke the whole connector either.",
      },
      {
        prompt: "How do you add a connector, and where does it then live?",
        choices: [
          { id: 'a', label: "You paste an API token into a Cowork config file, and it stays exclusive to Cowork.", correct: false },
          { id: 'b', label: "You write a custom integration in code before Cowork can reach any app.", correct: false },
          { id: 'c', label: "Customize > Connectors > Browse, sign in via OAuth — and it's platform-wide, shared across Claude chat, Desktop, and Mobile, not Cowork-only.", correct: true },
          { id: 'd', label: "Connectors are auto-installed for everyone; there's nothing to add or sign into.", correct: false },
        ],
        passFeedback: "HIT! Customize > Connectors > Browse, OAuth sign-in, toggle per-conversation with +. And it's a platform-wide Claude connector, not a Cowork-only feature.",
        failFeedback: "MISS! No tokens, no custom code. You browse the directory and sign in with OAuth — and that connection is shared across all of Claude, not bolted to Cowork alone.",
      },
    ],
  },
};
