<template>
  <div :class="`wrapper ${collectionList.length === 0 ? 'bg-white' : ''}`">
    <NavBar :title="t('collectionText')">
      <template v-slot:left>
        <div class="nav-bar-text" @tap="back">{{ t('collectionText') }}</div>
      </template>
    </NavBar>
    <div class="collection-card-item-wrapper">
      <Empty
        v-if="collectionList.length === 0"
        :text="t('noCollectionsText')"
      />
      <div
        v-else
        v-for="(item, index) in collectionList"
        :key="item.collectionId"
      >
        <CollectionCard
          :data="item"
          :index="index"
          :key="item.collectionId"
          :handleRemoveCollection="removeCollection(item)"
        >
        </CollectionCard>
      </div>
      <div
        v-show="collectionList.length !== 0 && !noMore"
        @click="loadMoreContent"
        class="view-more-text"
      >
        {{ t('viewMoreText') }}
      </div>
      <view class="msg-tip" v-show="collectionList.length !== 0 && noMore">{{
        t('noMoreText')
      }}</view>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app'
import { ref } from '../../../utils/transformVue'
import { t } from '../../../utils/i18n'
import { V2NIMCollection } from 'nim-web-sdk-ng/dist/esm/nim/src/V2NIMMessageService'
import Empty from '../../../components/Empty.vue'
import NavBar from '../../../components/NavBar.vue'
import CollectionCard from '../my/collection-card.vue'

let collectionList = ref<V2NIMCollection[]>([])
let noMore = ref(false)

onLoad(() => {
  uni.$UIKitStore.msgStore.getCollectionListByOptionActive({}).then((data) => {
    collectionList.value = data
  })
})

const removeCollection = (collection: V2NIMCollection) => {
  return () => {
    return uni.$UIKitStore.msgStore
      .removeCollectionsActive([collection])
      .then(() => {
        const list = collectionList.value
        const index = list.findIndex((item) => item === collection)
        list.splice(index, 1)
      })
      .catch((err: any) => {
        if (err?.code && typeof t(`${err.code}`) !== 'undefined') {
          uni.showToast({
            title: t(`${err.code}`),
            icon: 'error',
            duration: 1000,
          })
        } else {
          uni.showToast({
            title: t('deleteCollectionFailedText'),
            icon: 'error',
            duration: 1000,
          })
        }
      })
  }
}

const loadMoreContent = () => {
  let length = collectionList.value.length
  const anchorCollection = collectionList.value[length - 1]

  uni.$UIKitStore.msgStore
    .getCollectionListByOptionActive({
      anchorCollection, // 锚点
      direction: 0, // 从大到小
    })
    .then((data) => {
      if (!data.length) {
        noMore.value = true
        return
      }
      collectionList.value = collectionList.value.concat(data)
    })
}
</script>

<style lang="scss" scoped>
@import '../../styles/common.scss';

page {
  padding-top: var(--status-bar-height);
  background-color: rgb(245, 246, 247);
}

.wrapper {
  width: 100%;
  box-sizing: border-box;
  padding-bottom: 30px;
  background-color: rgb(245, 246, 247);
  min-height: 100vh;
  .nav-bar-text {
    color: rgb(20, 146, 209);
  }
  .view-more-text {
    text-align: center;
    color: #b3b7bc;
    font-size: 15px;
    margin-top: 20px;
  }
  .msg-tip {
    text-align: center;
    color: #b3b7bc;
    font-size: 12px;
    margin-top: 10px;
  }
}
.bg-white {
  background: #fff;
}
</style>
