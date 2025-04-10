<template>
  <div class="wrapper">
    <NavBar :title="t('FriendPageText')" />
    <UserCard
      :account="userInfo && userInfo.accountId"
      :nick="userInfo && userInfo.name"
    ></UserCard>
    <template v-if="relation === 'stranger'">
      <div class="userInfo-item-wrapper">
        <div class="userInfo-item">
          <div class="item-left">{{ t('addBlacklist') }}</div>
          <switch
            :checked="isInBlacklist"
            @change="(checked) => handleSwitchChange(checked)"
          />
        </div>
      </div>

      <div class="button" :style="{ marginTop: '10px' }" @click="addFriend">
        {{ t('addFriendText') }}
      </div>
    </template>
    <template v-else>
      <div class="userInfo-item-wrapper">
        <div class="userInfo-item" @tap="handleAliasClick">
          <div class="item-left">{{ t('remarkText') }}</div>
          <div class="item-right">
            <Icon iconClassName="more-icon" color="#999" type="icon-jiantou" />
          </div>
        </div>
        <div class="userInfo-item">
          <div class="item-left">{{ t('genderText') }}</div>
          <div class="item-right">
            {{
              userInfo && userInfo.gender === 0
                ? t('unknow')
                : userInfo && userInfo.gender === 1
                ? t('man')
                : t('woman')
            }}
          </div>
        </div>
        <div class="box-shadow"></div>
        <div class="userInfo-item">
          <div class="item-left">{{ t('birthText') }}</div>
          <div class="item-right">
            {{ (userInfo && userInfo.birthday) || t('unknow') }}
          </div>
        </div>
        <div class="box-shadow"></div>
        <div class="userInfo-item">
          <div class="item-left">{{ t('mobile') }}</div>
          <div class="item-right">
            {{ (userInfo && userInfo.mobile) || t('unknow') }}
          </div>
        </div>
        <div class="box-shadow"></div>
        <div class="userInfo-item">
          <div class="item-left">{{ t('email') }}</div>
          <div class="item-right">
            {{ (userInfo && userInfo.email) || t('unknow') }}
          </div>
        </div>
        <div class="userInfo-item">
          <div class="item-left">{{ t('sign') }}</div>
          <div class="item-right">
            {{ (userInfo && userInfo.sign) || t('unknow') }}
          </div>
        </div>
      </div>
      <div class="userInfo-item-wrapper">
        <div class="userInfo-item">
          <div class="item-left">{{ t('addBlacklist') }}</div>
          <switch :checked="isInBlacklist" @change="handleSwitchChange" />
        </div>
      </div>
      <div class="button" @click="gotoChat">{{ t('chatWithFriendText') }}</div>
      <div class="box-shadow"></div>
      <div class="button button-red" @click="deleteFriend">
        {{ t('deleteFriendText') }}
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app'
import UserCard from '../../../components/UserCard.vue'
import { onUnmounted, ref } from '../../../utils/transformVue'
import { t } from '../../../utils/i18n'
import NavBar from '../../../components/NavBar.vue'
import { autorun } from 'mobx'
import {
  customRedirectTo,
  customNavigateTo,
} from '../../../utils/customNavigate'
import type { Relation } from '@xkit-yx/im-store-v2'
import { V2NIMUser } from 'nim-web-sdk-ng/dist/v2/NIM_UNIAPP_SDK/V2NIMUserService'
import { V2NIMConst } from '../../../utils/nim'
import Icon from '../../../components/Icon.vue'

/**是否是云端会话 */
const enableV2CloudConversation =
  uni.$UIKitStore?.sdkOptions?.enableV2CloudConversation

const userInfo = ref<V2NIMUser>()
const relation = ref<Relation>('stranger')
const isInBlacklist = ref(false)

let account = ''

const handleAliasClick = () => {
  customNavigateTo({
    url: `/pages/Friend/friend-info-edit?id=${account}`,
  })
}
let uninstallFriendWatch = () => {}
let uninstallRelationWatch = () => {}

onLoad((props) => {
  account = props ? props.account : ''
  uni.$UIKitStore.userStore.getUserForceActive(account).then((res) => {
    console.log('getUserForceActive===============', res)
  })
  uninstallFriendWatch = autorun(() => {
    userInfo.value = uni.$UIKitStore.uiStore.getFriendWithUserNameCard(account)
  })

  uninstallRelationWatch = autorun(() => {
    const { relation: _relation, isInBlacklist: _isInBlacklist } =
      uni.$UIKitStore.uiStore.getRelation(account)
    relation.value = _relation
    isInBlacklist.value = _isInBlacklist
  })
})

const handleSwitchChange = async (e: any) => {
  const isAdd = e.detail.value
  try {
    if (isAdd) {
      await uni.$UIKitStore.relationStore.addUserToBlockListActive(account)
    } else {
      await uni.$UIKitStore.relationStore.removeUserFromBlockListActive(account)
    }
  } catch (error) {
    uni.showToast({
      title: isAdd ? t('setBlackFailText') : t('removeBlackFailText'),
      icon: 'error',
    })
  }
}

const deleteFriend = () => {
  uni.showModal({
    title: t('deleteFriendText'),
    content:
      t('deleteFriendConfirmText') +
      '“' +
      uni.$UIKitStore.uiStore.getAppellation({ account }) +
      '”?',
    success: (res) => {
      if (res.confirm) {
        uni.$UIKitStore.friendStore
          .deleteFriendActive(account)
          .then(() => {
            uni.showToast({
              title: t('deleteFriendSuccessText'),
              icon: 'success',
            })
          })
          .then(() => {
            const conversationId =
              uni.$UIKitNIM.V2NIMConversationIdUtil.p2pConversationId(account)
            if (enableV2CloudConversation) {
              return uni.$UIKitStore.conversationStore?.deleteConversationActive(
                conversationId
              )
            } else {
              return uni.$UIKitStore.localConversationStore?.deleteConversationActive(
                conversationId
              )
            }
          })
          .catch(() => {
            uni.showToast({
              title: t('deleteFriendFailText'),
              icon: 'error',
            })
          })
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    },
  })
}

const addFriend = async () => {
  try {
    await uni.$UIKitStore.friendStore.addFriendActive(account, {
      addMode: V2NIMConst.V2NIMFriendAddMode.V2NIM_FRIEND_MODE_TYPE_APPLY,
      postscript: '',
    })

    // 发送申请成功后解除黑名单
    await uni.$UIKitStore.relationStore.removeUserFromBlockListActive(account)
    uni.showToast({
      title: t('applyFriendSuccessText'),
      icon: 'success',
    })
  } catch (error) {
    uni.showToast({
      title: t('applyFriendFailText'),
      icon: 'error',
    })
  }
}

const gotoChat = async () => {
  const conversationId =
    uni.$UIKitNIM.V2NIMConversationIdUtil.p2pConversationId(
      userInfo.value?.accountId || ''
    )
  await uni.$UIKitStore.uiStore.selectConversation(conversationId)
  customRedirectTo({
    url: '/pages/Chat/index',
  })
}

onUnmounted(() => {
  uninstallFriendWatch()
  uninstallRelationWatch()
})
</script>

<style lang="scss" scoped>
@import '../../styles/common.scss';

page {
  padding-top: var(--status-bar-height);
  height: 100vh;
  overflow: hidden;
}

.wrapper {
  background-color: rgb(245, 246, 247);
  height: 100vh;
  box-sizing: border-box;
  padding-bottom: 50px;

  .userInfo-item-wrapper {
    background-color: #fff;
    margin: 10px 0;

    .userInfo-item {
      display: flex;
      height: 50px;
      align-items: center;
      justify-content: space-between;
      padding: 0 25px;

      .item-left {
        font-size: 16px;
      }

      .item-right {
        font-size: 15px;
        width: 200px;
        text-align: right;
        color: #a6adb6;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }

  .button {
    // margin-top: 150px;
    display: block;
    width: 100%;
    background-color: #fff;
    color: rgb(25, 146, 239);
    text-align: center;
    height: 50px;
    font-size: 16px;
    line-height: 50px;
  }

  .button-red {
    color: #e6605c;
  }

  .box-shadow {
    height: 1px;
    background: none;
    padding: 0 25px;
    box-shadow: 0 0.5px 0 rgb(247, 244, 244);
  }
}
</style>
