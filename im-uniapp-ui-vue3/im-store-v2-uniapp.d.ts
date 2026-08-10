declare module "*im-store-v2/uniapp/index.esm.js" {
  export function autorun(
    view: (reaction: unknown) => unknown,
    opts?: Record<string, unknown>,
  ): () => void;
}
