export const create: () => number;

export const destroy: (id: number) => void;

export const runJavaScript: (id: number, code: string, fileName?: string) => any;

export const registerFunction: (id: number, name: string, fn: Function) => void;

export const openInspector: (id: number, waiting?: boolean) => void;

export const closeInspector: (id: number) => void;