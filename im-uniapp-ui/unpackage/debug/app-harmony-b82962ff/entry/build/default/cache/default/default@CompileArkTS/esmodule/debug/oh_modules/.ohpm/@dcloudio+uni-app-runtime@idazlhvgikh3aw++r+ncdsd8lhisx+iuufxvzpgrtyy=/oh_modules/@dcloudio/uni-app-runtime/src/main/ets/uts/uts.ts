import { hasOwn, disableEnumerable, } from "@normalized:N&&&@dcloudio/uni-mp-sdk/Index&1.0.0";
export class UTSJSONObject implements ESObject, Record<string, any> {
    constructor(content: Map<string, any> | Record<string, any> = {}) {
        if (content instanceof Map) {
            content.forEach((value: any, key: string) => {
                this[key] = value;
            });
        }
        else {
            const keys = Object.keys(content);
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                if (hasOwn(content, key)) {
                    const value: any = content[key];
                    this[key] = value;
                }
            }
        }
        disableEnumerable(this, [
            '_resolveKeyPath',
            '_getValue',
            'toJSON',
            'get',
            'set',
            'getAny',
            'getString',
            'getNumber',
            'getBoolean',
            'getJSON',
            'getArray',
            'toMap',
            'forEach',
        ]);
    }
    private _resolveKeyPath(keyPath: string): string[] {
        // 非法keyPath不抛出错误，直接返回空数组
        let token = '';
        const keyPathArr: string[] = [];
        let inOpenParentheses = false;
        for (let i = 0; i < keyPath.length; i++) {
            const word = keyPath[i];
            switch (word) {
                case '.':
                    if (token.length > 0) {
                        keyPathArr.push(token);
                        token = '';
                    }
                    break;
                case '[': {
                    inOpenParentheses = true;
                    if (token.length > 0) {
                        keyPathArr.push(token);
                        token = '';
                    }
                    break;
                }
                case ']':
                    if (inOpenParentheses) {
                        if (token.length > 0) {
                            const tokenFirstChar = token[0];
                            const tokenLastChar = token[token.length - 1];
                            if ((tokenFirstChar === '"' && tokenLastChar === '"') ||
                                (tokenFirstChar === "'" && tokenLastChar === "'") ||
                                (tokenFirstChar === '`' && tokenLastChar === '`')) {
                                if (token.length > 2) {
                                    token = token.slice(1, -1);
                                }
                                else {
                                    return [];
                                }
                            }
                            else if (!/^\d+$/.test(token)) {
                                return [];
                            }
                            keyPathArr.push(token);
                            token = '';
                        }
                        else {
                            return [];
                        }
                        inOpenParentheses = false;
                    }
                    else {
                        return [];
                    }
                    break;
                default:
                    token += word;
                    break;
            }
            if (i === keyPath.length - 1) {
                if (token.length > 0) {
                    keyPathArr.push(token);
                    token = '';
                }
            }
        }
        return keyPathArr;
    }
    private _getValue(keyPath: string): any | null {
        const keyPathArr = this._resolveKeyPath(keyPath);
        if (keyPathArr.length === 0) {
            return null;
        }
        let value = this;
        for (let i = 0; i < keyPathArr.length; i++) {
            const key = keyPathArr[i];
            if (value instanceof Object) {
                value = value[key];
            }
            else {
                return null;
            }
        }
        return value;
    }
    get(key: string): any | null {
        return this._getValue(key);
    }
    set(key: string, value: any) {
        this[key] = value;
    }
    getAny(key: string): any | null {
        return this._getValue(key);
    }
    getString(key: string): string | null {
        const value = this._getValue(key) as string;
        if (typeof value === 'string') {
            return value;
        }
        else {
            return null;
        }
    }
    getNumber(key: string): number | null {
        const value = this._getValue(key) as number;
        if (typeof value === 'number') {
            return value;
        }
        else {
            return null;
        }
    }
    getBoolean(key: string): boolean | null {
        const boolean = this._getValue(key) as boolean;
        if (typeof boolean === 'boolean') {
            return boolean;
        }
        else {
            return null;
        }
    }
    getJSON(key: string): UTSJSONObject | null {
        let value = this._getValue(key) as UTSJSONObject;
        if (value instanceof Object) {
            return new UTSJSONObject(value);
        }
        else {
            return null;
        }
    }
    getArray<T = any>(key: string): Array<T> | null {
        let value = this._getValue(key) as Array<T>;
        if (value instanceof Array) {
            return value as Array<T>;
        }
        else {
            return null;
        }
    }
    toMap(): Map<string, any> {
        const map: Map<string, any> = new Map<string, any>();
        const keys = Object.keys(this);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            map.set(key, this[key] as any);
        }
        return map;
    }
    forEach(callback: (value: any, key: string) => void) {
        const keys = Object.keys(this);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            callback(this[key] as any, key);
        }
    }
}
export interface IUTSObject {
}
export class UTSObject implements IUTSObject {
}
