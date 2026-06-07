<template>
  <div :class="['wrapper', { 'bg-white': collectionList.length === 0 }]">
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
          @remove="removeCollection"
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

<script>
import { t } from '../../../utils/i18n'
import Empty from '../../../components/Empty.vue'
import NavBar from '../../../components/NavBar.vue'
import CollectionCard from '../my/collection-card.vue'
import { toRenderSafeData } from '../../../utils'
import { parseText } from '../../../utils/parseText'

export default {
  components: {
    Empty,
    NavBar,
    CollectionCard,
  },
  data() {
    return {
      collectionList: [],
      noMore: false,
    }
  },
  created() {
    this.rawCollectionList = []
  },
  onLoad() {
    uni.$UIKitStore.msgStore.getCollectionListByOptionActive({}).then((data) => {
      this.rawCollectionList = data || []
      this.collectionList = this.normalizeCollectionList(data)
    })
  },
  methods: {
    t,
    normalizeCollectionList(list) {
      return (list || []).map((item) => this.normalizeCollection(item))
    },
    normalizeCollection(item) {
      let collectionData = {}
      try {
        collectionData = JSON.parse(item.collectionData || '{}')
      } catch (error) {
        collectionData = {}
      }

      const message = collectionData.message
        ? uni.$UIKitNIM.V2NIMMessageConverter.messageDeserialization(
            collectionData.message
          )
        : {}
      const renderData =
        toRenderSafeData({
          collectionData: {
            ...collectionData,
            message,
          },
          message,
        }) || {}

      return {
        ...(toRenderSafeData(item) || {}),
        renderCollectionData: renderData.collectionData || {},
        renderMsg: renderData.message || {},
        renderTextArr: parseText(renderData.message?.text || ''),
      }
    },
    back() {
      uni.navigateBack({
        delta: 1,
      })
    },
    removeCollection(collection) {
      const collectionId = collection?.collectionId
      const targetCollection = this.rawCollectionList.find(
        (item) => item.collectionId === collectionId
      )

      if (!targetCollection) {
        this.collectionList = this.collectionList.filter(
          (item) => item.collectionId !== collectionId
        )
        this.rawCollectionList = this.rawCollectionList.filter(
          (item) => item.collectionId !== collectionId
        )
        return Promise.resolve()
      }

      return uni.$UIKitStore.msgStore
        .removeCollectionsActive([targetCollection])
        .then(() => {
          this.collectionList = this.collectionList.filter(
            (item) => item.collectionId !== collectionId
          )
          this.rawCollectionList = this.rawCollectionList.filter(
            (item) => item.collectionId !== collectionId
          )
        })
        .catch((err) => {
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
    },
    loadMoreContent() {
      const length = this.collectionList.length
      const anchorCollection = this.collectionList[length - 1]

      uni.$UIKitStore.msgStore
        .getCollectionListByOptionActive({
          anchorCollection,
          direction: 0,
        })
        .then((data) => {
          if (!data.length) {
            this.noMore = true
            return
          }
          this.rawCollectionList = this.rawCollectionList.concat(data)
          this.collectionList = this.collectionList.concat(
            this.normalizeCollectionList(data)
          )
        })
    },
  },
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
