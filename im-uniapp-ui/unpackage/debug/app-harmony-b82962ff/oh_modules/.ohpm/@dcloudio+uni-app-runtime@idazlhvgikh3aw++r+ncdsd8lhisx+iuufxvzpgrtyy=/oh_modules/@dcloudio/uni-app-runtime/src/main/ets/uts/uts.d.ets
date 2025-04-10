export declare class UTSJSONObject implements ESObject, Record<string, ESObject> {
    constructor(content?: Map<string, ESObject> | Record<string, ESObject>);
    private _resolveKeyPath;
    private _getValue;
    get(key: string): ESObject | null;
    set(key: string, value: ESObject): void;
    getAny(key: string): ESObject | null;
    getString(key: string): string | null;
    getNumber(key: string): number | null;
    getBoolean(key: string): boolean | null;
    getJSON(key: string): UTSJSONObject | null;
    getArray<T = ESObject>(key: string): Array<T> | null;
    toMap(): Map<string, ESObject>;
    forEach(callback: (value: ESObject, key: string) => void): void;
}
export interface IUTSObject {
}
export declare class UTSObject implements IUTSObject {
}
