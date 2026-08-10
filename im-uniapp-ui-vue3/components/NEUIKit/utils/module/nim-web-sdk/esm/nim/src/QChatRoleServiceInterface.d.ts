import { AntispamTag } from './QChatServerServiceInterface';
/**
 * 调用方式:
 * ```js
 * qchat.qchatRole.createServerRole(options)
 * ```
 */
export interface QChatRoleServiceInterface {
    /**
     * 新增服务器身份组
     *
     * - 调用该方法需要拥有manageRole权限，且必须是相应服务器的成员。如果没有该权限，调用该方法将返回 403 错误码。
     * - 新创建的服务器自定义身份组的优先级，必须小于用户已有身份组的最高优先级。
     * - 新创建的自定义身份组的权限为用户所有已有身份组的权限之和。假设用户在创建之前，只属于 @everyone 身份组的成员，则新创建的自定义身份组的权限将继承 @everyone 身份组的权限
     */
    createServerRole(options: CreateServerRoleOptions): Promise<QChatServerRole>;
    /**
     * 移除服务器身份组
     *
     * @example
     * ```js
     * qchat.qchatRole.deleteServerRole({
     *    "serverId": "11111",
     *    "roleId": "22222
     * })
     * ```
     */
    deleteServerRole(options: DeleteServerRoleOptions): Promise<void>;
    /**
     * 修改服务器身份组的名称、图标、自定义扩展字段、权限列表配置和优先级（优先级的具体介绍请参见下文的批量更新服务器身份组优先级）。
     * 调用时，需在其入参结构 UpdateServerRoleOptions 传入服务器身份组的 ID 和身份组所属服务器的 ID。
     *
     * - 调用该方法需要管理角色权限（manageRole），且必须是相应服务器的成员。如没有该权限，调用将返回 403 错误码。
     * - 调用该方法修改身份组的优先级必须小于用户已有身份组的最高优先级。
     * - 用户无法配置自己没有的权限。例如用户没有权限A，则无法修改权限A 的配置。
     * - 创建服务器时默认创建的 @everyone 身份组仅支持修改其权限配置（且只有服务器创建者可修改），其他属性（身份组的名称、图标、自定义扩展和优先级）不支持修改。 如调用该方法修改 @everyone 身份组的名称、图标、自定义扩展和优先级， 将报错（错误码 403）。
     * - 用户无法将自己拥有的某个权限在全部所属身份组中都设置为deny，如果都设置为deny，那么将返回403错误码。例如，用户属于 10 个身份组且这 10 个身份组都开启了权限A，那么用户最多可以将其中 9 个身份组的权限A 设置为deny。
     *
     * @example
     * ```js
     * qchat.qchatRole.updateServerRole({
     *    "serverId": "11111",
     *    "roleId": "22222",
     *    auths: {
     *      "deleteMsgs": "allow"
     *    }
     * })
     * ```
     */
    updateServerRole(options: UpdateServerRoleOptions): Promise<QChatServerRole>;
    /**
     * 查询服务器下身份组列表
     *
     * @example
     * ```js
     * qchat.qchatRole.getServerRoles({
     *    "serverId": "11111",
     *    "limit": 10,
     * })
     * ```
     */
    getServerRoles(options: GetServerRolesOptions): Promise<GetServerRolesResult>;
    /**
     * 新增一个频道身份组，调用时必须通过serverRoleId指定新增的频道身份组继承自哪个服务器身份组。
     *
     * 默认情况下，频道直接使用服务器身份组来控制权限。调用此方法添加频道身份组，可以在频道内对服务器身份组的权限进行覆盖。
     *
     * - 调用该方法必须先拥有manageRole权限和manageChannel权限，且必须是该频道的成员。如果没有权限，调用该方法将返回 403 错误码。
     * - 频道身份组刚创建时所有权限配置都为继承（ignore），因此实际权限和被继承的服务器身份组一样，之后可以调用updateChannelRole方法手动修改，使频道身份组和服务器身份组拥有不一样的权限
     */
    addChannelRole(options: AddChannelRoleOptions): Promise<QChatChannelRole>;
    /**
     * 删除某频道下的某身份组
     *
     * - 调用该方法必须先拥有manageRole权限和manageChannel权限，且必须是该频道的成员。如果没有权限，调用该方法将返回 403 错误码。
     *
     * @example
     * ```js
     * qchat.qchatRole.removeChannelRole({
     *   "serverId": "10636686",
     *   "channelId": "15289461",
     *   "roleId": "16863122"
     * })
     * ```
     */
    removeChannelRole(options: RemoveChannelRoleOptions): Promise<void>;
    /**
     * 修改频道下某身份组的权限
     *
     * - 调用该方法必须先拥有manageRole权限和manageChannel权限，且必须是该频道的成员。如果没有权限，调用该方法将返回 403 错误码。
     * - 用户无法配置自己没有的权限。例如用户没有权限A，则无法修改权限A 的配置。
     * - 用户无法将自己拥有的某个权限在全部所属身份组中都设置为deny。例如用户属于 10 个身份组且这 10 个身份组都开启了权限A，那么用户最多可以将其中 9 个身份组的权限A 设置为deny。
     *
     * #### 影响范围
     * - 服务器内成员收到 type = {@link ESystemMessageType.channelIdentifyUpdate | channelIdentifyUpdate} 的圈组内置系统通知
     *
     * @example
     * ```js
     * qchat.qchatRole.updateChannelRole({
     *   "serverId": "10636686",
     *   "channelId": "15289461",
     *   "roleId": "16863122",
     *   "auths": {
     *     "mentionedRole": "allow"
     *   }
     * })
     * ```
     */
    updateChannelRole(options: UpdateChannelRoleOptions): Promise<QChatChannelRole>;
    /**
     * 查询某频道下的身份组信息列表
     *
     * @example
     * ```js
     * const roles = await qchat.qchatRole.getChannelRoles({
     *   "serverId": "10636686",
     *   "channelId": "15289461",
     * })
     * ```
     */
    getChannelRoles(options: GetChannelRolesOptions): Promise<QChatChannelRole[]>;
    /**
     * 为某个人定制某频道的权限
     *
     * - 调用该方法必须先拥有manageRole和manageChannel权限，且是该频道的成员。如果没有权限，调用该方法将返回 403 错误码
     * - 新创建的定制权限配置默认继承自频道身份组相应权限的配置
     */
    addMemberRole(options: AddMemberRoleOptions): Promise<QChatMemberRole>;
    /**
     * 删除频道下某人的定制权限
     *
     * - 调用该方法必须先拥有manageRole和manageChannel权限，且是该频道的成员。如果没有权限，调用该方法将返回 403 错误码
     * @example
     * ```js
     * qchat.qchatRole.removeMemberRole({
     *   "serverId": "132305",
     *   "channelId": "67291",
     *   "accid": "ctt1"
     * })
     * ```
     */
    removeMemberRole(options: RemoveMemberRoleOptions): Promise<void>;
    /**
     * 修改某人的定制权限
     *
     * - 调用该方法必须先拥有manageRole权限。如果没有该权限，调用该方法将返回 403 错误码。
     * - 用户无法配置自己没有的权限。例如用户没有权限A，则无法修改权限A 的配置。
     *
     * @example
     * ```js
     * let memberRole = await qchat.qchatRole.addMemberRole({
     *    "serverId": "{{YOUR_SERVER_ID}}",
     *    "channelId": "{{YOUR_CHANNEL_ID}}",
     *    "accid": "{{YOUR_ACCOUNT_ID}}"
     * })
     *
     * memberRole = await qchat.qchatRole.updateMemberRole({
     *    "serverId": memberRole.serverId,
     *    "channelId": memberRole.channelId,
     *    "accid": memberRole.accid,
     *    "auths": {
     *        "remindEveryone": "deny"
     *    }
     * })
     * ```
     */
    updateMemberRole(options: UpdateMemberRoleOptions): Promise<QChatMemberRole>;
    /**
     * 查询某频道下所有的个人身份权限
     *
     * @example
     * ```js
     * qchat.qchatRole.getMemberRoles({
     *   "serverId": "10636686",
     *   "channelId": "15289461"
     * })
     * ```
     */
    getMemberRoles(options: GetMemberRolesOptions): Promise<QChatMemberRole[]>;
    /**
     * 将用户批量添加至指定的服务器自定义身份组
     *
     * 服务器的 @everyone 身份组的成员，默认为服务器的全部成员。服务器自定义身份组的成员，需要用户手动添加。
     *
     * 添加后，继承自该服务器身份组的频道身份组成员也会作相应变化。频道身份组与服务器身份组在成员的具体关联为：公开频道的身份组成员等于被继承的服务器身份组成员去掉频道黑名单成员和频道黑名单身份组成员；私密频道的身份组成员是同时存在于频道白名单和被继承的服务器身份组的公共成员。
     *
     * - 调用该方法必须先拥有manageRole权限。如果没有该权限，调用该方法将返回 403 错误码。
     * - 待加入用户必须为身份组所属服务器成员，才能被成功加入该身份组。
     *
     * #### 影响范围
     * - 服务器内成员收到 type = {@link ESystemMessageType.serverIdentifyAdd | serverIdentifyAdd} 的圈组内置系统通知
     */
    addMembersToServerRole(options: AddMembersToServerRoleOptions): Promise<AddMembersToServerRoleResult>;
    /**
     * 将服务器自定义身份组的成员批量移除
     *
     * 移除服务器身份组成员后，继承自该服务器身份组的频道身份组成员也会作相应变化。频道身份组与服务器身份组在成员的具体关联为：公开频道的身份组成员等于被继承的服务器身份组成员去掉频道黑名单成员和频道黑名单身份组成员；私密频道的身份组成员是同时存在于频道白名单和被继承的服务器身份组的公共成员。
     *
     * - 调用该方法必须先拥有manageRole权限。如果没有该权限，调用该方法将返回 403 错误码。
     *
     * #### 影响范围
     * - 服务器内成员收到 type = {@link ESystemMessageType.serverIdentifyRemove | serverIdentifyRemove} 的圈组内置系统通知
     */
    removeMembersFromServerRole(options: RemoveMembersFromServerRoleOptions): Promise<RemoveMembersFromServerRoleResult>;
    /**
     * 查询某服务器下某身份组下的成员列表
     *
     * @example
     * ```js
     * const membersOfServerRole = qchat.qchatRole.getMembersFromServerRole({
     *    serverId: '11111',
     *    roleId: '22222',
     * })
     * ```
     */
    getMembersFromServerRole(options: GetMembersFromServerRoleOptions): Promise<QChatServerRoleMember[]>;
    /**
     * 通过accid查询该accid所属的服务器身份组
     *
     * 注：返回的结果，参数形式类似 QChatServerRole，只是没有 auths 字段
     *
     * @example
     * ```js
     * const serverRoles = await qchat.qchatRole.getServerRolesByAccid({
     *    serverId: '11111',
     *    accid: '22222',
     * })
     * ```
     */
    getServerRolesByAccid(options: GetServerRolesByAccidOptions): Promise<Omit<QChatServerRole, 'auths'>[]>;
    /**
     * 通过一批 accids(account ID) 查询 QChatServerRole 列表，结果不分页并且只拿第一页。
     */
    getExistingServerRolesByAccids(options: GetExistingServerRolesByAccidsOptions): Promise<GetExistingServerRolesByAccidsResult>;
    /**
     * 查询指定频道中，属于某个 服务器身份组 下的频道身份组
     *
     * @example
     * ```js
     * qchat.qchatRole.getExistingChannelRolesByServerRoleIds({
     *   "serverId": "10636686",
     *   "channelId": "15289461",
     *   // roleIds 为服务器身份组 ID
     *   "roleIds": [
     *     "17304893"
     *   ]
     * })
     * ```
     */
    getExistingChannelRolesByServerRoleIds(options: GetExistingChannelRolesByServerRoleIdsOptions): Promise<QChatChannelRole[]>;
    /**
     * 通过一批 accids(account ID) 查询是否有定制权限（QChatMemberRole）。
     *
     * 返回有定制权限的 accid（account id） 列表，查询结果不分页
     */
    getExistingAccidsOfMemberRoles(options: GetExistingAccidsOfMemberRolesOptions): Promise<string[]>;
    /**
     * 查询一批 accids 是否在某个服务器身份组（ServerRole）。
     *
     * 返回在此服务器身份组下的 accid（account id） 列表，查询结果不分页
     */
    getExistingAccidsInServerRole(options: GetExistingAccidsInServerRoleOptions): Promise<string[]>;
    /**
     * 批量更新 serverRole 的优先级
     */
    updateServerRolePriorities(options: UpdateServerRolePrioritiesOptions): Promise<QChatServerRole[]>;
    /**
     * 查询自己是否拥有某个权限
     *
     * @example
     * ```js
     * const hasPermission = await qchat.qchatRole.checkPermission({
     *   "serverId": "10636686",
     *   "channelId": "15289461",
     *   "auth": "deleteMsg"
     * })
     * ```
     */
    checkPermission(options: CheckPermissionOptions): Promise<boolean>;
    /**
     * 创建一个频道分组身份组。
     *
     *
     * 默认情况下，频道直接使用服务器身份组来控制权限。调用此方法添加频道身份组，可以在频道内对服务器身份组的权限进行覆盖。
     *
     * - 调用该方法必须先拥有 manageRole 权限。如果没有权限，调用该方法将返回 403 错误码。
     * - 频道身份组刚创建时所有权限配置都为继承（ignore），因此实际权限和被继承的服务器身份组一样，之后可以调用updateChannelCategoryRole方法手动修改，使其和服务器身份组拥有不一样的权限
     */
    addChannelCategoryRole(options: AddChannelCategoryRoleOptions): Promise<QChatChannelCategoryRole>;
    /**
     * 移除频道分组身份组权限
     *
     * - 调用该方法必须先拥有 manageRole 权限。如果没有权限，调用该方法将返回 403 错误码。
     *
     * @example
     * ```js
     * qchat.qchatRole.removeChannelCategoryRole({
     *   "serverId": "10636686",
     *   "categoryId": "5803432",
     *   "roleId": "17304893"
     * })
     * ```
     */
    removeChannelCategoryRole(options: RemoveChannelCategoryRoleOptions): Promise<void>;
    /**
     * 更新频道分组身份组信息
     *
     * - 调用该方法必须先拥有 manageRole 权限。如果没有权限，调用该方法将返回 403 错误码。
     * - 用户无法配置自己没有的权限。例如用户没有权限A，则无法修改权限A 的配置。
     *
     * #### 影响范围
     * - 服务器内成员收到 type = {@link ESystemMessageType.channelIdentifyUpdate | channelIdentifyUpdate} 的圈组内置系统通知
     */
    updateChannelCategoryRole(options: UpdateChannelCategoryRoleOptions): Promise<QChatChannelCategoryRole>;
    /**
     * 获取某个频道分组下，所有的身份组
     *
     * @example
     * ```js
     * qchat.qchatRole.getChannelCategoryRole({
     *  "serverId": "10636686",
     *  "categoryId": "5803432"
     * })
     * ```
     */
    getChannelCategoryRole(options: GetChannelCategoryRoleOptions): Promise<QChatChannelCategoryRole[]>;
    /**
     * 创建频道分组某人的定制权限，创建后还需调用 {@link QChatRoleServiceInterface.updateChannelCategoryMemberRole | updateChannelCategoryMemberRole} 才能授予某人权限
     *
     * - 调用该方法必须先拥有 manageRole 权限。如果没有权限，调用该方法将返回 403 错误码。
     */
    addChannelCategoryMemberRole(options: AddChannelCategoryMemberRoleOptions): Promise<QChatChannelCategoryMemberRole>;
    /**
     * 删除频道分组中某人的定制权限
     *
     * - 调用该方法必须先拥有 manageRole 权限。如果没有权限，调用该方法将返回 403 错误码。
     *
     * @example
     * ```js
     * qchat.qchatRole.removeChannelCategoryMemberRole({
     *   "serverId": "1111",
     *   "categoryId": "22222",
     *   "accid": "accountId"
     * })
     * ```
     */
    removeChannelCategoryMemberRole(options: RemoveChannelCategoryMemberRoleOptions): Promise<void>;
    /**
     * 更新指定成员在“频道分组”中的定制权限
     *
     * - 调用该方法必须先拥有 manageRole 权限。如果没有权限，调用该方法将返回 403 错误码。
     * - 用户无法配置自己没有的权限。例如用户没有权限A，则无法修改权限A 的配置。
     *
     * @example
     * ```js
     * qchat.qchatRole.updateChannelCategoryMemberRole({
     *   "serverId": "10390563",
     *   "categoryId": "5754729",
     *   "accid": "zk3",
     *   "auths": {
     *     "recallMsg": "deny"
     *   }
     * })
     * ```
     */
    updateChannelCategoryMemberRole(options: UpdateChannelCategoryMemberRoleOptions): Promise<QChatChannelCategoryMemberRole>;
    /**
     * 分页获取“频道分组”下的成员权限列表
     *
     * @example
     * ```js
     * qchat.qchatRole.getChannelCategoryMemberRole({
     *   "serverId": "10390563",
     *   "categoryId": "5754729"
     * })
     * ```
     */
    getChannelCategoryMemberRole(options: GetChannelCategoryMemberRoleOptions): Promise<QChatChannelCategoryMemberRole[]>;
    /**
     * 查询自己是否拥有某些权限
     *
     * @example
     * ```js
     * const permissions = await qchat.qchatRole.checkPermissions({
     *   "serverId": "10636686",
     *   "channelId": "15289461",
     *   "auths": ["deleteMsg", "recallMsg"]
     * })
     *
     * console.log(permissions)
     * // {recallMsg: 'allow', deleteMsg: 'deny'}
     * ```
     */
    checkPermissions(options: QChatCheckPermissionsOptions): Promise<QChatCheckPermissionsResult>;
}
export interface QChatCheckPermissionsOptions {
    /**
     * 服务器 ID
     */
    serverId: string;
    /**
     * 频道 ID 如果不填则表示查询服务器权限
     */
    channelId?: string;
    /**
     * 查询的权限列表
     */
    auths: QChatRoleAuthKey[];
}
export declare type QChatCheckPermissionsResult = QChatRoleAuth;
export interface GetChannelCategoryMemberRoleOptions {
    /**
     * 服务器 ID
     */
    serverId: string;
    /**
     * 频道分组 ID
     */
    categoryId: string;
    /**
     * 时间戳
     */
    timetag?: number;
    /**
     * 数量
     */
    limit?: number;
}
export interface UpdateChannelCategoryMemberRoleOptions {
    /**
     * 服务器 ID
     */
    serverId: string;
    /**
     * 频道分组 ID
     */
    categoryId: string;
    /**
     * 用户 id
     */
    accid: string;
    /**
     * 权限
     */
    auths: QChatRoleAuth;
}
export interface RemoveChannelCategoryMemberRoleOptions {
    /**
     * 服务器 ID
     */
    serverId: string;
    /**
     * 频道分组 ID
     */
    categoryId: string;
    /**
     * 用户 id
     */
    accid: string;
}
/**
 * 某成员在“频道分组”的定制权限
 */
export interface QChatChannelCategoryMemberRole {
    id: string;
    /**
     * 服务器成员的 account id
     */
    accid: string;
    /**
     * 频道分组 ID
     */
    categoryId: string;
    /**
     * 服务器 ID
     */
    serverId: string;
    /**
     * 有效标志：false-无效，true-有效
     */
    validFlag: boolean;
    /**
     * 创建时间
     */
    createTime: number;
    /**
     * 更新时间
     */
    updateTime: number;
    /**
     * 权限
     */
    auths: QChatRoleAuth;
    /**
     * 服务器成员的昵称
     */
    nick?: string;
    /**
     * 服务器成员的头像
     */
    avatar?: string;
    /**
     * 服务器成员自定义扩展
     */
    ext?: string;
    /**
     * 服务器成员类型
     */
    memberType: TMemberType;
    /**
     * 服务器成员加入时间
     */
    joinTime: number;
    /**
     * 服务器成员的邀请者的 account ID
     */
    inviter: string;
}
export interface AddChannelCategoryMemberRoleOptions {
    /**
     * 服务器 ID
     */
    serverId: string;
    /**
     * 频道分组 ID
     */
    categoryId: string;
    /**
     * account ID, 账号
     */
    accid: string;
}
export interface GetChannelCategoryRoleOptions {
    /**
     * 服务器 ID
     */
    serverId: string;
    /**
     * 频道分组 ID
     */
    categoryId: string;
    /**
     * 时间戳
     */
    timetag?: number;
    /**
     * 数量
     */
    limit?: number;
}
export interface UpdateChannelCategoryRoleOptions {
    /**
     * 服务器 ID
     */
    serverId: string;
    /**
     * 频道分组 ID
     */
    categoryId: string;
    /**
     * 身份组 ID
     */
    roleId: string;
    /**
     * 权限
     */
    auths: QChatRoleAuth;
}
export interface RemoveChannelCategoryRoleOptions {
    /**
     * 服务器 ID
     */
    serverId: string;
    /**
     * 频道分组 ID
     */
    categoryId: string;
    /**
     * 身份组 ID
     */
    roleId: string;
}
export interface AddChannelCategoryRoleOptions {
    /**
     * 服务器 ID
     */
    serverId: string;
    /**
     * 频道分组 ID
     */
    categoryId: string;
    /**
     * 服务器身份组 ID
     */
    parentRoleId: string;
}
export interface QChatChannelCategoryRole {
    /**
     * 身份组 ID
     */
    roleId: string;
    /**
     * 频道分组 ID
     */
    categoryId: string;
    /**
     * 服务器 ID
     */
    serverId: string;
    /**
     * 服务器身份组 ID
     */
    parentRoleId: string;
    /**
     * 身份组类型： everyone 标志所有人都适用的身份组, custom 表示针对个人可定制的身份组
     */
    type: TRoleType;
    /**
     * 有效标志：false-无效，true-有效
     */
    validFlag: boolean;
    /**
     * 创建时间
     */
    createTime: number;
    /**
     * 更新时间
     */
    updateTime: number;
    /**
     * 权限
     */
    auths: QChatRoleAuth;
    /**
     * 身份组名称
     */
    name: string;
    /**
     * 身份组图标
     */
    icon?: string;
    /**
     * 身份组自定义扩展
     */
    ext?: string;
}
export interface CheckPermissionOptions {
    /**
     * 服务器 ID
     */
    serverId: string;
    /**
     * 频道ID 不填则表示查询服务器权限
     */
    channelId?: string;
    /**
     * 查询的权限
     */
    auth: QChatRoleAuthKey;
}
export declare type QChatRoleAuthKey = keyof QChatRoleAuth;
export interface AddChannelRoleOptions {
    serverId: string;
    channelId: string;
    /**
     * 继承服务器的身份组id
     */
    parentRoleId: string;
}
export interface AddMemberRoleOptions {
    serverId: string;
    channelId: string;
    /**
     * account ID, 账号
     */
    accid: string;
}
export interface AddMembersToServerRoleOptions {
    serverId: string;
    /**
     * 身份组 id
     */
    roleId: string;
    /**
     * account ID, 账号列表
     */
    accids: string[];
}
export interface AddMembersToServerRoleResult {
    /**
     * 添加成功的数组
     */
    successAccids: string[];
    /**
     * 添加失败的数组
     */
    failedAccids: string[];
}
export declare enum ERoleType {
    everyone = 1,
    /**
     * 定制身份组
     */
    custom = 2
}
export declare type TRoleType = keyof typeof ERoleType;
export declare enum EMemberType {
    /**
     * 普通成员
     */
    normal = 0,
    /**
     * 所有者
     */
    owner = 1
}
export declare type TMemberType = keyof typeof EMemberType;
export interface CreateServerRoleOptions {
    serverId: string;
    /**
     * 角色名
     */
    name: string;
    /**
     * 角色类型
     */
    /**
     * 身份组优先级。创建身份组时，priority最小值为1。
     *
     * everyone 最低为 0。
     *
     * 数字越大优先级越高
     */
    priority: number;
    /**
     * 身份组图片url
     */
    icon?: string;
    /**
     * 扩展字段
     */
    ext?: string;
    /**
     * 反垃圾相关字段
     */
    antispamTag?: AntispamTag;
}
export interface DeleteServerRoleOptions {
    serverId: string;
    /**
     * 身份组 id
     */
    roleId: string;
}
export interface GetChannelRolesOptions {
    serverId: string;
    channelId: string;
    /**
     * 分页起始时间
     */
    timetag: number;
    /**
     * 分页页码
     */
    limit?: number;
}
export interface GetMemberRolesOptions {
    serverId: string;
    channelId: string;
    /**
     * 分页起始时间，即查询创建时间在这个时间之后的 member role
     */
    timetag: number;
    /**
     * 分页页码
     */
    limit: number;
}
export interface GetMembersFromServerRoleOptions {
    serverId: string;
    /**
     * 身份组 id
     */
    roleId: string;
    /**
     * 分页条件-起始时间
     */
    timetag?: number;
    /**
     * 分页条件-页码（一页显示多少条）
     */
    limit?: number;
    /**
     * 分页条件-的起始 account ID, 账号
     */
    accid?: string;
}
export interface GetServerRolesOptions {
    /**
     * 服务器 ID
     */
    serverId: string;
    /**
     * 以 channelId 的名义查询。
     *
     * 注：传入这个字段，可以允许拥有“频道”维度的 {@link QChatRoleAuth.manageRole | manageRole} 权限的人查询。否则角色需要有 {@link QChatRoleAuth.manageRole | manageRole} 权限才能允许查询
     */
    channelId?: string;
    /**
     * 以 categoryId 的名义查询。
     *
     * 注：传入这个字段，可以允许拥有“频道分组”维度的 {@link QChatRoleAuth.manageRole | manageRole} 权限的人查询。否则角色需要有 {@link QChatRoleAuth.manageRole | manageRole} 权限才能允许查询
     */
    categoryId?: string;
    /**
     * 分页页码
     */
    limit?: number;
    /**
     * 分页的起始优先级，起始页为 0
     */
    priority?: number;
}
export interface GetServerRolesResult {
    /**
     * 返回全部的 QChatServerRole
     */
    roles: QChatServerRole[];
    /**
     * 返回自己所在的身份组列表
     */
    isMemberRoles: string[];
}
export interface GetServerRolesByAccidOptions {
    serverId: string;
    /**
     * 查询账号
     */
    accid: string;
    /**
     * 分页条件-起始时间
     */
    timetag: number;
    /**
     * 分页条件-页码（一页显示多少条）
     */
    limit: number;
}
export interface GetExistingServerRolesByAccidsOptions {
    serverId: string;
    accids: string[];
}
export interface GetExistingServerRolesByAccidsResult {
    /**
     * accid (account ID) 作为 key 值，values 就是服务器身份组的列表（QChatServerRole[]）
     */
    [key: string]: QChatServerRole[];
}
export interface RemoveChannelRoleOptions {
    serverId: string;
    channelId: string;
    /**
     * 身份组 id
     */
    roleId: string;
}
export interface RemoveMemberRoleOptions {
    serverId: string;
    channelId: string;
    /**
     * account ID 账号
     */
    accid: string;
}
export interface RemoveMembersFromServerRoleOptions {
    serverId: string;
    /**
     * 身份组 id
     */
    roleId: string;
    /**
     * account ID 账号列表
     */
    accids: string[];
}
export interface RemoveMembersFromServerRoleResult {
    successAccids: string[];
    failedAccids: string[];
}
export interface UpdateChannelRoleOptions {
    serverId: string;
    channelId: string;
    /**
     * 身份组 id
     */
    roleId: string;
    /**
     * 权限列表
     */
    auths: Partial<QChatRoleAuth>;
}
export interface UpdateMemberRoleOptions {
    serverId: string;
    channelId: string;
    accid: string;
    /**
     * 权限列表
     */
    auths: Partial<QChatRoleAuth>;
}
export interface UpdateServerRoleOptions {
    serverId: string;
    roleId: string;
    name?: string;
    icon?: string;
    ext?: string;
    /**
     * 权限
     */
    auths?: QChatRoleAuth;
    /**
     * 优先级，越小的数字优先级越高
     */
    priority?: number;
    /**
     * 反垃圾相关字段
     */
    antispamTag?: AntispamTag;
}
export interface UpdateServerRolesOptions {
    serverId: string;
    value: {
        roleId: string;
        name?: string;
        icon?: string;
        ext?: string;
        /**
         * 优先级
         */
        priority?: number;
    }[];
}
export declare enum ERoleAuthType {
    /**
     * 忽略，继承自上层权限。
     *
     * 举个例子：个人定制化权限里忽略 A 权限，但频道里 A 权限 allow，就会继承频道里关于 A 的权限。
     *
     * 那么此人最终针对 A 权限就是 allow
     */
    ignore = 0,
    /**
     * 拒绝
     */
    deny = -1,
    /**
     * 允许。
     *
     * 若多个自定义的身份组针对同一个权限分别设置 `allow`，`deny`，`ignore`
     *
     * 那么 `allow` 的优先级最高，`deny` 次之
     */
    allow = 1
}
export declare type TRoleAuthType = keyof typeof ERoleAuthType;
export interface QChatRoleAuth {
    /**
     * 管理服务器：修改服务器。仅 server 的身份组有此权限可配置
     */
    manageServer?: TRoleAuthType;
    /**
     * 管理频道，server 和 channel 的身份组都有此权限配置
     *
     * 注意，channel 下定制的个人权限里，打开此权限，只能够编辑、删除此频道，无法新建。
     */
    manageChannel?: TRoleAuthType;
    /**
     * 管理角色的权限，server 和 channel 的身份组都有此权限配置
     */
    manageRole?: TRoleAuthType;
    /**
     * 发送消息，server 和 channel 的身份组都有此权限配置
     */
    sendMsg?: TRoleAuthType;
    /**
     * 修改自己在该server的服务器成员信息，仅 server 的身份组有此权限可配置
     */
    accountInfoSelf?: TRoleAuthType;
    /**
     * 邀请他人进入server的，仅 server 的身份组有此权限可配置
     */
    inviteServer?: TRoleAuthType;
    /**
     * 踢除他人的权限，仅 server 的身份组有此权限可配置
     */
    kickServer?: TRoleAuthType;
    /**
     * 修改他人在该server的服务器成员信息，仅 server 的身份组有此权限可配置
     */
    accountInfoOther?: TRoleAuthType;
    /**
     * 撤回他人消息的权限，server 和 channel 的身份组都有此权限配置
     */
    recallMsg?: TRoleAuthType;
    /**
     * 删除他人消息的权限，server 和 channel 的身份组都有此权限配置
     */
    deleteMsg?: TRoleAuthType;
    /**
     * @ 他人的权限，server 和 channel 的身份组都有此权限配置
     */
    remindOther?: TRoleAuthType;
    /**
     * @ everyone，server 和 channel 的身份组都有此权限配置
     */
    remindEveryone?: TRoleAuthType;
    /**
     * 管理黑白名单的权限，server和channel都有
     */
    manageBlackWhiteList?: TRoleAuthType;
    /**
     * 封禁他人的权限，仅server有，允许成员永久封禁其他成员访问此服务器
     */
    banServerMember?: TRoleAuthType;
    /**
     * RTC频道：连接的权限
     */
    RTCChannelConnect?: TRoleAuthType;
    /**
     * RTC频道：断开他人连接的权限
     */
    RTCChannelDisconnectOther?: TRoleAuthType;
    /**
     * RTC频道：开启麦克风的权限
     */
    RTCChannelOpenMicrophone?: TRoleAuthType;
    /**
     * RTC频道：开启摄像头的权限
     */
    RTCChannelOpenCamera?: TRoleAuthType;
    /**
     * RTC频道：开启/关闭他人麦克风的权限
     */
    RTCChannelOpenCloseOtherMicrophone?: TRoleAuthType;
    /**
     * RTC频道：开启/关闭他人摄像头的权限
     */
    RTCChannelOpenCloseOtherCamera?: TRoleAuthType;
    /**
     * RTC频道：开启/关闭全员麦克风的权限
     */
    RTCChannelOpenCloseEveryoneMicrophone?: TRoleAuthType;
    /**
     * RTC频道：开启/关闭全员摄像头的权限
     */
    RTCChannelOpenCloseEveryoneCamera?: TRoleAuthType;
    /**
     * RTC频道：打开自己共享屏幕的权限
     */
    RTCChannelOpenShareScreen?: TRoleAuthType;
    /**
     * RTC频道：关闭他人屏幕共享的权限
     */
    RTCChannelCloseOtherShareScreen?: TRoleAuthType;
    /**
     * 申请邀请管理权限，仅 server 有这个权限。
     */
    manageInviteApply?: TRoleAuthType;
    manageInviteApplyHistory?: TRoleAuthType;
    mentionedRole?: TRoleAuthType;
    [key: number]: TRoleAuthType;
}
/**
 * 频道身份组
 */
export interface QChatChannelRole {
    serverId: string;
    channelId: string;
    /**
     * 权限对象
     */
    auths: QChatRoleAuth;
    /**
     * 身份组 id
     */
    roleId: string;
    /**
     * 继承服务器的身份组id
     */
    parentRoleId: string;
    /**
     * 身份组类型： everyone 标志所有人都适用的身份组, custom 表示针对个人可定制的身份组
     */
    type: TRoleType;
    /**
     * 身份组扩展字段
     */
    ext?: string;
    /**
     * 身份组图标
     */
    icon?: string;
    /**
     * 身份组名称
     */
    name: string;
    createTime: number;
    updateTime: number;
}
/**
 * (某频道下给某人)定制权限
 */
export interface QChatMemberRole {
    id: string;
    /**
     * 成员的 account id
     */
    accid: string;
    channelId: string;
    serverId: string;
    /**
     * 权限
     */
    auths: QChatRoleAuth;
    /**
     * 昵称
     */
    nick?: string;
    /**
     * 头像
     */
    avatar?: string;
    /**
     * 扩展
     */
    ext?: string;
    /**
     * 成员类型
     */
    memberType: TMemberType;
    /**
     * 加入时间
     */
    joinTime: number;
    /**
     * 邀请者的 account ID
     */
    inviter: string;
    createTime: number;
    updateTime: number;
}
/**
 * 服务器身份组
 */
export interface QChatServerRole {
    /**
     * 权限对象，key-value 形式提供，格式如
     *
     * { key1: 'ignore', key2: 'allow', key3: 'deny' }
     */
    auths: QChatRoleAuth;
    /**
     * 扩展字段
     */
    ext?: string;
    /**
     * 图标 url
     */
    icon: string;
    /**
     * 身份组别名
     */
    name: string;
    /**
     * 拥有的成员数量
     */
    memberCount: number;
    /**
     * 权限优先级，数字越小，优先级越高。
     */
    priority: number;
    /**
     * 主键标识
     */
    roleId: string;
    serverId: string;
    /**
     * 类型
     *
     * "everyone" 代表所有成员都适用的默认规则
     *
     * "custom" 代表用户自行设置的身份组
     */
    type: TRoleType;
    createTime: number;
    updateTime: number;
}
/**
 * 服务器身份组的成员
 */
export interface QChatServerRoleMember {
    serverId: string;
    accid: string;
    roleId: string;
    createTime: number;
    updateTime: number;
}
export interface GetExistingChannelRolesByServerRoleIdsOptions {
    serverId: string;
    channelId: string;
    /**
     * 服务器身份组的 id 列表
     */
    roleIds: string[];
}
export interface GetExistingAccidsOfMemberRolesOptions {
    serverId: string;
    channelId: string;
    /**
     * account id 列表
     */
    accids: string[];
}
export interface GetExistingAccidsInServerRoleOptions {
    serverId: string;
    roleId: string;
    /**
     * account id 列表
     */
    accids: string[];
}
export interface UpdateServerRolePrioritiesOptions {
    serverId: string;
    /**
     * QChatServerRole 中只需要传 serverId, roleId 和 priority。传其他字段如 ext 等会被忽略。
     */
    serverRoles: Partial<QChatServerRole>[];
}
