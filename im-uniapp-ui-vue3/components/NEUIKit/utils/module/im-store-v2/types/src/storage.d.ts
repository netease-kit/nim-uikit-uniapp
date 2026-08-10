import RootStore from ".";
import { NIM } from "nim-web-sdk-ng/dist/esm/nim";
/**
 * 管理文件上传等存储能力的数据存储。
 *
 * 业务前端通常通过它上传图片、文件、头像等资源，并拿到最终可写入消息或资料字段的文件 URL。
 * 当前封装以简单上传场景为主，适合在发送附件消息或更新个人头像前直接调用。
 */
export declare class StorageStore {
    private rootStore;
    private nim;
    constructor(rootStore: RootStore, nim: NIM);
    /**
     * 上传文件并返回上传后的资源地址。
     *
     * 支持浏览器中的 `File` 对象，也支持小程序 / UniApp 场景中的本地文件路径。
     * @param fileObj 文件对象或本地文件路径
     */
    uploadFileActive(fileObj?: File | string): Promise<string>;
}
