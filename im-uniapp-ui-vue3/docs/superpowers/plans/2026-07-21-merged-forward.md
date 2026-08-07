# UniApp Merged Forward Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add cross-platform message multi-select, merged forwarding, one-by-one forwarding, batch deletion, type 101 cards, and a read-only merged-message viewer aligned with `im-kit-vue-ui-h5`.

**Architecture:** Keep multi-select state in the chat page, pass it through the existing message component chain, and use an in-memory task registry to bridge navigation to the existing forwarding page. Reuse Store merge serialization APIs, isolate protocol/file operations in utilities, and render merged content through a new card plus a page-based read-only viewer.

**Tech Stack:** Vue 3 Composition API, TypeScript 4.9, UniApp/HBuilderX, NIM SDK V2, bundled IM Store, Vitest 0.34, SCSS.

**Workspace rule:** Keep all implementation as unstaged working-tree changes. Do not create commits or push.

---

## File Map

**Create**

- `utils/forwardTask.ts`: in-memory forward/view task registry with 10-minute expiry.
- `utils/forwardTarget.ts`: target selection, nine-target limit, ordered collection, and account-scoped recent forwards.
- `utils/messageMultiSelect.ts`: stable keys, limits, whitelist checks, and conversation-last-message synchronization.
- `utils/mergedForward.ts`: payload parsing, abstracts, UTF-8 MD5, upload/download, serialization, and send orchestration.
- `pages/Chat/message/forward/multi-message-operation.vue`: fixed bottom action bar.
- `pages/Chat/message/forward/merged-forward-card.vue`: type 101 chat-record card and viewer navigation.
- `pages/Chat/message/forward/forward-selector.vue`: H5-aligned search, recent/friend/team tabs, recent forwards, and target multi-select UI.
- `pages/Chat/merged-forward-detail.vue`: read-only page viewer for deserialized records.
- `tests/merged-forward/forwardTask.test.ts`: task lifecycle tests.
- `tests/merged-forward/messageMultiSelect.test.ts`: selection and whitelist tests.
- `tests/merged-forward/mergedForward.test.ts`: payload, MD5, and send-flow tests.
- `tests/merged-forward/forwardTarget.test.ts`: target selection, recent-forward persistence, and selector UI contract tests.
- `vitest.config.ts`: Node test configuration.
- `tsconfig.merged-forward.json`: focused feature type-check project.

**Modify**

- `package.json`, `package-lock.json`: add deterministic test/type-check scripts and Vitest.
- `utils/constants.ts`: add multi-select/forward completion event constants.
- `pages/Chat/index.vue`: own multi-select state and batch actions.
- `pages/Chat/forward.vue`: resolve forward tasks and send single, one-by-one, or merged messages to one or more selected targets.
- `pages/Chat/message/message-list.vue`: pass selection/read-only state.
- `pages/Chat/message/message-item.vue`: render selection controls and merged cards; support readonly rendering.
- `pages/Chat/message/message-bubble.vue`: add multi-select action and disable mutation menus in readonly mode.
- `pages/Chat/message/forward/forward-modal.vue`: show mode-specific source description and multi-target avatars.
- `pages/Chat/message/message-reply.vue`: use `[聊天记录]` for merged references and open nested records.
- `pages/Conversation/conversation-list/conversation-item-last-msg-content.vue`: merged last-message preview.
- `components/MessageOneLine.vue`: merged preview for collection and pin surfaces.
- `locale/zh-Hans.ts`, `locale/en.ts`: add all visible strings.
- `pages.json`: register the merged-forward detail page.

## Task 1: Test Harness And In-Memory Tasks

**Files:**

- Modify: `package.json`
- Modify: `package-lock.json`
- Create: `vitest.config.ts`
- Create: `tests/merged-forward/forwardTask.test.ts`
- Create: `utils/forwardTask.ts`

- [ ] **Step 1: Add the deterministic test command and Vitest dependency**

Add these fields to `package.json` and install exactly `vitest@0.34.6`:

```json
{
  "scripts": {
    "test:merged-forward": "vitest run tests/merged-forward"
  },
  "devDependencies": {
    "vitest": "0.34.6"
  }
}
```

Run: `npm install --save-dev --save-exact vitest@0.34.6`

Expected: `package-lock.json` records Vitest 0.34.6 and `npm ls vitest --depth=0` exits 0.

- [ ] **Step 2: Write failing task lifecycle tests**

Create tests covering create/read, stale ID rejection, replacement, completion, viewer nesting, and expiry using the public API:

```ts
import { beforeEach, describe, expect, it, vi } from "vitest"
import {
  clearForwardTasks,
  completeForwardTask,
  createForwardTask,
  createMergedViewerTask,
  getForwardTask,
  getMergedViewerTask,
} from "../../utils/forwardTask"

describe("forwardTask", () => {
  beforeEach(() => {
    clearForwardTasks()
    vi.useRealTimers()
  })

  it("keeps only the latest forward task", () => {
    const first = createForwardTask({ mode: "oneByOne", sourceConversationId: "a|1|b", messageKeys: ["client-1"] })
    const second = createForwardTask({ mode: "merged", sourceConversationId: "a|1|b", messageKeys: ["client-2"] })
    expect(getForwardTask(first)).toBeUndefined()
    expect(getForwardTask(second)?.mode).toBe("merged")
  })

  it("expires a forward task after ten minutes", () => {
    vi.useFakeTimers()
    const id = createForwardTask({ mode: "merged", sourceConversationId: "a|1|b", messageKeys: ["client-1"] })
    vi.advanceTimersByTime(10 * 60 * 1000 + 1)
    expect(getForwardTask(id)).toBeUndefined()
  })

  it("consumes only the matching task on completion", () => {
    const id = createForwardTask({ mode: "merged", sourceConversationId: "a|1|b", messageKeys: ["client-1"] })
    expect(completeForwardTask("wrong")).toBe(false)
    expect(completeForwardTask(id)).toBe(true)
    expect(getForwardTask(id)).toBeUndefined()
  })

  it("stores a viewer task without persisting message data", () => {
    const id = createMergedViewerTask({ title: "聊天记录", messages: [{ messageClientId: "m1" }] as any })
    expect(getMergedViewerTask(id)?.messages[0].messageClientId).toBe("m1")
  })
})
```

- [ ] **Step 3: Run the test and verify RED**

Run: `npm run test:merged-forward -- forwardTask.test.ts`

Expected: FAIL because `utils/forwardTask.ts` does not exist.

- [ ] **Step 4: Implement the task registry**

Implement these exact public contracts:

```ts
export type ForwardMode = "single" | "oneByOne" | "merged"

export interface ForwardTask {
  id: string
  mode: ForwardMode
  sourceConversationId: string
  messageKeys: string[]
  createdAt: number
}

export interface MergedViewerTask {
  id: string
  title: string
  messages: V2NIMMessageForUI[]
  createdAt: number
}

export const createForwardTask: (input: Omit<ForwardTask, "id" | "createdAt">) => string
export const getForwardTask: (id: string) => ForwardTask | undefined
export const completeForwardTask: (id: string) => boolean
export const createMergedViewerTask: (input: Omit<MergedViewerTask, "id" | "createdAt">) => string
export const getMergedViewerTask: (id: string) => MergedViewerTask | undefined
export const removeMergedViewerTask: (id: string) => void
export const clearForwardTasks: () => void
```

Use a monotonic sequence plus `Date.now()` for IDs. Forward tasks expire after `600_000` ms. Viewer tasks are removed explicitly on viewer unload.

- [ ] **Step 5: Run the test and verify GREEN**

Run: `npm run test:merged-forward -- forwardTask.test.ts`

Expected: 4 tests pass.

- [ ] **Step 6: Review the unstaged task-foundation diff**

## Task 2: Selection And Forwardability Rules

**Files:**

- Create: `tests/merged-forward/messageMultiSelect.test.ts`
- Create: `utils/messageMultiSelect.ts`

- [ ] **Step 1: Write failing rule tests**

Cover stable key priority, selectable synthetic rows, successful base state, one-by-one types, merged types, custom type 101 depth, and all three limits:

```ts
import { describe, expect, it } from "vitest"
import { V2NIMConst } from "../../utils/nim"
import {
  MERGED_FORWARD_LIMIT,
  MULTI_DELETE_LIMIT,
  ONE_BY_ONE_FORWARD_LIMIT,
  getMessageSelectKey,
  isMergeForwardableMessage,
  isOneByOneForwardableMessage,
  isSelectableMessage,
} from "../../utils/messageMultiSelect"

const succeeded = V2NIMConst.V2NIMMessageSendingState.V2NIM_MESSAGE_SENDING_STATE_SUCCEEDED
const msg = (overrides: Record<string, unknown> = {}) => ({
  messageClientId: "c1",
  messageServerId: "s1",
  conversationId: "me|1|you",
  senderId: "me",
  createTime: 1,
  messageType: V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_TEXT,
  sendingState: succeeded,
  ...overrides,
}) as any

describe("messageMultiSelect", () => {
  it("uses server, client, then local identity", () => {
    expect(getMessageSelectKey(msg())).toBe("server-s1")
    expect(getMessageSelectKey(msg({ messageServerId: "0" }))).toBe("client-c1")
    expect(getMessageSelectKey(msg({ messageServerId: "0", messageClientId: "" }))).toBe("local-me|1|you-me-1")
  })

  it("rejects time rows, recalls, and notifications from selection", () => {
    expect(isSelectableMessage(msg({ timeValue: 12 }))).toBe(false)
    expect(isSelectableMessage(msg({ recallType: "reCallMsg" }))).toBe(false)
    expect(isSelectableMessage(msg({ messageType: V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_NOTIFICATION }))).toBe(false)
  })

  it("allows audio only for merged forwarding", () => {
    const audio = msg({ messageType: V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_AUDIO })
    expect(isOneByOneForwardableMessage({} as any, audio)).toBe(false)
    expect(isMergeForwardableMessage({ msgStore: { isChatMergedForwardMsg: () => false } } as any, audio)).toBe(true)
  })

  it("exports aligned limits", () => {
    expect([ONE_BY_ONE_FORWARD_LIMIT, MERGED_FORWARD_LIMIT, MULTI_DELETE_LIMIT]).toEqual([10, 100, 50])
  })
})
```

- [ ] **Step 2: Run the test and verify RED**

Run: `npm run test:merged-forward -- messageMultiSelect.test.ts`

Expected: FAIL because the module does not exist.

- [ ] **Step 3: Implement minimal centralized rules**

Export constants and functions with these signatures:

```ts
export const ONE_BY_ONE_FORWARD_LIMIT = 10
export const MERGED_FORWARD_LIMIT = 100
export const MULTI_DELETE_LIMIT = 50
export const MERGED_FORWARD_MAX_DEPTH = 3

export function getMessageSelectKey(msg?: Partial<V2NIMMessageForUI>): string
export function isSelectableMessage(msg?: V2NIMMessageForUI & { timeValue?: number }): boolean
export function isOneByOneForwardableMessage(store: RootStore, msg: V2NIMMessageForUI): boolean
export function isMergeForwardableMessage(store: RootStore, msg: V2NIMMessageForUI): boolean
export function syncConversationLastMessageAfterDelete(store: RootStore, conversationId: string): void
```

Use the H5 whitelists exactly. A custom message is forwardable only when `store.msgStore.isChatMergedForwardMsg(msg)` returns true; merged forwarding also requires payload depth below 3.

- [ ] **Step 4: Run tests and verify GREEN**

Run: `npm run test:merged-forward -- messageMultiSelect.test.ts`

Expected: all selection tests pass.

- [ ] **Step 5: Review the unstaged selection-rule diff**

## Task 3: Type 101 Protocol And Cross-Platform Transfer

**Files:**

- Create: `tests/merged-forward/mergedForward.test.ts`
- Create: `utils/mergedForward.ts`

- [ ] **Step 1: Write failing protocol tests**

Test attachment/content/text parsing, invalid custom messages, depth, abstracts, UTF-8 MD5, field `12` normalization, serialization order, upload cleanup, and partial send failure. Use dependency injection for file operations:

```ts
export interface MergedForwardFileAdapter {
  create(content: string): Promise<{ source: File | string; cleanup: () => Promise<void> }>
  download(url: string): Promise<string>
}
```

The MD5 assertions must include:

```ts
expect(md5Text("hello")).toBe("5d41402abc4b2a76b9719d911017c592")
expect(md5Text("聊天记录")).toBe("71f3e3ee9baf6d3364add16dd3114fcd")
```

- [ ] **Step 2: Run protocol tests and verify RED**

Run: `npm run test:merged-forward -- mergedForward.test.ts`

Expected: FAIL because `utils/mergedForward.ts` does not exist.

- [ ] **Step 3: Implement protocol helpers**

Export the complete protocol surface:

```ts
export const MERGED_FORWARD_TYPE = 101

export interface MergedForwardAbstract {
  senderNick: string
  content: string
  userAccId: string
}

export interface MergedForwardPayload {
  type: 101
  data: {
    abstracts: MergedForwardAbstract[]
    depth: number
    md5: string
    sessionId: string
    sessionName: string
    url: string
  }
}

export function parseMergedForwardPayload(msg: Partial<V2NIMMessageForUI>): MergedForwardPayload | undefined
export function isMergedForwardMessage(store: RootStore, msg: V2NIMMessageForUI): boolean
export function getMergedForwardDepth(msg: V2NIMMessageForUI): number
export function normalizeMergedForwardText(content: string): string
export function md5Text(content: string): string
export async function sendMergedForwardMessage(options: SendMergedForwardOptions): Promise<void>
export async function loadMergedForwardMessages(options: LoadMergedForwardOptions): Promise<V2NIMMessageForUI[]>
```

`sendMergedForwardMessage` must restore `uiStore.getAppellation` in `finally`, clean path-based upload sources in `finally`, and use `Promise.all` for the custom message plus optional comment. `loadMergedForwardMessages` must reject empty URLs, failed downloads, optional MD5 mismatches, and empty deserialization results.

- [ ] **Step 4: Implement the default UniApp file adapter**

Use runtime capability detection with UniApp conditional compilation:

```ts
// H5 and WebView runtimes
if (typeof File !== "undefined") {
  return { source: new File([content], "mergedMsgs.txt", { type: "text/plain" }), cleanup: async () => {} }
}

// Mini program file-system runtimes
if (typeof uni.getFileSystemManager === "function") {
  // write UTF-8 content under the runtime user-data path and return the path
}

// App Plus fallback
// #ifdef APP-PLUS
// create `_doc/merged-forward-<id>.txt` with plus.io and return its local path
// #endif
```

Download text through a Promise wrapper around `uni.request({ method: "GET", responseType: "text" })`.

- [ ] **Step 5: Run protocol tests and verify GREEN**

Run: `npm run test:merged-forward -- mergedForward.test.ts`

Expected: all protocol and send-flow tests pass.

- [ ] **Step 6: Review the unstaged protocol-layer diff**

## Task 4: Chat Multi-Select UI And Batch Delete

**Files:**

- Create: `pages/Chat/message/forward/multi-message-operation.vue`
- Modify: `utils/constants.ts`
- Modify: `pages/Chat/index.vue`
- Modify: `pages/Chat/message/message-list.vue`
- Modify: `pages/Chat/message/message-item.vue`
- Modify: `pages/Chat/message/message-bubble.vue`
- Modify: `locale/zh-Hans.ts`
- Modify: `locale/en.ts`

- [ ] **Step 1: Add multi-select component contracts**

The bottom operation component must expose:

```ts
defineProps<{ disabled: boolean }>()
defineEmits<{
  (event: "merged-forward"): void
  (event: "one-by-one-forward"): void
  (event: "delete"): void
}>()
```

Render three equal-width actions in the required order with stable height and disabled colors.

- [ ] **Step 2: Thread selection state through the message chain**

Add these props to list/item/bubble components as applicable:

```ts
isMultiSelecting?: boolean
selectedMessageKeys?: string[]
selected?: boolean
readonly?: boolean
onToggleSelect?: (msg: V2NIMMessageForUI) => void
onMultiSelect?: (msg: V2NIMMessageForUI) => void
```

The item root captures taps in multi-select mode, shows a fixed 18px circular checkbox only for `isSelectableMessage(msg)`, and never selects synthetic time rows.

- [ ] **Step 3: Add the long-press Multi-select action**

Add a `multiSelectText` action to normal message menus, including recognized merged-forward custom messages. Do not show mutation menus when `readonly` is true. Trigger `onMultiSelect(msg)` and close the tooltip.

- [ ] **Step 4: Own batch state in Chat/index.vue**

Implement:

```ts
const isMultiSelecting = ref(false)
const selectedMessageKeys = ref<string[]>([])
const selectedMessages = computed(() => msgs.value.filter((msg) => selectedMessageKeys.value.includes(getMessageSelectKey(msg))))
```

Add `enterMultiSelect`, `toggleMessageSelection`, `exitMultiSelect`, limit checks, network checks, invalid-message confirmation, task creation, and batch delete. Hide `MessageInput` and render `MultiMessageOperation` while selecting.

- [ ] **Step 5: Preserve or clear state through events**

Add `FORWARD_TASK_SUCCEEDED` to `events`. Listen in Chat/index, verify the task ID, then clear the matching task and exit multi-select. Cancel and failure paths do not emit this event.

- [ ] **Step 6: Verify focused tests and existing TypeScript helpers**

Run:

```bash
npm run test:merged-forward
./node_modules/.bin/tsc --noEmit --skipLibCheck --target esnext --module esnext --moduleResolution node --types node --esModuleInterop --allowSyntheticDefaultImports utils/forwardTask.ts utils/messageMultiSelect.ts utils/mergedForward.ts
```

Expected: tests pass and the helper type check exits 0.

- [ ] **Step 7: Review the unstaged multi-select UI diff**

## Task 5: Forward Target Modes

**Files:**

- Modify: `pages/Chat/forward.vue`
- Modify: `pages/Chat/message/forward/forward-modal.vue`

- [ ] **Step 1: Resolve task messages by stable key**

On `forward.vue` load, read `taskId`, resolve the active task, fetch source messages from `msgStore.getMsg(sourceConversationId)`, and filter in source order by task keys. Missing/expired/empty tasks show `getForwardMessageFailed` and navigate back.

- [ ] **Step 2: Show the correct confirmation description**

Extend the modal with:

```ts
forwardMode?: ForwardMode
sourceConversationId?: string
```

Use `mergedForwardText`, `oneByOneForwardText`, or `forwardText` as prefix. Resolve P2P source name from user profile name for merged mode and group source name from the team store.

- [ ] **Step 3: Implement mode-specific sending**

- `single`: preserve current `forwardMsgActive` behavior.
- `oneByOne`: call `forwardMsgActive` sequentially in source order; pass the optional comment only once.
- `merged`: call `sendMergedForwardMessage` with the task messages, source/target conversation IDs, app version, SDK version, and comment.

On success, show the localized success toast, emit `FORWARD_TASK_SUCCEEDED` with the task ID, and navigate back. On failure, show failure feedback and keep the page/task available for retry.

- [ ] **Step 4: Run all feature tests**

Run: `npm run test:merged-forward`

Expected: all tests pass.

- [ ] **Step 5: Review the unstaged forward-mode diff**

## Task 6: Merged Card And Read-Only Viewer

**Files:**

- Create: `pages/Chat/message/forward/merged-forward-card.vue`
- Create: `pages/Chat/merged-forward-detail.vue`
- Modify: `pages/Chat/message/message-item.vue`
- Modify: `pages/Chat/message/message-list.vue`
- Modify: `pages.json`

- [ ] **Step 1: Render recognized merged messages as cards**

In `message-item.vue`, test `isMergedForwardMessage(store, msg)` before the unknown-custom branch and render `MergedForwardCard` inside a bubble with no outer message background. The card title keeps the localized suffix visible while ellipsizing only the source name, renders up to three one-line abstracts, and shows the chat-history footer.

- [ ] **Step 2: Load card data and create a viewer task**

On card tap, call `loadMergedForwardMessages`. While loading, ignore duplicate taps. On success, create a viewer task and navigate to:

```text
/pages/Chat/merged-forward-detail?taskId=<encoded-id>
```

On failure, show `getMergedForwardMsgFailedText` and stay in the current page.

- [ ] **Step 3: Implement the read-only page**

Resolve the viewer task on load, render a NavBar titled `chatHistoryText`, and reuse `MessageList` with `readonly`. Remove the viewer task on unload. The readonly branch must:

- preserve text copy, image/video preview, file open/download, and nested merged cards;
- render audio as `[语音消息]` without creating an audio context;
- render call records as localized voice/video call text;
- disable avatar navigation, @ highlighting, read receipts, message menus, input, subscriptions, and mutations.

- [ ] **Step 4: Add the page route**

Register `pages/Chat/merged-forward-detail` in `pages.json` with custom navigation style.

- [ ] **Step 5: Run tests and JSON validation**

Run:

```bash
npm run test:merged-forward
node -e "JSON.parse(require('fs').readFileSync('pages.json','utf8')); console.log('pages.json OK')"
```

Expected: tests pass and output includes `pages.json OK`.

- [ ] **Step 6: Review the unstaged card and viewer diff**

## Task 7: Secondary Previews And Focused Type Gate

**Files:**

- Modify: `pages/Conversation/conversation-list/conversation-item-last-msg-content.vue`
- Modify: `components/MessageOneLine.vue`
- Modify: `pages/Chat/message/message-reply.vue`
- Modify: `locale/zh-Hans.ts`
- Modify: `locale/en.ts`
- Create: `tsconfig.merged-forward.json`
- Modify: `package.json`

- [ ] **Step 1: Add merged previews**

Before generic custom/unknown handling, use `isMergedForwardMessage` to output `[${t("chatHistoryText")}]` in conversation last-message, one-line collection/pin previews, and reply references. Reply-card taps open the same merged viewer flow.

- [ ] **Step 2: Complete localized strings**

Add matching Chinese and English keys for:

```ts
multiSelectText
mergedForwardText
oneByOneForwardText
mergedForwardLimitText
oneByOneForwardLimitText
multiDeleteLimitText
forwardExceptionTitle
forwardExceptionContent
noForwardableMessageText
chatHistoryText
messageOfText
getMergedForwardMsgFailedText
deleteMessagesConfirmText
```

- [ ] **Step 3: Add a focused type-check config**

Create `tsconfig.merged-forward.json` extending the project config, set `noEmit: true`, `allowJs: true`, and include the new helpers, tests, new components, and directly modified Vue files. Exclude `harmony-configs`, `unpackage`, `nativeplugins`, legacy `pages/Friend`, and unrelated known-error files.

Add:

```json
"typecheck:merged-forward": "vue-tsc --noEmit -p tsconfig.merged-forward.json"
```

- [ ] **Step 4: Run focused gates**

Run:

```bash
npm run test:merged-forward
npm run typecheck:merged-forward
git diff --check
```

Expected: all commands exit 0.

- [ ] **Step 5: Review the unstaged previews and gate diff**

## Task 8: H5-Aligned Forward Target Selector

**Files:**

- Create: `utils/forwardTarget.ts`
- Create: `pages/Chat/message/forward/forward-selector.vue`
- Create: `tests/merged-forward/forwardTarget.test.ts`
- Modify: `pages/Chat/forward.vue`
- Modify: `pages/Chat/message/forward/forward-modal.vue`
- Modify: `locale/zh-Hans.ts`
- Modify: `locale/en.ts`

- [ ] **Step 1: Lock target rules with failing tests**

Cover the nine-target limit, deselection at the limit, cross-tab ordered de-duplication, account-scoped recent-forward storage, five-item retention, and the required selector UI markers.

- [ ] **Step 2: Implement target rules and verify the rule tests**

Run: `npx vitest run tests/merged-forward/forwardTarget.test.ts`

Expected: selection and storage tests pass while the UI contract remains red until the selector component exists.

- [ ] **Step 3: Implement the selector component**

Add the H5-aligned recent conversation, friend, and team tabs; search; account-scoped recent forwards; single-target selection; nine-target multi-select; selected avatars; and selected-target detail removal.

- [ ] **Step 4: Connect multi-target forwarding**

Have the selector emit `ForwardTarget[]`. The page opens one confirmation modal, sends the selected forwarding mode to every target, persists successful targets as recent forwards, and emits the task-success event once after all targets succeed.

- [ ] **Step 5: Verify selector integration**

Run:

```bash
npm run test:merged-forward
npm run typecheck:merged-forward
```

Expected: selector tests and the focused type-check exit 0.

## Task 9: Final Verification

**Files:**

- Verify all unstaged feature files and working-tree changes.

- [ ] **Step 1: Run clean-install dependency verification**

Run: `npm ls --depth=0`

Expected: exit 0 with no invalid dependencies; pre-existing extraneous packages must be reported separately rather than hidden.

- [ ] **Step 2: Run automated gates from a fresh command**

Run:

```bash
npm run test:merged-forward
npm run typecheck:merged-forward
node -e "for (const f of ['package.json','package-lock.json','pages.json','manifest.json','tsconfig.json','tsconfig.merged-forward.json']) JSON.parse(require('fs').readFileSync(f,'utf8')); console.log('JSON OK')"
git diff --check
```

Expected: tests, focused type check, JSON parsing, and whitespace check all pass.

- [ ] **Step 3: Re-run the repository baseline and report honestly**

Run: `./node_modules/.bin/vue-tsc --noEmit --allowJs`

Expected: existing repository-wide errors may remain. Record the exact new count and confirm no feature files add errors beyond the documented baseline; do not claim the whole project type-check passes unless exit code is 0.

- [ ] **Step 4: Inspect the final diff and worktree**

Run:

```bash
git status --short
git diff --stat
git diff --cached --stat
```

Expected: only merged-forward implementation, tests, configuration, design, and plan files are present, with no staged changes.

- [ ] **Step 5: Record manual platform verification limits**

Use HBuilderX or available platform tooling for H5, App, WeChat Mini Program, and Harmony builds. If any runtime cannot be launched in the current environment, explicitly report it as unverified with the exact missing tool/device rather than marking it passed.
