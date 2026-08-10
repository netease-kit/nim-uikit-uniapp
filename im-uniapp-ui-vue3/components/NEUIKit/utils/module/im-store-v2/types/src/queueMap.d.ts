export type Flow = "leftToRight" | "rightToLeft";
export declare class Queue<T> {
    private itemLength;
    private flow;
    private queue;
    /**
     * @param itemLength 队列长度
     * @param flow 队列方向
     */
    constructor(itemLength?: number, flow?: Flow);
    push(item: T, noLimit?: boolean): void;
    unshift(item: T, noLimit?: boolean): void;
    pop(): T | undefined;
    shift(): T | undefined;
    resetLimitState(): void;
    clear(): void;
    get(): T[];
    set(value: T[], noLimit?: boolean): void;
    get length(): number;
    private _handle;
}
export declare class QueueMap<T> {
    private itemLength;
    private flow;
    map: Map<string, Queue<T>>;
    constructor(itemLength?: number, flow?: Flow);
    get(key: string): T[] | undefined;
    set(key: string, value: T[], noLimit: boolean): void;
    delete(key: string): boolean;
    resetLimitState(): void;
    clear(): void;
    values(): T[];
}
