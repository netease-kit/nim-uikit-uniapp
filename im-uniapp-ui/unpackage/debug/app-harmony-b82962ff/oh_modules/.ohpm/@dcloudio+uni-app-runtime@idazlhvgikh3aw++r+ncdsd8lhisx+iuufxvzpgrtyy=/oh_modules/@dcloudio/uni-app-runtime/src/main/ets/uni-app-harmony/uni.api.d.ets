import { UTSObject, UTSJSONObject } from "@dcloudio/uts-harmony";
import { UniError, IUniError, string, UniProvider, AsyncApiSuccessResult, AsyncApiResult } from "@dcloudio/uni-app-harmony";
type AddPhoneContact = (options: AddPhoneContactOptions) => void;
declare class AddPhoneContactSuccess extends UTSObject {
}
type AddPhoneContactSuccessCallback = (result: AddPhoneContactSuccess) => void;
type AddPhoneContactFail = UniError;
type AddPhoneContactFailCallback = (result: AddPhoneContactFail) => void;
type AddPhoneContactComplete = Object;
type AddPhoneContactCompleteCallback = (result: AddPhoneContactComplete) => void;
declare class AddPhoneContactOptions extends UTSObject {
    photoFilePath: string | null;
    nickName: string | null;
    lastName: string | null;
    middleName: string | null;
    firstName: string | null;
    remark: string | null;
    mobilePhoneNumber: string | null;
    weChatNumber: string | null;
    addressCountry: string | null;
    addressState: string | null;
    addressCity: string | null;
    addressStreet: string | null;
    addressPostalCode: string | null;
    organization: string | null;
    title: string | null;
    workFaxNumber: string | null;
    workPhoneNumber: string | null;
    hostNumber: string | null;
    email: string | null;
    url: string | null;
    workAddressCountry: string | null;
    workAddressState: string | null;
    workAddressCity: string | null;
    workAddressStreet: string | null;
    workAddressPostalCode: string | null;
    homeFaxNumber: string | null;
    homePhoneNumber: string | null;
    homeAddressCountry: string | null;
    homeAddressState: string | null;
    homeAddressCity: string | null;
    homeAddressStreet: string | null;
    homeAddressPostalCode: string | null;
    success: AddPhoneContactSuccessCallback | null;
    fail: AddPhoneContactFailCallback | null;
    complete: AddPhoneContactCompleteCallback | null;
}
type StartSoterAuthentication = (options: StartSoterAuthenticationOptions) => void;
type SoterAuthMode = 'fingerPrint' | 'facial' | 'speech';
declare class StartSoterAuthenticationSuccess extends UTSObject {
    errCode: number;
    authMode: SoterAuthMode;
    resultJSON: string | null;
    resultJSONSignature: string | null;
    errMsg: string;
}
type StartSoterAuthenticationSuccessCallback = (result: StartSoterAuthenticationSuccess) => void;
type StartSoterAuthenticationFail = UniError1;
declare class UniError1 extends UTSObject {
    errSubject: string;
    errCode: number;
    errMsg: string;
    data: object | null;
    cause: Object | null;
}
type StartSoterAuthenticationFailCallback = (result: StartSoterAuthenticationFail) => void;
type StartSoterAuthenticationComplete = Object;
type StartSoterAuthenticationCompleteCallback = (result: StartSoterAuthenticationComplete) => void;
declare class StartSoterAuthenticationOptions extends UTSObject {
    requestAuthModes: SoterAuthMode[];
    challenge: string | null;
    authContent: string | null;
    success: StartSoterAuthenticationSuccessCallback | null;
    fail: StartSoterAuthenticationFailCallback | null;
    complete: StartSoterAuthenticationCompleteCallback | null;
}
type CheckIsSupportSoterAuthentication = (options: CheckIsSupportSoterAuthenticationOptions) => void;
declare class CheckIsSupportSoterAuthenticationSuccess extends UTSObject {
    supportMode: SoterAuthMode[];
    errMsg: string;
}
type CheckIsSupportSoterAuthenticationSuccessCallback = (result: CheckIsSupportSoterAuthenticationSuccess) => void;
type CheckIsSupportSoterAuthenticationFail = UniError1;
type CheckIsSupportSoterAuthenticationFailCallback = (result: CheckIsSupportSoterAuthenticationFail) => void;
type CheckIsSupportSoterAuthenticationComplete = Object;
type CheckIsSupportSoterAuthenticationCompleteCallback = (result: CheckIsSupportSoterAuthenticationComplete) => void;
declare class CheckIsSupportSoterAuthenticationOptions extends UTSObject {
    success: CheckIsSupportSoterAuthenticationSuccessCallback | null;
    fail: CheckIsSupportSoterAuthenticationFailCallback | null;
    complete: CheckIsSupportSoterAuthenticationCompleteCallback | null;
}
type CheckIsSoterEnrolledInDevice = (options: CheckIsSoterEnrolledInDeviceOptions) => void;
declare class CheckIsSoterEnrolledInDeviceSuccess extends UTSObject {
    isEnrolled: boolean;
    errMsg: string;
}
type CheckIsSoterEnrolledInDeviceSuccessCallback = (result: CheckIsSoterEnrolledInDeviceSuccess) => void;
type CheckIsSoterEnrolledInDeviceFail = UniError1;
type CheckIsSoterEnrolledInDeviceFailCallback = (result: CheckIsSoterEnrolledInDeviceFail) => void;
type CheckIsSoterEnrolledInDeviceComplete = Object;
type CheckIsSoterEnrolledInDeviceCompleteCallback = (result: CheckIsSoterEnrolledInDeviceComplete) => void;
declare class CheckIsSoterEnrolledInDeviceOptions extends UTSObject {
    checkAuthMode: SoterAuthMode;
    success: CheckIsSoterEnrolledInDeviceSuccessCallback | null;
    fail: CheckIsSoterEnrolledInDeviceFailCallback | null;
    complete: CheckIsSoterEnrolledInDeviceCompleteCallback | null;
}
export type SetClipboardData = (options: SetClipboardDataOptions) => void;
export declare class SetClipboardDataSuccess extends UTSObject {
}
type SetClipboardDataSuccessCallback = (result: SetClipboardDataSuccess) => void;
type SetClipboardDataFail = UniError;
type SetClipboardDataFailCallback = (result: SetClipboardDataFail) => void;
type SetClipboardDataComplete = Object;
type SetClipboardDataCompleteCallback = (result: SetClipboardDataComplete) => void;
export declare class SetClipboardDataOptions extends UTSObject {
    data: string;
    showToast: boolean | null;
    success: SetClipboardDataSuccessCallback | null;
    fail: SetClipboardDataFailCallback | null;
    complete: SetClipboardDataCompleteCallback | null;
}
export type GetClipboardData = (options: GetClipboardDataOptions) => void;
export declare class GetClipboardDataSuccess extends UTSObject {
    data: string;
}
type GetClipboardDataSuccessCallback = (result: GetClipboardDataSuccess) => void;
type GetClipboardDataFail = UniError;
type GetClipboardDataFailCallback = (result: GetClipboardDataFail) => void;
type GetClipboardDataComplete = Object;
type GetClipboardDataCompleteCallback = (result: GetClipboardDataComplete) => void;
export declare class GetClipboardDataOptions extends UTSObject {
    success: GetClipboardDataSuccessCallback | null;
    fail: GetClipboardDataFailCallback | null;
    complete: GetClipboardDataCompleteCallback | null;
}
type CreateInnerAudioContext = () => InnerAudioContext;
interface InnerAudioContext {
    duration: number;
    currentTime: number;
    paused: boolean;
    src: string;
    startTime: number;
    buffered: number;
    autoplay: boolean;
    loop: boolean;
    obeyMuteSwitch: boolean;
    volume: number;
    playbackRate?: number;
    pause(): void;
    stop(): void;
    play(): void;
    seek(position: number): void;
    destroy(): void;
    onCanplay(callback: (result: Object) => void): void;
    onPlay(callback: (result: Object) => void): void;
    onPause(callback: (result: Object) => void): void;
    onStop(callback: (result: Object) => void): void;
    onEnded(callback: (result: Object) => void): void;
    onTimeUpdate(callback: (result: Object) => void): void;
    onError(callback: (result: ICreateInnerAudioContextFail) => void): void;
    onWaiting(callback: (result: Object) => void): void;
    onSeeking(callback: (result: Object) => void): void;
    onSeeked(callback: (result: Object) => void): void;
    offCanplay(callback: (result: Object) => void): void;
    offPlay(callback: (result: Object) => void): void;
    offPause(callback: (result: Object) => void): void;
    offStop(callback: (result: Object) => void): void;
    offEnded(callback: (result: Object) => void): void;
    offTimeUpdate(callback: (result: Object) => void): void;
    offError(callback: (result: ICreateInnerAudioContextFail) => void): void;
    offWaiting(callback: (result: Object) => void): void;
    offSeeking(callback: (result: Object) => void): void;
    offSeeked(callback: (result: Object) => void): void;
}
type CreateInnerAudioContextErrorCode = 1107601 | 1107602 | 1107603 | 1107604 | 1107605 | 1107609;
interface ICreateInnerAudioContextFail extends IUniError {
    errCode: CreateInnerAudioContextErrorCode;
}
type $OnCallback = Function;
type $On = (eventName: string, callback: $OnCallback) => number;
type $OnceCallback = Function;
type $Once = (eventName: string, callback: $OnceCallback) => number;
type $Off = (eventName: string, callback?: Object | null) => void;
type $Emit = (eventName: string, ...args: Array<Object | null>) => void;
declare class ExitSuccess extends UTSObject {
    errMsg: string;
}
type ExitErrorCode = 12001 | 12002 | 12003;
interface IExitError extends IUniError {
    errCode: ExitErrorCode;
}
type ExitFail = IExitError;
type ExitSuccessCallback = (res: ExitSuccess) => void;
type ExitFailCallback = (res: ExitFail) => void;
type ExitCompleteCallback = (res: Object) => void;
declare class ExitOptions extends UTSObject {
    success: ExitSuccessCallback | null;
    fail: ExitFailCallback | null;
    complete: ExitCompleteCallback | null;
}
type Exit = (options?: ExitOptions | null) => void;
export declare class SaveFileSuccess extends UTSObject {
    savedFilePath: string;
}
type SaveFileSuccessCallback = (res: SaveFileSuccess) => void;
export declare class SaveFileFail extends UTSObject {
}
type SaveFileFailCallback = (res: SaveFileFail) => void;
type SaveFileCompleteCallback = (res: Object) => void;
export declare class SaveFileOptions extends UTSObject {
    tempFilePath: string;
    success: SaveFileSuccessCallback | null;
    fail: SaveFileFailCallback | null;
    complete: SaveFileCompleteCallback | null;
}
export declare class GetFileInfoSuccess extends UTSObject {
    digest: string;
    size: number;
}
type GetFileInfoSuccessCallback = (res: GetFileInfoSuccess) => void;
export declare class GetFileInfoFail extends UTSObject {
}
type GetFileInfoFailCallback = (res: GetFileInfoFail) => void;
type GetFileInfoCompleteCallback = (res: Object) => void;
export declare class GetFileInfoOptions extends UTSObject {
    filePath: string;
    digestAlgorithm: string | null;
    success: GetFileInfoSuccessCallback | null;
    fail: GetFileInfoFailCallback | null;
    complete: GetFileInfoCompleteCallback | null;
}
export declare class GetSavedFileInfoSuccess extends UTSObject {
    size: number;
    createTime: number;
}
type GetSavedFileInfoSuccessCallback = (res: GetSavedFileInfoSuccess) => void;
export declare class GetSavedFileInfoFail extends UTSObject {
}
type GetSavedFileInfoFailCallback = (res: GetSavedFileInfoFail) => void;
type GetSavedFileInfoCompleteCallback = (res: Object) => void;
export declare class GetSavedFileInfoOptions extends UTSObject {
    filePath: string;
    success: GetSavedFileInfoSuccessCallback | null;
    fail: GetSavedFileInfoFailCallback | null;
    complete: GetSavedFileInfoCompleteCallback | null;
}
export declare class RemoveSavedFileSuccess extends UTSObject {
}
type RemoveSavedFileSuccessCallback = (res: RemoveSavedFileSuccess) => void;
export declare class RemoveSavedFileFail extends UTSObject {
}
type RemoveSavedFileFailCallback = (res: RemoveSavedFileFail) => void;
type RemoveSavedFileCompleteCallback = (res: Object) => void;
export declare class RemoveSavedFileOptions extends UTSObject {
    filePath: string;
    success: RemoveSavedFileSuccessCallback | null;
    fail: RemoveSavedFileFailCallback | null;
    complete: RemoveSavedFileCompleteCallback | null;
}
export declare class SavedFileListItem extends UTSObject {
    filePath: string;
    size: number;
    createTime: number;
}
export declare class GetSavedFileListSuccess extends UTSObject {
    fileList: SavedFileListItem[];
}
type GetSavedFileListSuccessCallback = (res: GetSavedFileListSuccess) => void;
export declare class GetSavedFileListFail extends UTSObject {
}
type GetSavedFileListFailCallback = (res: GetSavedFileListFail) => void;
type GetSavedFileListCompleteCallback = (res: Object) => void;
export declare class GetSavedFileListOptions extends UTSObject {
    success: GetSavedFileListSuccessCallback | null;
    fail: GetSavedFileListFailCallback | null;
    complete: GetSavedFileListCompleteCallback | null;
}
export type SaveFile = (options?: SaveFileOptions | null) => void;
export type GetFileInfo = (options?: GetFileInfoOptions | null) => void;
export type GetSavedFileInfo = (options?: GetSavedFileInfoOptions | null) => void;
export type RemoveSavedFile = (options?: RemoveSavedFileOptions | null) => void;
export type GetSavedFileList = (options?: GetSavedFileListOptions | null) => void;
declare class ReadFileSuccessResult extends UTSObject {
    data: Object;
}
declare class OpenFileSuccessResult extends UTSObject {
    fd: string;
}
declare class FileManagerSuccessResult extends UTSObject {
    errMsg: string;
}
type FileManagerSuccessCallback = (res: FileManagerSuccessResult) => void;
type FileManagerFailCallback = (res: FileSystemManagerFail) => void;
type FileManagerCompleteCallback = (res: Object) => void;
type ReadFileSuccessCallback = (res: ReadFileSuccessResult) => void;
declare class ReadFileOptions extends UTSObject {
    encoding: "base64" | "utf-8" | null;
    filePath: string.URIString;
    success: ReadFileSuccessCallback | null;
    fail: FileManagerFailCallback | null;
    complete: FileManagerCompleteCallback | null;
}
declare class WriteFileOptions extends UTSObject {
    filePath: string.URIString;
    encoding: "ascii" | "base64" | "utf-8" | null;
    data: Object;
    success: FileManagerSuccessCallback | null;
    fail: FileManagerFailCallback | null;
    complete: FileManagerCompleteCallback | null;
}
declare class AppendFileOptions extends UTSObject {
    filePath: string.URIString;
    encoding: "ascii" | "base64" | "utf-8" | null;
    data: Object;
    success: FileManagerSuccessCallback | null;
    fail: FileManagerFailCallback | null;
    complete: FileManagerCompleteCallback | null;
}
type OpenFileSuccessCallback = (res: OpenFileSuccessResult) => void;
declare class OpenFileOptions extends UTSObject {
    filePath: string.URIString;
    flag: "a" | "ax" | "a+" | "ax+" | "r" | "r+" | "w" | "wx" | "w+" | "wx" | "wx+";
    success: OpenFileSuccessCallback | null;
    fail: FileManagerFailCallback | null;
    complete: FileManagerCompleteCallback | null;
}
declare class OpenFileSyncOptions extends UTSObject {
    filePath: string.URIString;
    flag: "a" | "ax" | "a+" | "ax+" | "r" | "r+" | "w" | "wx" | "w+" | "wx" | "wx+";
}
type UnLinkSuccessCallback = (res: FileManagerSuccessResult) => void;
declare class UnLinkOptions extends UTSObject {
    filePath: string.URIString;
    success: UnLinkSuccessCallback | null;
    fail: FileManagerFailCallback | null;
    complete: FileManagerCompleteCallback | null;
}
type MkDirSuccessCallback = (res: FileManagerSuccessResult) => void;
declare class MkDirOptions extends UTSObject {
    dirPath: string.URIString;
    recursive: boolean;
    success: MkDirSuccessCallback | null;
    fail: FileManagerFailCallback | null;
    complete: FileManagerCompleteCallback | null;
}
declare class RmDirOptions extends UTSObject {
    dirPath: string.URIString;
    recursive: boolean;
    success: MkDirSuccessCallback | null;
    fail: FileManagerFailCallback | null;
    complete: FileManagerCompleteCallback | null;
}
declare class ReadDirSuccessResult extends UTSObject {
    files: string[];
}
type ReadDirSuccessCallback = (res: ReadDirSuccessResult) => void;
declare class ReadDirOptions extends UTSObject {
    dirPath: string.URIString;
    success: ReadDirSuccessCallback | null;
    fail: FileManagerFailCallback | null;
    complete: FileManagerCompleteCallback | null;
}
declare class AccessOptions extends UTSObject {
    path: string.URIString;
    success: FileManagerSuccessCallback | null;
    fail: FileManagerFailCallback | null;
    complete: FileManagerCompleteCallback | null;
}
declare class RenameOptions extends UTSObject {
    oldPath: string.URIString;
    newPath: string.URIString;
    success: FileManagerSuccessCallback | null;
    fail: FileManagerFailCallback | null;
    complete: FileManagerCompleteCallback | null;
}
declare class CopyFileOptions extends UTSObject {
    srcPath: string.URIString;
    destPath: string.URIString;
    success: FileManagerSuccessCallback | null;
    fail: FileManagerFailCallback | null;
    complete: FileManagerCompleteCallback | null;
}
declare class SaveFileOptions1 extends UTSObject {
    tempFilePath: string.URIString;
    filePath: string.URIString | null;
    success: SaveFileSuccessCallback1 | null;
    fail: FileManagerFailCallback | null;
    complete: FileManagerCompleteCallback | null;
}
type SaveFileSuccessCallback1 = (res: SaveFileSuccessResult) => void;
declare class SaveFileSuccessResult extends UTSObject {
    savedFilePath: string;
}
declare class GetFileInfoSuccessResult extends UTSObject {
    digest: string;
    size: number;
    errMsg: string;
}
type GetFileInfoSuccessCallback1 = (res: GetFileInfoSuccessResult) => void;
declare class GetFileInfoOptions1 extends UTSObject {
    filePath: string.URIString;
    digestAlgorithm: "md5" | "sha1" | null;
    success: GetFileInfoSuccessCallback1 | null;
    fail: FileManagerFailCallback | null;
    complete: FileManagerCompleteCallback | null;
}
interface Stats {
    mode: number;
    size: number;
    lastAccessedTime: number;
    lastModifiedTime: number;
    mIsFile: boolean;
    isDirectory(): boolean;
    isFile(): boolean;
}
declare class FileStats extends UTSObject {
    path: string;
    stats: Stats;
}
declare class StatSuccessResult extends UTSObject {
    errMsg: string;
    stats: FileStats[];
}
type StatSuccessCallback = (res: StatSuccessResult) => void;
declare class StatOptions extends UTSObject {
    path: string.URIString;
    recursive: boolean;
    success: StatSuccessCallback | null;
    fail: FileManagerFailCallback | null;
    complete: FileManagerCompleteCallback | null;
}
declare class UnzipFileOptions extends UTSObject {
    zipFilePath: string;
    targetPath: string;
    success: FileManagerSuccessCallback | null;
    fail: FileManagerFailCallback | null;
    complete: FileManagerCompleteCallback | null;
}
declare class GetSavedFileListResult extends UTSObject {
    fileList: string[];
}
type GetSavedFileListCallback = (res: GetSavedFileListResult) => void;
declare class GetSavedFileListOptions1 extends UTSObject {
    success: GetSavedFileListCallback | null;
    fail: FileManagerFailCallback | null;
    complete: FileManagerCompleteCallback | null;
}
declare class TruncateFileOptions extends UTSObject {
    filePath: string.URIString;
    length: number;
    success: FileManagerSuccessCallback | null;
    fail: FileManagerFailCallback | null;
    complete: FileManagerCompleteCallback | null;
}
declare class ReadCompressedFileResult extends UTSObject {
    data: string;
}
type ReadCompressedFileCallback = (res: ReadCompressedFileResult) => void;
declare class ReadCompressedFileOptions extends UTSObject {
    filePath: string.URIString;
    compressionAlgorithm: "br";
    success: ReadCompressedFileCallback | null;
    fail: FileManagerFailCallback | null;
    complete: FileManagerCompleteCallback | null;
}
declare class RemoveSavedFileOptions1 extends UTSObject {
    filePath: string.URIString;
    success: FileManagerSuccessCallback | null;
    fail: FileManagerFailCallback | null;
    complete: FileManagerCompleteCallback | null;
}
declare class WriteResult extends UTSObject {
    bytesWritten: number;
    errMsg: string;
}
type WriteCallback = (res: WriteResult) => void;
declare class WriteOptions extends UTSObject {
    fd: string;
    data: Object;
    offset: number | null;
    length: number | null;
    position: number | null;
    encoding: "ascii" | "base64" | "utf-8" | null;
    success: WriteCallback | null;
    fail: FileManagerFailCallback | null;
    complete: FileManagerCompleteCallback | null;
}
declare class WriteSyncOptions extends UTSObject {
    fd: string;
    data: Object;
    encoding: "ascii" | "base64" | "utf-8" | null;
    length: number | null;
    offset: number | null;
    position: number | null;
}
declare class CloseOptions extends UTSObject {
    fd: string;
    success: FileManagerSuccessCallback | null;
    fail: FileManagerFailCallback | null;
    complete: FileManagerCompleteCallback | null;
}
declare class CloseSyncOptions extends UTSObject {
    fd: string;
}
declare class FStatSuccessResult extends UTSObject {
    stats: Stats;
}
type FStatSuccessCallback = (res: FStatSuccessResult) => void;
declare class FStatOptions extends UTSObject {
    fd: string;
    success: FStatSuccessCallback | null;
    fail: FileManagerFailCallback | null;
    complete: FileManagerCompleteCallback | null;
}
declare class FStatSyncOptions extends UTSObject {
    fd: string;
}
declare class FTruncateFileOptions extends UTSObject {
    fd: string;
    length: number;
    success: FileManagerSuccessCallback | null;
    fail: FileManagerFailCallback | null;
    complete: FileManagerCompleteCallback | null;
}
declare class FTruncateFileSyncOptions extends UTSObject {
    fd: string;
    length: number;
}
declare class EntryItem extends UTSObject {
    path: string;
    encoding: "ascii" | "base64" | "utf-8" | null;
}
declare class EntriesResult extends UTSObject {
    result: Map<string, ZipFileItem>;
}
declare class ZipFileItem extends UTSObject {
    data: Object | null;
    errMsg: string;
}
type ReadZipEntryCallback = (res: EntriesResult) => void;
declare class ReadZipEntryOptions extends UTSObject {
    filePath: string.URIString;
    encoding: "ascii" | "base64" | "utf-8" | null;
    entries: EntryItem[] | null;
    success: ReadZipEntryCallback | null;
    fail: FileManagerFailCallback | null;
    complete: FileManagerCompleteCallback | null;
}
declare class ReadSuccessCallbackResult extends UTSObject {
    arrayBuffer: ArrayBuffer;
    bytesRead: number;
    errMsg: string;
}
type ReadSuccessCallback = (result: ReadSuccessCallbackResult) => void;
declare class ReadOption extends UTSObject {
    arrayBuffer: ArrayBuffer;
    fd: string;
    length: number | null;
    offset: number | null;
    position: number | null;
    complete: FileManagerCompleteCallback | null;
    fail: FileManagerFailCallback | null;
    success: ReadSuccessCallback | null;
}
declare class ReadSyncOption extends UTSObject {
    arrayBuffer: ArrayBuffer;
    fd: string;
    length: number | null;
    offset: number | null;
    position: number | null;
}
declare class ReadResult extends UTSObject {
    arrayBuffer: ArrayBuffer;
    bytesRead: number;
}
interface FileSystemManager {
    readFile(options: ReadFileOptions): void;
    readFileSync(filePath: string, encoding?: string): Object;
    writeFile(options: WriteFileOptions): void;
    read(option: ReadOption): void;
    readSync(option: ReadSyncOption): ReadResult;
    writeFileSync(filePath: string, data: Object, encoding?: string): void;
    unlink(options: UnLinkOptions): void;
    unlinkSync(filePath: string): void;
    mkdir(options: MkDirOptions): void;
    mkdirSync(dirPath: string, recursive: boolean): void;
    rmdir(options: RmDirOptions): void;
    rmdirSync(dirPath: string, recursive: boolean): void;
    readdir(options: ReadDirOptions): void;
    readdirSync(dirPath: string): string[] | null;
    access(options: AccessOptions): void;
    accessSync(path: string): void;
    rename(options: RenameOptions): void;
    renameSync(oldPath: string, newPath: string): void;
    copyFile(options: CopyFileOptions): void;
    copyFileSync(srcPath: string, destPath: string): void;
    getFileInfo(options: GetFileInfoOptions1): void;
    stat(options: StatOptions): void;
    statSync(path: string, recursive: boolean): FileStats[];
    appendFile(options: AppendFileOptions): void;
    appendFileSync(filePath: string, data: Object, encoding?: string): void;
    saveFile(options: SaveFileOptions1): void;
    saveFileSync(tempFilePath: string, filePath: string | null): string;
    removeSavedFile(options: RemoveSavedFileOptions1): void;
    unzip(options: UnzipFileOptions): void;
    getSavedFileList(options: GetSavedFileListOptions1): void;
    truncate(options: TruncateFileOptions): void;
    truncateSync(filePath: string, length?: number): void;
    readCompressedFile(options: ReadCompressedFileOptions): void;
    readCompressedFileSync(filePath: string, compressionAlgorithm: string): string;
    open(options: OpenFileOptions): void;
    openSync(options: OpenFileSyncOptions): string;
    write(options: WriteOptions): void;
    writeSync(options: WriteSyncOptions): WriteResult;
    close(options: CloseOptions): void;
    closeSync(options: CloseSyncOptions): void;
    fstat(options: FStatOptions): void;
    fstatSync(options: FStatSyncOptions): Stats;
    ftruncate(options: FTruncateFileOptions): void;
    ftruncateSync(options: FTruncateFileSyncOptions): void;
    readZipEntry(options: ReadZipEntryOptions): void;
}
type GetFileSystemManager = () => FileSystemManager;
type FileSystemManagerFail = IFileSystemManagerFail;
interface IFileSystemManagerFail extends IUniError {
    errCode: number;
}
type GetAppAuthorizeSetting = () => GetAppAuthorizeSettingResult;
declare class GetAppAuthorizeSettingResult extends UTSObject {
    albumAuthorized: 'authorized' | 'denied' | 'not determined' | 'config error';
    bluetoothAuthorized: 'authorized' | 'denied' | 'not determined' | 'config error';
    cameraAuthorized: 'authorized' | 'denied' | 'not determined' | 'config error';
    locationAuthorized: 'authorized' | 'denied' | 'not determined' | 'config error';
    locationAccuracy: 'reduced' | 'full' | 'unsupported' | null;
    locationReducedAccuracy: boolean | null;
    microphoneAuthorized: 'authorized' | 'denied' | 'not determined' | 'config error';
    notificationAuthorized: 'authorized' | 'denied' | 'not determined' | 'config error';
    notificationAlertAuthorized: 'authorized' | 'denied' | 'not determined' | 'config error' | null;
    notificationBadgeAuthorized: 'authorized' | 'denied' | 'not determined' | 'config error' | null;
    notificationSoundAuthorized: 'authorized' | 'denied' | 'not determined' | 'config error' | null;
    phoneCalendarAuthorized: 'authorized' | 'denied' | 'not determined' | null;
}
declare class GetAppBaseInfoOptions extends UTSObject {
    filter: Array<string>;
}
export declare class GetAppBaseInfoResult extends UTSObject {
    appId: string | null;
    appName: string | null;
    appVersion: string | null;
    appVersionCode: string | null;
    appLanguage: string | null;
    language: string | null;
    version: string | null;
    appWgtVersion: string | null;
    hostLanguage: string | null;
    hostVersion: string | null;
    hostName: string | null;
    hostPackageName: string | null;
    hostSDKVersion: string | null;
    hostTheme: string | null;
    isUniAppX: boolean | null;
    uniCompileVersion: string | null;
    uniCompilerVersion: string | null;
    uniPlatform: 'app' | 'web' | 'mp-weixin' | 'mp-alipay' | 'mp-baidu' | 'mp-toutiao' | 'mp-lark' | 'mp-qq' | 'mp-kuaishou' | 'mp-jd' | 'mp-360' | 'quickapp-webview' | 'quickapp-webview-union' | 'quickapp-webview-huawei' | null;
    uniRuntimeVersion: string | null;
    uniCompileVersionCode: number | null;
    uniCompilerVersionCode: number | null;
    uniRuntimeVersionCode: number | null;
    packageName: string | null;
    bundleId: string | null;
    signature: string | null;
    appTheme: 'light' | 'dark' | 'auto' | null;
    channel: string | null;
}
export type GetAppBaseInfo = (options?: GetAppBaseInfoOptions | null) => GetAppBaseInfoResult;
type GetBackgroundAudioManager = () => BackgroundAudioManager;
interface BackgroundAudioManager {
    duration: number;
    currentTime: number;
    paused: boolean;
    src: string;
    startTime: number;
    buffered: number;
    title: string;
    epname: string;
    singer: string;
    coverImgUrl: string;
    webUrl: string;
    protocol: string;
    playbackRate?: number;
    play(): void;
    pause(): void;
    seek(position: number): void;
    stop(): void;
    onCanplay(callback: (result: Object) => void): void;
    onPlay(callback: (result: Object) => void): void;
    onPause(callback: (result: Object) => void): void;
    onStop(callback: (result: Object) => void): void;
    onEnded(callback: (result: Object) => void): void;
    onSeeking(callback: (result: Object) => void): void;
    onSeeked(callback: (result: Object) => void): void;
    onTimeUpdate(callback: (result: Object) => void): void;
    onPrev(callback: (result: Object) => void): void;
    onNext(callback: (result: Object) => void): void;
    onError(callback: (result: ICreateBackgroundAudioFail) => void): void;
    onWaiting(callback: (result: Object) => void): void;
}
type CreateBackgroundAudioErrorCode = 1107601 | 1107602 | 1107603 | 1107604 | 1107605 | 1107609;
interface ICreateBackgroundAudioFail extends IUniError {
    errCode: CreateBackgroundAudioErrorCode;
}
declare class GetDeviceInfoOptions extends UTSObject {
    filter: Array<string>;
}
export declare class GetDeviceInfoResult extends UTSObject {
    brand: string | null;
    deviceBrand: string | null;
    deviceId: string | null;
    model: string | null;
    deviceModel: string | null;
    deviceType: 'phone' | 'pad' | 'tv' | 'watch' | 'pc' | 'undefined' | 'car' | 'vr' | 'appliance' | null;
    deviceOrientation: string | null;
    devicePixelRatio: number | null;
    system: string | null;
    platform: 'ios' | 'android' | 'harmonyos' | 'mac' | 'windows' | 'linux' | null;
    isRoot: boolean | null;
    isSimulator: boolean | null;
    isUSBDebugging: boolean | null;
    osName: 'ios' | 'android' | 'harmonyos' | 'macos' | 'windows' | 'linux' | null;
    osVersion: string | null;
    osLanguage: string | null;
    osTheme: 'light' | 'dark' | null;
    osAndroidAPILevel: number | null;
    romName: string | null;
    romVersion: string | null;
}
export type GetDeviceInfo = (options?: GetDeviceInfoOptions | null) => GetDeviceInfoResult;
type GetNetworkType = (options: GetNetworkTypeOptions) => void;
declare class GetNetworkTypeSuccess extends UTSObject {
    networkType: string;
}
type GetNetworkTypeSuccessCallback = (result: GetNetworkTypeSuccess) => void;
type GetNetworkTypeFail = UniError;
type GetNetworkTypeFailCallback = (result: GetNetworkTypeFail) => void;
type GetNetworkTypeComplete = Object;
type GetNetworkTypeCompleteCallback = (result: GetNetworkTypeComplete) => void;
declare class GetNetworkTypeOptions extends UTSObject {
    success: GetNetworkTypeSuccessCallback | null;
    fail: GetNetworkTypeFailCallback | null;
    complete: GetNetworkTypeCompleteCallback | null;
}
declare class OnNetworkStatusChangeCallbackResult extends UTSObject {
    isConnected: boolean;
    networkType: string;
}
type OnNetworkStatusChangeCallback = (result: OnNetworkStatusChangeCallbackResult) => void;
type OnNetworkStatusChange = (callback: OnNetworkStatusChangeCallback) => void;
type OffNetworkStatusChange = (callback: (result: Object) => void) => void;
export declare class GetProviderSuccess extends UTSObject {
    service: 'payment' | 'oauth';
    provider: string[];
    providers: UniProvider[];
}
export declare class GetProviderSyncSuccess extends UTSObject {
    service: 'payment' | 'location' | 'oauth';
    providerIds: string[];
    providerObjects: UniProvider[];
}
export type GetProviderSync = (options: GetProviderSyncOptions) => GetProviderSyncSuccess;
export declare class GetProviderSyncOptions extends UTSObject {
    service: 'payment' | 'location' | 'oauth';
}
type GetProviderSuccessCallback = (result: GetProviderSuccess) => void;
type GetProviderFail = IGetProviderFail;
type GetProviderFailCallback = (result: GetProviderFail) => void;
type GetProviderComplete = Object;
type GetProviderCompleteCallback = (result: GetProviderComplete) => void;
export declare class GetProviderOptions extends UTSObject {
    service: 'payment' | 'oauth';
    success: GetProviderSuccessCallback | null;
    fail: GetProviderFailCallback | null;
    complete: GetProviderCompleteCallback | null;
}
export type GetProvider = (options: GetProviderOptions) => void;
type ProviderErrorCode = 110600;
interface IGetProviderFail extends IUniError {
    errCode: ProviderErrorCode;
}
type GetRecorderManager = () => RecorderManager;
declare class RecorderManagerStartOptions extends UTSObject {
    duration: number | null;
    sampleRate: number | null;
    numberOfChannels: number | null;
    encodeBitRate: number | null;
    format: 'aac' | 'mp3' | 'PCM' | 'wav' | null;
    frameSize: number | null;
}
interface RecorderManagerOnStopResult {
    tempFilePath: string;
}
interface RecorderManager {
    start(options: RecorderManagerStartOptions): void;
    pause(): void;
    resume(): void;
    stop(): void;
    onStart(options: (result: Object) => void): void;
    onPause(options: (result: Object) => void): void;
    onStop(options: (result: RecorderManagerOnStopResult) => void): void;
    onFrameRecorded(options: (result: Object) => void): void;
    onError(options: (result: Object) => void): void;
    onResume?: (options: (result: Object) => void) => void;
    onInterruptionBegin?: (options: (result: Object) => void) => void;
    onInterruptionEnd?: (options: (result: Object) => void) => void;
}
export type GetSystemInfo = (options: GetSystemInfoOptions) => void;
export type GetSystemInfoSync = () => GetSystemInfoResult;
export type GetWindowInfo = () => GetWindowInfoResult;
export declare class SafeArea extends UTSObject {
    left: number;
    right: number;
    top: number;
    bottom: number;
    width: number;
    height: number;
}
export declare class SafeAreaInsets extends UTSObject {
    left: number;
    right: number;
    top: number;
    bottom: number;
}
export declare class GetSystemInfoResult extends UTSObject {
    SDKVersion: string;
    appId: string;
    appLanguage: string;
    appName: string;
    appVersion: string;
    appVersionCode: string;
    appWgtVersion: string | null;
    brand: string;
    browserName: string;
    browserVersion: string;
    deviceId: string;
    deviceBrand: string;
    deviceModel: string;
    deviceType: 'phone' | 'pad' | 'tv' | 'watch' | 'pc' | 'undefined' | 'car' | 'vr' | 'appliance';
    devicePixelRatio: number;
    deviceOrientation: 'portrait' | 'landscape';
    language: string;
    model: string | null;
    osName: 'ios' | 'android' | 'harmonyos' | 'macos' | 'windows' | 'linux';
    osVersion: string;
    osLanguage: string;
    osTheme: 'light' | 'dark' | null;
    pixelRatio: number;
    platform: 'ios' | 'android' | 'harmonyos' | 'mac' | 'windows' | 'linux';
    screenWidth: number;
    screenHeight: number;
    statusBarHeight: number;
    system: string;
    safeArea: SafeArea;
    safeAreaInsets: SafeAreaInsets;
    ua: string;
    uniCompileVersion: string;
    uniCompilerVersion: string;
    uniPlatform: 'app' | 'web' | 'mp-weixin' | 'mp-alipay' | 'mp-baidu' | 'mp-toutiao' | 'mp-lark' | 'mp-qq' | 'mp-kuaishou' | 'mp-jd' | 'mp-360' | 'quickapp-webview' | 'quickapp-webview-union' | 'quickapp-webview-huawei';
    uniRuntimeVersion: string;
    uniCompileVersionCode: number;
    uniCompilerVersionCode: number;
    uniRuntimeVersionCode: number;
    version: string;
    romName: string;
    romVersion: string;
    windowWidth: number;
    windowHeight: number;
    windowTop: number;
    windowBottom: number;
    osAndroidAPILevel: number | null;
    appTheme: 'light' | 'dark' | 'auto' | null;
}
type GetSystemInfoSuccessCallback = (result: GetSystemInfoResult) => void;
type GetSystemInfoFail = UniError;
type GetSystemInfoFailCallback = (result: GetSystemInfoFail) => void;
type GetSystemInfoComplete = Object;
type GetSystemInfoCompleteCallback = (result: GetSystemInfoComplete) => void;
export declare class GetSystemInfoOptions extends UTSObject {
    success: GetSystemInfoSuccessCallback | null;
    fail: GetSystemInfoFailCallback | null;
    complete: GetSystemInfoCompleteCallback | null;
}
export declare class GetWindowInfoResult extends UTSObject {
    pixelRatio: number;
    screenWidth: number;
    screenHeight: number;
    windowWidth: number;
    windowHeight: number;
    statusBarHeight: number;
    windowTop: number;
    windowBottom: number;
    safeArea: SafeArea;
    safeAreaInsets: SafeAreaInsets;
    screenTop: number;
}
declare class GetSystemSettingResult extends UTSObject {
    bluetoothEnabled: boolean | null;
    bluetoothError: string | null;
    locationEnabled: boolean;
    wifiEnabled: boolean | null;
    wifiError: string | null;
    deviceOrientation: 'portrait' | 'landscape';
}
type GetSystemSetting = () => GetSystemSettingResult;
export declare class HideKeyboardSuccess extends UTSObject {
}
export declare class HideKeyboardFail extends UTSObject {
}
type HideKeyboardSuccessCallback = (res: HideKeyboardSuccess) => void;
type HideKeyboardFailCallback = (res: HideKeyboardFail) => void;
type HideKeyboardCompleteCallback = (res: Object) => void;
export declare class HideKeyboardOptions extends UTSObject {
    success: HideKeyboardSuccessCallback | null;
    fail: HideKeyboardFailCallback | null;
    complete: HideKeyboardCompleteCallback | null;
}
type HideKeyboard = (options?: HideKeyboardOptions | null) => void;
export type MakePhoneCall = (options: MakePhoneCallOptions) => void;
export declare class MakePhoneCallSuccess extends UTSObject {
}
type MakePhoneCallSuccessCallback = (result: MakePhoneCallSuccess) => void;
type MakePhoneCallFail = UniError;
type MakePhoneCallFailCallback = (result: MakePhoneCallFail) => void;
type MakePhoneCallComplete = Object;
type MakePhoneCallCompleteCallback = (result: MakePhoneCallComplete) => void;
export declare class MakePhoneCallOptions extends UTSObject {
    phoneNumber: string;
    success: MakePhoneCallSuccessCallback | null;
    fail: MakePhoneCallFailCallback | null;
    complete: MakePhoneCallCompleteCallback | null;
}
type MediaOrientation = 'up' | 'down' | 'left' | 'right' | 'up-mirrored' | 'down-mirrored' | 'left-mirrored' | 'right-mirrored';
type MediaErrorCode = 1101001 | 1101002 | 1101003 | 1101004 | 1101005 | 1101006 | 1101007 | 1101008 | 1101009 | 1101010;
interface IMediaError extends IUniError {
    errCode: MediaErrorCode;
}
declare class ChooseImageTempFile extends UTSObject {
    path: string;
    size: number;
    name: string | null;
    type: string | null;
}
export declare class ChooseImageSuccess extends UTSObject {
    errSubject: string;
    errMsg: string;
    tempFilePaths: Array<string>;
    tempFiles: ChooseImageTempFile[];
}
type ChooseImageFail = IMediaError;
type ChooseImageSuccessCallback = (callback: ChooseImageSuccess) => void;
type ChooseImageFailCallback = (callback: ChooseImageFail) => void;
type ChooseImageCompleteCallback = (callback: Object) => void;
declare class ChooseImageCropOptions extends UTSObject {
    width: number;
    height: number;
    quality: (number) | null;
    resize: (boolean) | null;
}
type ChooseImagePageOrientation = "auto" | "portrait" | "landscape";
type ChooseImageAlbumMode = "custom" | "system";
export declare class ChooseImageOptions extends UTSObject {
    pageOrientation: ChooseImagePageOrientation | null;
    albumMode: ChooseImageAlbumMode | null;
    count: (number) | null;
    sizeType: (string[]) | null;
    sourceType: (string[]) | null;
    extension: (string[]) | null;
    crop: (ChooseImageCropOptions) | null;
    success: (ChooseImageSuccessCallback) | null;
    fail: (ChooseImageFailCallback) | null;
    complete: (ChooseImageCompleteCallback) | null;
}
export type ChooseImage = (options: ChooseImageOptions) => void;
export declare class PreviewImageSuccess extends UTSObject {
    errSubject: string;
    errMsg: string;
}
type PreviewImageFail = IMediaError;
type PreviewImageSuccessCallback = (callback: PreviewImageSuccess) => void;
type PreviewImageFailCallback = (callback: PreviewImageFail) => void;
type PreviewImageCompleteCallback = ChooseImageCompleteCallback;
export declare class PreviewImageOptions extends UTSObject {
    current: Object | null;
    urls: Array<string.ImageURIString>;
    showmenu: boolean | null;
    indicator: 'default' | 'number' | 'none' | null;
    loop: boolean | null;
    success: (PreviewImageSuccessCallback) | null;
    fail: (PreviewImageFailCallback) | null;
    complete: (PreviewImageCompleteCallback) | null;
}
export type PreviewImage = (options: PreviewImageOptions) => void;
export type ClosePreviewImage = (options: ClosePreviewImageOptions) => void;
export declare class ClosePreviewImageSuccess extends UTSObject {
    errMsg: string;
}
type ClosePreviewImageFail = IMediaError;
type ClosePreviewImageSuccessCallback = (callback: ClosePreviewImageSuccess) => void;
type ClosePreviewImageFailCallback = (callback: ClosePreviewImageFail) => void;
type ClosePreviewImageCompleteCallback = ChooseImageCompleteCallback;
export declare class ClosePreviewImageOptions extends UTSObject {
    success: (ClosePreviewImageSuccessCallback) | null;
    fail: (ClosePreviewImageFailCallback) | null;
    complete: (ClosePreviewImageCompleteCallback) | null;
}
export type GetImageInfo = (options: GetImageInfoOptions) => void;
export declare class GetImageInfoSuccess extends UTSObject {
    width: number;
    height: number;
    path: string;
    orientation: MediaOrientation | null;
    type: string | null;
}
type GetImageInfoFail = IMediaError;
type GetImageInfoSuccessCallback = (callback: GetImageInfoSuccess) => void;
type GetImageInfoFailCallback = (callback: GetImageInfoFail) => void;
type GetImageInfoCompleteCallback = ChooseImageCompleteCallback;
export declare class GetImageInfoOptions extends UTSObject {
    src: string.ImageURIString;
    success: (GetImageInfoSuccessCallback) | null;
    fail: (GetImageInfoFailCallback) | null;
    complete: (GetImageInfoCompleteCallback) | null;
}
export type SaveImageToPhotosAlbum = (options: SaveImageToPhotosAlbumOptions) => void;
export declare class SaveImageToPhotosAlbumSuccess extends UTSObject {
    path: string;
}
type SaveImageToPhotosAlbumFail = IMediaError;
type SaveImageToPhotosAlbumSuccessCallback = (callback: SaveImageToPhotosAlbumSuccess) => void;
type SaveImageToPhotosAlbumFailCallback = (callback: SaveImageToPhotosAlbumFail) => void;
type SaveImageToPhotosAlbumCompleteCallback = ChooseImageCompleteCallback;
export declare class SaveImageToPhotosAlbumOptions extends UTSObject {
    filePath: string.ImageURIString;
    success: (SaveImageToPhotosAlbumSuccessCallback) | null;
    fail: (SaveImageToPhotosAlbumFailCallback) | null;
    complete: (SaveImageToPhotosAlbumCompleteCallback) | null;
}
type CompressImage = (options: CompressImageOptions) => void;
declare class CompressImageSuccess extends UTSObject {
    tempFilePath: string;
}
type CompressImageFail = IMediaError;
type CompressImageSuccessCallback = (callback: CompressImageSuccess) => void;
type CompressImageFailCallback = (callback: CompressImageFail) => void;
type CompressImageCompleteCallback = ChooseImageCompleteCallback;
declare class CompressImageOptions extends UTSObject {
    src: string.ImageURIString;
    quality: number | null;
    rotate: number | null;
    width: string | null;
    height: string | null;
    compressedHeight: number | null;
    compressedWidth: number | null;
    success: (CompressImageSuccessCallback) | null;
    fail: (CompressImageFailCallback) | null;
    complete: (CompressImageCompleteCallback) | null;
}
export declare class ChooseVideoSuccess extends UTSObject {
    tempFilePath: string;
    duration: number;
    size: number;
    height: number;
    width: number;
}
type ChooseVideoFail = IMediaError;
type ChooseVideoSuccessCallback = (callback: ChooseVideoSuccess) => void;
type ChooseVideoFailCallback = (callback: ChooseVideoFail) => void;
type ChooseVideoCompleteCallback = ChooseImageCompleteCallback;
type ChooseVideoPageOrientation = ChooseImagePageOrientation;
type ChooseVideoAlbumMode = ChooseImageAlbumMode;
export declare class ChooseVideoOptions extends UTSObject {
    pageOrientation: ChooseVideoPageOrientation | null;
    albumMode: ChooseVideoAlbumMode | null;
    sourceType: (string[]) | null;
    compressed: boolean | null;
    maxDuration: number | null;
    camera: 'front' | 'back' | null;
    extension: (string[]) | null;
    success: (ChooseVideoSuccessCallback) | null;
    fail: (ChooseVideoFailCallback) | null;
    complete: (ChooseVideoCompleteCallback) | null;
}
export type ChooseVideo = (options: ChooseVideoOptions) => void;
export declare class GetVideoInfoSuccess extends UTSObject {
    orientation: MediaOrientation | null;
    type: string | null;
    duration: number;
    size: number;
    height: number;
    width: number;
    fps: number | null;
    bitrate: number | null;
}
type GetVideoInfoFail = IMediaError;
type GetVideoInfoSuccessCallback = (callback: GetVideoInfoSuccess) => void;
type GetVideoInfoFailCallback = (callback: GetVideoInfoFail) => void;
type GetVideoInfoCompleteCallback = ChooseImageCompleteCallback;
export declare class GetVideoInfoOptions extends UTSObject {
    src: string.VideoURIString;
    success: (GetVideoInfoSuccessCallback) | null;
    fail: (GetVideoInfoFailCallback) | null;
    complete: (GetVideoInfoCompleteCallback) | null;
}
export type GetVideoInfo = (options: GetVideoInfoOptions) => void;
export declare class SaveVideoToPhotosAlbumSuccess extends UTSObject {
}
type SaveVideoToPhotosAlbumFail = IMediaError;
type SaveVideoToPhotosAlbumSuccessCallback = (callback: SaveVideoToPhotosAlbumSuccess) => void;
type SaveVideoToPhotosAlbumFailCallback = (callback: SaveVideoToPhotosAlbumFail) => void;
type SaveVideoToPhotosAlbumCompleteCallback = ChooseImageCompleteCallback;
export declare class SaveVideoToPhotosAlbumOptions extends UTSObject {
    filePath: string.VideoURIString;
    success: (SaveVideoToPhotosAlbumSuccessCallback) | null;
    fail: (SaveVideoToPhotosAlbumFailCallback) | null;
    complete: (SaveVideoToPhotosAlbumCompleteCallback) | null;
}
export type SaveVideoToPhotosAlbum = (options: SaveVideoToPhotosAlbumOptions) => void;
export declare class CompressVideoSuccess extends UTSObject {
    tempFilePath: string;
    size: number;
}
type CompressVideoFail = IMediaError;
type CompressVideoSuccessCallback = (callback: CompressVideoSuccess) => void;
type CompressVideoFailCallback = (callback: CompressVideoFail) => void;
type CompressVideoCompleteCallback = ChooseImageCompleteCallback;
export declare class CompressVideoOptions extends UTSObject {
    src: string.VideoURIString;
    quality: string | null;
    bitrate: number | null;
    fps: number | null;
    resolution: number | null;
    success: (CompressVideoSuccessCallback) | null;
    fail: (CompressVideoFailCallback) | null;
    complete: (CompressVideoCompleteCallback) | null;
}
export type CompressVideo = (options: CompressVideoOptions) => void;
export type ChooseFile = (options: ChooseFileOptions) => void;
export declare class ChooseFileSuccess extends UTSObject {
    tempFilePaths: string[];
    tempFiles: Object;
}
type ChooseFileSuccessCallback = (result: ChooseFileSuccess) => void;
type ChooseFileFail = IMediaError;
type ChooseFileFailCallback = (result: ChooseFileFail) => void;
type ChooseFileComplete = Object;
type ChooseFileCompleteCallback = (result: ChooseFileComplete) => void;
export declare class ChooseFileOptions extends UTSObject {
    count: number | null;
    type: 'image' | 'video' | 'all' | null;
    extension: (string[]) | null;
    sizeType: Object | null;
    sourceType: (string[]) | null;
    success: ChooseFileSuccessCallback | null;
    fail: ChooseFileFailCallback | null;
    complete: ChooseFileCompleteCallback | null;
}
type ChooseMediaFileType = 'image' | 'video';
declare class ChooseMediaTempFile extends UTSObject {
    tempFilePath: string;
    fileType: ChooseMediaFileType;
    size: number;
    duration: number | null;
    height: number | null;
    width: number | null;
    thumbTempFilePath: string | null;
}
export declare class ChooseMediaSuccess extends UTSObject {
    tempFiles: ChooseMediaTempFile[];
    type: 'image' | 'video' | 'mix';
}
type ChooseMediaFail = IMediaError;
type ChooseMediaSuccessCallback = (callback: ChooseMediaSuccess) => void;
type ChooseMediaFailCallback = (callback: ChooseMediaFail) => void;
type ChooseMediaCompleteCallback = ChooseImageCompleteCallback;
export declare class ChooseMediaOptions extends UTSObject {
    count: number | null;
    mediaType: (string[]) | null;
    sourceType: (string[]) | null;
    sizeType: (string[]) | null;
    maxDuration: number | null;
    camera: 'front' | 'back' | null;
    success: (ChooseMediaSuccessCallback) | null;
    fail: (ChooseMediaFailCallback) | null;
    complete: (ChooseMediaCompleteCallback) | null;
}
export type ChooseMedia = (options: ChooseMediaOptions) => void;
export type Request<T = Object> = (param: RequestOptions<T>) => RequestTask;
export declare class RequestOptions<T = Object> extends UTSObject {
    url: string;
    data: Object | null;
    header: UTSJSONObject | null;
    method: RequestMethod | null;
    timeout: number | null;
    dataType: string | null;
    responseType: string | null;
    sslVerify: boolean | null;
    withCredentials: boolean | null;
    firstIpv4: boolean | null;
    success: RequestSuccessCallback<T> | null;
    fail: RequestFailCallback | null;
    complete: RequestCompleteCallback | null;
}
export declare class RequestSuccess<T = Object> extends UTSObject {
    data: T | null;
    statusCode: number;
    header: Object;
    cookies: Array<string>;
}
type RequestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD" | "OPTIONS";
type RequestErrorCode = 5 | 1000 | 100001 | 100002 | 600003 | 600008 | 600009 | 602001;
interface RequestFail extends IUniError {
    errCode: RequestErrorCode;
}
type RequestSuccessCallback<T> = (option: RequestSuccess<T>) => void;
type RequestFailCallback = (option: RequestFail) => void;
type RequestCompleteCallback = (option: Object) => void;
export interface RequestTask {
    abort(): void;
}
export type UploadFile = (options: UploadFileOptions) => UploadTask;
declare class UploadFileOptionFiles extends UTSObject {
    name: string | null;
    uri: string;
    file: Object | null;
}
export declare class UploadFileSuccess extends UTSObject {
    data: string;
    statusCode: number;
}
type UploadFileSuccessCallback = (result: UploadFileSuccess) => void;
interface UploadFileFail extends IUniError {
    errCode: RequestErrorCode;
}
type UploadFileFailCallback = (result: UploadFileFail) => void;
type UploadFileCompleteCallback = (result: Object) => void;
export declare class UploadFileOptions extends UTSObject {
    url: string;
    filePath: string | null;
    name: string | null;
    files: (UploadFileOptionFiles[]) | null;
    header: UTSJSONObject | null;
    formData: UTSJSONObject | null;
    timeout: number | null;
    success: UploadFileSuccessCallback | null;
    fail: UploadFileFailCallback | null;
    complete: UploadFileCompleteCallback | null;
}
export declare class OnProgressUpdateResult extends UTSObject {
    progress: number;
    totalBytesSent: number;
    totalBytesExpectedToSend: number;
}
type UploadFileProgressUpdateCallback = (result: OnProgressUpdateResult) => void;
export interface UploadTask {
    abort(): void;
    onProgressUpdate(callback: UploadFileProgressUpdateCallback): void;
}
export type DownloadFile = (options: DownloadFileOptions) => DownloadTask;
export declare class DownloadFileSuccess extends UTSObject {
    tempFilePath: string;
    statusCode: number;
}
type DownloadFileSuccessCallback = (result: DownloadFileSuccess) => void;
interface DownloadFileFail extends IUniError {
    errCode: RequestErrorCode;
}
type DownloadFileFailCallback = (result: DownloadFileFail) => void;
type DownloadFileComplete = Object;
type DownloadFileCompleteCallback = (result: DownloadFileComplete) => void;
export declare class DownloadFileOptions extends UTSObject {
    url: string;
    header: UTSJSONObject | null;
    filePath: string | null;
    timeout: number | null;
    success: DownloadFileSuccessCallback | null;
    fail: DownloadFileFailCallback | null;
    complete: DownloadFileCompleteCallback | null;
}
export declare class OnProgressDownloadResult extends UTSObject {
    progress: number;
    totalBytesWritten: number;
    totalBytesExpectedToWrite: number;
}
type DownloadFileProgressUpdateCallback = (result: OnProgressDownloadResult) => void;
export interface DownloadTask {
    abort(): void;
    onProgressUpdate(callback: DownloadFileProgressUpdateCallback): void;
}
export type ConfigMTLS = (options: ConfigMTLSOptions) => void;
declare class Certificate extends UTSObject {
    host: string;
    client: string | null;
    clientPassword: string | null;
    keyPath: string | null;
    server: (string[]) | null;
}
export declare class ConfigMTLSSuccess extends UTSObject {
    code: number;
}
type ConfigMTLSSuccessCallback = (result: ConfigMTLSSuccess) => void;
declare class ConfigMTLSFail extends UTSObject {
    code: number;
}
type ConfigMTLSFailCallback = (result: ConfigMTLSFail) => void;
type ConfigMTLSComplete = Object;
type ConfigMTLSCompleteCallback = (result: ConfigMTLSComplete) => void;
export declare class ConfigMTLSOptions extends UTSObject {
    certificates: Certificate[];
    success: ConfigMTLSSuccessCallback | null;
    fail: ConfigMTLSFailCallback | null;
    complete: ConfigMTLSCompleteCallback | null;
}
export interface UniOAuthProvider extends UniProvider {
    login(options: LoginOptions): void;
    getUserInfo(options: GetUserInfoOptions): void;
}
export type Login = (options: LoginOptions) => void;
declare class AppleLoginAppleInfo extends UTSObject {
    authorizationCode: string | null;
    fullName: Object | null;
    identityToken: string | null;
    realUserStatus: number | null;
    user: string | null;
}
export declare class LoginSuccess extends UTSObject {
    errMsg: string;
    authResult: Object;
    code: string;
    anonymousCode: string | null;
    authCode: string | null;
    authErrorScope: Object | null;
    authSucessScope: (string[]) | null;
    appleInfo: AppleLoginAppleInfo | null;
}
type LoginSuccessCallback = (result: LoginSuccess) => void;
export type LoginFail = IUniError;
type LoginFailCallback = (result: LoginFail) => void;
type LoginComplete = Object;
type LoginCompleteCallback = (result: LoginComplete) => void;
export declare class LoginOptions extends UTSObject {
    provider: 'weixin' | 'qq' | 'sinaweibo' | 'xiaomi' | 'apple' | 'univerify' | 'huawei' | null;
    scopes: Object | null;
    timeout: number | null;
    univerifyStyle: UniverifyStyle | null;
    onlyAuthorize: boolean | null;
    success: LoginSuccessCallback | null;
    fail: LoginFailCallback | null;
    complete: LoginCompleteCallback | null;
}
declare class UniverifyIconStyles extends UTSObject {
    path: string;
    width: string | null;
    height: string | null;
}
declare class UniverifyPhoneNumStyles extends UTSObject {
    color: string | null;
    fontSize: string | null;
}
declare class UniverifySloganStyles extends UTSObject {
    color: string | null;
    fontSize: string | null;
}
declare class UniverifyAuthButtonStyles extends UTSObject {
    normalColor: string | null;
    highlightColor: string | null;
    disabledColor: string | null;
    width: string | null;
    height: string | null;
    textColor: string | null;
    title: string | null;
    borderRadius: string | null;
}
declare class UniverifyOtherButtonStyles extends UTSObject {
    visible: boolean | null;
    normalColor: string | null;
    highlightColor: string | null;
    width: string | null;
    height: string | null;
    textColor: string | null;
    title: string | null;
    borderWidth: string | null;
    borderColor: string | null;
    borderRadius: string | null;
}
declare class UniverifyPrivacyItemStyles extends UTSObject {
    url: string;
    title: string;
}
declare class UniverifyPrivacyTermsStyles extends UTSObject {
    defaultCheckBoxState: boolean | null;
    textColor: string | null;
    termsColor: string | null;
    prefix: string | null;
    suffix: string | null;
    fontSize: string | null;
    privacyItems: (UniverifyPrivacyItemStyles[]) | null;
}
declare class UniVerifyButtonListItem extends UTSObject {
    provider: string;
    iconPath: string;
}
declare class UniVerifyButtonsStyles extends UTSObject {
    iconWidth: string | null;
    list: UniVerifyButtonListItem[];
}
declare class UniverifyStyle extends UTSObject {
    fullScreen: boolean | null;
    backgroundColor: string | null;
    backgroundImage: string | null;
    icon: UniverifyIconStyles | null;
    phoneNum: UniverifyPhoneNumStyles | null;
    slogan: UniverifySloganStyles | null;
    authButton: UniverifyAuthButtonStyles | null;
    otherLoginButton: UniverifyOtherButtonStyles | null;
    privacyTerms: UniverifyPrivacyTermsStyles | null;
    buttons: UniVerifyButtonsStyles | null;
}
export type GetUserInfo = (options: GetUserInfoOptions) => void;
export declare class UserInfo extends UTSObject {
    nickName: string;
    openId: string | null;
    avatarUrl: string;
}
export declare class GetUserInfoSuccess extends UTSObject {
    userInfo: UserInfo;
    rawData: string | null;
    signature: string | null;
    encryptedData: string | null;
    iv: string | null;
    errMsg: string;
}
type GetUserInfoSuccessCallback = (result: GetUserInfoSuccess) => void;
export type GetUserInfoFail = IUniError;
type GetUserInfoFailCallback = (result: GetUserInfoFail) => void;
type GetUserInfoComplete = Object;
type GetUserInfoCompleteCallback = (result: GetUserInfoComplete) => void;
export declare class GetUserInfoOptions extends UTSObject {
    provider: 'weixin' | 'qq' | 'sinaweibo' | 'xiaomi' | 'apple' | 'huawei' | null;
    withCredentials: boolean | null;
    lang: string | null;
    timeout: number | null;
    success: GetUserInfoSuccessCallback | null;
    fail: GetUserInfoFailCallback | null;
    complete: GetUserInfoCompleteCallback | null;
}
export type OpenAppAuthorizeSetting = (options: OpenAppAuthorizeSettingOptions) => void;
export declare class OpenAppAuthorizeSettingSuccess extends UTSObject {
    errMsg: string;
}
type OpenAppAuthorizeSettingSuccessCallback = (result: OpenAppAuthorizeSettingSuccess) => void;
declare class OpenAppAuthorizeSettingFail extends UTSObject {
    errMsg: string;
}
type OpenAppAuthorizeSettingFailCallback = (result: OpenAppAuthorizeSettingFail) => void;
declare class OpenAppAuthorizeSettingComplete extends UTSObject {
    errMsg: string;
}
type OpenAppAuthorizeSettingCompleteCallback = (result: OpenAppAuthorizeSettingComplete) => void;
export declare class OpenAppAuthorizeSettingOptions extends UTSObject {
    success: OpenAppAuthorizeSettingSuccessCallback | null;
    fail: OpenAppAuthorizeSettingFailCallback | null;
    complete: OpenAppAuthorizeSettingCompleteCallback | null;
}
export declare class OpenDocumentSuccess extends UTSObject {
}
export declare class OpenDocumentFail extends UTSObject {
}
type OpenDocumentSuccessCallback = (res: OpenDocumentSuccess) => void;
type OpenDocumentFailCallback = (res: OpenDocumentFail) => void;
type OpenDocumentCompleteCallback = (res: Object) => void;
type OpenDocumentSupportedTypes = 'doc' | 'xls' | 'ppt' | 'pdf' | 'docx' | 'xlsx' | 'pptx';
export declare class OpenDocumentOptions extends UTSObject {
    filePath: string;
    fileType: OpenDocumentSupportedTypes | null;
    success: OpenDocumentSuccessCallback | null;
    fail: OpenDocumentFailCallback | null;
    complete: OpenDocumentCompleteCallback | null;
}
type OpenDocument = (options?: OpenDocumentOptions | null) => void;
export interface UniPaymentProvider extends UniProvider {
    requestPayment(options: RequestPaymentOptions): void;
}
type RequestPaymentErrorCode = 700600 | 701100 | 701110 | 700601 | 700602 | 700603 | 700000 | 700604 | 700605 | 700607 | 700608 | 700800 | 700801;
export type RequestPayment = (options: RequestPaymentOptions) => void;
export declare class RequestPaymentSuccess extends UTSObject {
    data: object | null;
}
type RequestPaymentSuccessCallback = (result: RequestPaymentSuccess) => void;
export type RequestPaymentFail = IRequestPaymentFail;
type RequestPaymentFailCallback = (result: RequestPaymentFail) => void;
type RequestPaymentComplete = Object;
interface IRequestPaymentFail extends IUniError {
    errCode: RequestPaymentErrorCode;
}
type RequestPaymentCompleteCallback = (result: RequestPaymentComplete) => void;
export declare class RequestPaymentOptions extends UTSObject {
    provider: string;
    orderInfo: string;
    success: RequestPaymentSuccessCallback | null;
    fail: RequestPaymentFailCallback | null;
    complete: RequestPaymentCompleteCallback | null;
}
type PromptErrorCode = 1 | 1001;
interface IPromptError extends IUniError {
    errCode: PromptErrorCode;
}
declare class ShowToastSuccess extends UTSObject {
}
type ShowToastFail = IPromptError;
type ShowToastSuccessCallback = (res: ShowToastSuccess) => void;
type ShowToastFailCallback = (res: ShowToastFail) => void;
type ShowToastCompleteCallback = (res: Object) => void;
type Icon = "success" | "error" | "fail" | "exception" | "loading" | "none";
type ShowToastPosition = "top" | "center" | "bottom";
declare class ShowToastOptions extends UTSObject {
    title: string;
    icon: Icon | null;
    image: string.ImageURIString | null;
    mask: boolean | null;
    duration: number | null;
    position: ShowToastPosition | null;
    success: ShowToastSuccessCallback | null;
    fail: ShowToastFailCallback | null;
    complete: ShowToastCompleteCallback | null;
}
type ShowToast = (options: ShowToastOptions) => void;
type HideToast = () => void;
declare class ShowLoadingSuccess extends UTSObject {
}
type ShowLoadingFail = IPromptError;
type ShowLoadingSuccessCallback = (res: ShowLoadingSuccess) => void;
type ShowLoadingFailCallback = (res: ShowLoadingFail) => void;
type ShowLoadingCompleteCallback = (res: Object) => void;
declare class ShowLoadingOptions extends UTSObject {
    title: string;
    mask: boolean | null;
    success: ShowLoadingSuccessCallback | null;
    fail: ShowLoadingFailCallback | null;
    complete: ShowLoadingCompleteCallback | null;
}
type ShowLoading = (options: ShowLoadingOptions) => void;
type HideLoading = () => void;
declare class ShowModalSuccess extends UTSObject {
    confirm: boolean;
    cancel: boolean;
    content: string | null;
}
type ShowModalFail = IPromptError;
type ShowModalSuccessCallback = (res: ShowModalSuccess) => void;
type ShowModalFailCallback = (res: ShowModalFail) => void;
type ShowModalCompleteCallback = (res: Object) => void;
declare class ShowModalOptions extends UTSObject {
    title: string | null;
    content: string | null;
    showCancel: boolean | null;
    cancelText: string | null;
    cancelColor: string.ColorString | null;
    confirmText: string | null;
    confirmColor: string.ColorString | null;
    editable: boolean | null;
    placeholderText: string | null;
    success: ShowModalSuccessCallback | null;
    fail: ShowModalFailCallback | null;
    complete: ShowModalCompleteCallback | null;
}
type ShowModal = (options: ShowModalOptions) => void;
declare class ShowActionSheetSuccess extends UTSObject {
    tapIndex: number | null;
}
declare class Popover extends UTSObject {
    top: number;
    left: number;
    width: number;
    height: number;
}
type ShowActionSheetFail = IPromptError;
type ShowActionSheetSuccessCallback = (res: ShowActionSheetSuccess) => void;
type ShowActionSheetFailCallback = (res: ShowActionSheetFail) => void;
type ShowActionSheetCompleteCallback = (res: Object) => void;
declare class ShowActionSheetOptions extends UTSObject {
    title: string | null;
    alertText: string | null;
    itemList: string[];
    itemColor: string.ColorString | null;
    popover: Popover | null;
    success: ShowActionSheetSuccessCallback | null;
    fail: ShowActionSheetFailCallback | null;
    complete: ShowActionSheetCompleteCallback | null;
}
type ShowActionSheet = (options: ShowActionSheetOptions) => void;
type PullDownRefreshErrorCode = 4;
interface StartPullDownRefreshFail extends IUniError {
    errCode: PullDownRefreshErrorCode;
}
export declare class StartPullDownRefreshOptions extends UTSObject {
    success: StartPullDownRefreshSuccessCallback | null;
    fail: StartPullDownRefreshFailCallback | null;
    complete: StartPullDownRefreshCompleteCallback | null;
}
export type StartPullDownRefreshSuccess = AsyncApiSuccessResult;
type StartPullDownRefreshSuccessCallback = (result: StartPullDownRefreshSuccess) => void;
type StartPullDownRefreshFailCallback = (result: StartPullDownRefreshFail) => void;
type StartPullDownRefreshComplete = AsyncApiResult;
type StartPullDownRefreshCompleteCallback = (result: StartPullDownRefreshComplete) => void;
type StartPullDownRefresh = (options: StartPullDownRefreshOptions) => void;
type StopPullDownRefresh = () => void;
export type Rpx2px = (number: number) => number;
export declare class ScanCodeSuccess extends UTSObject {
    result: string;
    scanType: string;
}
export declare class ScanCodeFail extends UTSObject {
}
type ScanCodeSuccessCallback = (res: ScanCodeSuccess) => void;
type ScanCodeFailCallback = (res: ScanCodeFail) => void;
type ScanCodeCompleteCallback = (res: Object) => void;
type ScanCodeSupportedTypes = 'barCode' | 'qrCode' | 'datamatrix' | 'pdf417';
export declare class ScanCodeOptions extends UTSObject {
    onlyFromCamera: boolean | null;
    scanType: ScanCodeSupportedTypes[] | null;
    success: ScanCodeSuccessCallback | null;
    fail: ScanCodeFailCallback | null;
    complete: ScanCodeCompleteCallback | null;
}
type ScanCode = (options?: ScanCodeOptions | null) => void;
export declare class ShareWithSystemSuccess extends UTSObject {
}
export type ShareWithSystemFail = IShareWithSystemFail;
interface IShareWithSystemFail extends IUniError {
    errCode: ShareWithSystemErrorCode;
}
type ShareWithSystemErrorCode = 1310600 | 1310601 | 1310602 | 1310603 | 1310604 | 1310605 | 1310606 | 1310607;
type ShareWithSystemSuccessCallback = (res: ShareWithSystemSuccess) => void;
type ShareWithSystemFailCallback = (res: ShareWithSystemFail) => void;
type ShareWithSystemCallback = (res: Object) => void;
export declare class ShareWithSystemOptions extends UTSObject {
    type: 'text' | 'image' | 'video' | 'audio' | 'file' | null;
    summary: string | null;
    href: string | null;
    imageUrl: string | null;
    imagePaths: Array<string> | null;
    videoPaths: Array<string> | null;
    audioPaths: Array<string> | null;
    filePaths: Array<string> | null;
    success: ShareWithSystemSuccessCallback | null;
    fail: ShareWithSystemFailCallback | null;
    complete: ShareWithSystemCallback | null;
}
export type ShareWithSystem = (options: ShareWithSystemOptions) => void;
export declare class SetStorageSuccess extends UTSObject {
}
type SetStorageSuccessCallback = (res: SetStorageSuccess) => void;
type SetStorageFailCallback = (res: UniError) => void;
type SetStorageCompleteCallback = (res: Object) => void;
export declare class SetStorageOptions extends UTSObject {
    key: string;
    data: Object;
    success: SetStorageSuccessCallback | null;
    fail: SetStorageFailCallback | null;
    complete: SetStorageCompleteCallback | null;
}
export type SetStorage = (options: SetStorageOptions) => void;
export type SetStorageSync = (key: string, data: Object) => void;
export declare class GetStorageSuccess extends UTSObject {
    data: Object | null;
}
type GetStorageSuccessCallback = (res: GetStorageSuccess) => void;
type GetStorageFailCallback = (res: UniError) => void;
type GetStorageCompleteCallback = (res: Object) => void;
export declare class GetStorageOptions extends UTSObject {
    key: string;
    success: GetStorageSuccessCallback | null;
    fail: GetStorageFailCallback | null;
    complete: GetStorageCompleteCallback | null;
}
export type GetStorage = (options: GetStorageOptions) => void;
export type GetStorageSync = (key: string) => Object | null;
export declare class GetStorageInfoSuccess extends UTSObject {
    keys: Array<string>;
    currentSize: number;
    limitSize: number;
}
type GetStorageInfoSuccessCallback = (res: GetStorageInfoSuccess) => void;
type GetStorageInfoFailCallback = (res: UniError) => void;
type GetStorageInfoCompleteCallback = (res: Object) => void;
export declare class GetStorageInfoOptions extends UTSObject {
    success: GetStorageInfoSuccessCallback | null;
    fail: GetStorageInfoFailCallback | null;
    complete: GetStorageInfoCompleteCallback | null;
}
export type GetStorageInfo = (options: GetStorageInfoOptions) => void;
export type GetStorageInfoSync = () => GetStorageInfoSuccess;
export declare class RemoveStorageSuccess extends UTSObject {
}
type RemoveStorageSuccessCallback = (res: RemoveStorageSuccess) => void;
type RemoveStorageFailCallback = (res: UniError) => void;
type RemoveStorageCompleteCallback = (res: Object) => void;
export declare class RemoveStorageOptions extends UTSObject {
    key: string;
    success: RemoveStorageSuccessCallback | null;
    fail: RemoveStorageFailCallback | null;
    complete: RemoveStorageCompleteCallback | null;
}
export type RemoveStorage = (options: RemoveStorageOptions) => void;
export type RemoveStorageSync = (key: string) => void;
export declare class ClearStorageSuccess extends UTSObject {
}
type ClearStorageSuccessCallback = (res: ClearStorageSuccess) => void;
type ClearStorageFailCallback = (res: UniError) => void;
type ClearStorageCompleteCallback = (res: Object) => void;
export declare class ClearStorageOptions extends UTSObject {
    success: ClearStorageSuccessCallback | null;
    fail: ClearStorageFailCallback | null;
    complete: ClearStorageCompleteCallback | null;
}
export type ClearStorage = (option?: ClearStorageOptions | null) => void;
export type ClearStorageSync = () => void;
export type ConnectSocket = (options: ConnectSocketOptions) => SocketTask;
export declare class ConnectSocketSuccess extends UTSObject {
    errMsg: string;
}
type ConnectSocketSuccessCallback = (result: ConnectSocketSuccess) => void;
type ConnectSocketErrorCode = 600009;
interface ConnectSocketFail extends IUniError {
    errCode: ConnectSocketErrorCode;
}
type ConnectSocketFailCallback = (result: ConnectSocketFail) => void;
type ConnectSocketComplete = Object;
type ConnectSocketCompleteCallback = (result: ConnectSocketComplete) => void;
export declare class ConnectSocketOptions extends UTSObject {
    url: string;
    header: UTSJSONObject | null;
    protocols: (string[]) | null;
    success: ConnectSocketSuccessCallback | null;
    fail: ConnectSocketFailCallback | null;
    complete: ConnectSocketCompleteCallback | null;
}
declare class GeneralCallbackResult extends UTSObject {
    errMsg: string;
}
type SendSocketMessageErrorCode = 10001 | 10002 | 602001;
interface SendSocketMessageFail extends IUniError {
    errCode: SendSocketMessageErrorCode;
}
export declare class SendSocketMessageOptions extends UTSObject {
    data: Object;
    success: ((result: GeneralCallbackResult) => void) | null;
    fail: ((result: SendSocketMessageFail) => void) | null;
    complete: ((result: Object) => void) | null;
}
export declare class CloseSocketOptions extends UTSObject {
    code: number | null;
    reason: string | null;
    success: ((result: GeneralCallbackResult) => void) | null;
    fail: ((result: GeneralCallbackResult) => void) | null;
    complete: ((result: GeneralCallbackResult) => void) | null;
}
declare class OnSocketOpenCallbackResult extends UTSObject {
    header: Object;
}
export declare class OnSocketMessageCallbackResult extends UTSObject {
    data: Object;
}
export interface SocketTask {
    send(options: SendSocketMessageOptions): void;
    close(options: CloseSocketOptions): void;
    onOpen(callback: (result: OnSocketOpenCallbackResult) => void): void;
    onClose(callback: (result: Object) => void): void;
    onError(callback: (result: GeneralCallbackResult) => void): void;
    onMessage(callback: (result: OnSocketMessageCallbackResult) => void): void;
}
type OnSocketOpenCallback = (result: OnSocketOpenCallbackResult) => void;
type OnSocketOpen = (options: OnSocketOpenCallback) => void;
export declare class OnSocketErrorCallbackResult extends UTSObject {
    errMsg: string;
}
type OnSocketErrorCallback = (result: OnSocketErrorCallbackResult) => void;
type OnSocketError = (callback: OnSocketErrorCallback) => void;
type SendSocketMessage = (options: SendSocketMessageOptions) => void;
type OnSocketMessageCallback = (result: OnSocketMessageCallbackResult) => void;
type OnSocketMessage = (callback: OnSocketMessageCallback) => void;
type CloseSocket = (options: CloseSocketOptions) => void;
declare class OnSocketCloseCallbackResult extends UTSObject {
    code: number;
    reason: string;
}
type OnSocketCloseCallback = (result: OnSocketCloseCallbackResult) => void;
type OnSocketClose = (callback: OnSocketCloseCallback) => void;
interface UniExtApi {
    addPhoneContact: AddPhoneContact;
    startSoterAuthentication: StartSoterAuthentication;
    checkIsSupportSoterAuthentication: CheckIsSupportSoterAuthentication;
    checkIsSoterEnrolledInDevice: CheckIsSoterEnrolledInDevice;
    getClipboardData: GetClipboardData;
    setClipboardData: SetClipboardData;
    createInnerAudioContext: CreateInnerAudioContext;
    $on: $On;
    $once: $Once;
    $off: $Off;
    $emit: $Emit;
    exit: Exit;
    saveFile: SaveFile;
    getSavedFileList: GetSavedFileList;
    getSavedFileInfo: GetSavedFileInfo;
    removeSavedFile: RemoveSavedFile;
    getFileInfo: GetFileInfo;
    getFileSystemManager: GetFileSystemManager;
    getAppAuthorizeSetting: GetAppAuthorizeSetting;
    getAppBaseInfo: GetAppBaseInfo;
    getBackgroundAudioManager: GetBackgroundAudioManager;
    getDeviceInfo: GetDeviceInfo;
    getNetworkType: GetNetworkType;
    onNetworkStatusChange: OnNetworkStatusChange;
    offNetworkStatusChange: OffNetworkStatusChange;
    getProvider: GetProvider;
    getProviderSync: GetProviderSync;
    getRecorderManager: GetRecorderManager;
    getSystemInfo: GetSystemInfo;
    getSystemInfoSync: GetSystemInfoSync;
    getWindowInfo: GetWindowInfo;
    getSystemSetting: GetSystemSetting;
    hideKeyboard: HideKeyboard;
    makePhoneCall: MakePhoneCall;
    chooseImage: ChooseImage;
    previewImage: PreviewImage;
    closePreviewImage: ClosePreviewImage;
    getImageInfo: GetImageInfo;
    saveImageToPhotosAlbum: SaveImageToPhotosAlbum;
    compressImage: CompressImage;
    chooseVideo: ChooseVideo;
    saveVideoToPhotosAlbum: SaveVideoToPhotosAlbum;
    getVideoInfo: GetVideoInfo;
    compressVideo: CompressVideo;
    chooseFile: ChooseFile;
    chooseMedia: ChooseMedia;
    request: Request<Object>;
    uploadFile: UploadFile;
    downloadFile: DownloadFile;
    configMTLS: ConfigMTLS;
    login: Login;
    getUserInfo: GetUserInfo;
    openAppAuthorizeSetting: OpenAppAuthorizeSetting;
    openDocument: OpenDocument;
    requestPayment: RequestPayment;
    showToast: ShowToast;
    hideToast: HideToast;
    showLoading: ShowLoading;
    hideLoading: HideLoading;
    showModal: ShowModal;
    showActionSheet: ShowActionSheet;
    startPullDownRefresh: StartPullDownRefresh;
    stopPullDownRefresh: StopPullDownRefresh;
    rpx2px: Rpx2px;
    scanCode: ScanCode;
    shareWithSystem: ShareWithSystem;
    setStorage: SetStorage;
    setStorageSync: SetStorageSync;
    getStorage: GetStorage;
    getStorageSync: GetStorageSync;
    getStorageInfo: GetStorageInfo;
    getStorageInfoSync: GetStorageInfoSync;
    removeStorage: RemoveStorage;
    removeStorageSync: RemoveStorageSync;
    clearStorage: ClearStorage;
    clearStorageSync: ClearStorageSync;
    connectSocket: ConnectSocket;
    sendSocketMessage: SendSocketMessage;
    closeSocket: CloseSocket;
    onSocketOpen: OnSocketOpen;
    onSocketMessage: OnSocketMessage;
    onSocketClose: OnSocketClose;
    onSocketError: OnSocketError;
}
export declare function initUniExtApi(): UniExtApi;
export {};
