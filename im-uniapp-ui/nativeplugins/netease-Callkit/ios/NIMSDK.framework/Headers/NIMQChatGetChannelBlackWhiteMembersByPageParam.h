
//
//  NIMQChatGetChannelBlackWhiteMembersByPageParam.h
//  NIMSDK
//
//  Created by Evang on 2022/2/10.
//  Copyright © 2022 Netease. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "NIMQChatDefs.h"

NS_ASSUME_NONNULL_BEGIN

/**
 *  
 */
@interface NIMQChatGetChannelBlackWhiteMembersByPageParam : NSObject

/**
 * 服务器id
 */
@property (nonatomic, assign) unsigned long long  serverId;

/**
 * 频道id
 */
@property (nonatomic, assign) unsigned long long  channelId;

/**
 * timetag
 */
@property (nonatomic, assign) NSTimeInterval timeTag;

/**
 * 每页个数
 */
@property (nonatomic, assign) NSInteger limit;

/**
 * 成员身份组类型
 */
@property (nonatomic, assign) NIMQChatChannelMemberRoleType type;

@end

NS_ASSUME_NONNULL_END
