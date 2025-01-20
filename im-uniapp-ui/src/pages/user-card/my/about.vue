<template>
  <div class="wrapper">
    <NavBar title="关于" />
    <div class="logo-box">
      <image
        src="https://yx-web-nosdn.netease.im/common/fcd2d5e8d2897d4b2d965e06509f47d2/about-logo.png"
        class="logo-img"
      />
      <div>{{ t('appText') }}</div>
    </div>
    <div class="aboutInfo-item-wrapper">
      <div class="item">
        <div>版本号</div>
        <div>10.2.1</div>
      </div>
      <div class="item">
        <div>IM 版本</div>
        <div>{{ imPkg.version }}</div>
      </div>
      <uni-link
        v-if="!isWxApp"
        :href="yunxinWebsite"
        :showUnderLine="false"
        color="#000000"
      >
        <div class="item">
          <div>产品介绍</div>
          <Icon iconClassName="icon-arrow" type="icon-jiantou"></Icon>
        </div>
      </uni-link>
      <div v-else @click="wxDownload">
        <div class="item">
          <div>产品介绍</div>
          <Icon iconClassName="icon-arrow" type="icon-jiantou"></Icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import NavBar from '../../../components/NavBar.vue'
import { t } from '../../../utils/i18n'
import { isWxApp } from '../../../utils'
//@ts-ignore
import imPkg from 'nim-web-sdk-ng/package.json'

// @ts-ignore
import UniLink from '../../../components/uni-components/uni-link/components/uni-link/uni-link.vue'
import Icon from '../../../components/Icon.vue'

const yunxinWebsite = 'https://yunxin.163.com/'

const wxDownload = () => {
  uni.setClipboardData({
    data: yunxinWebsite,
  })
  uni.showModal({
    content: t('wxAppFileCopyText'),
    showCancel: false,
  })
}
</script>

<style lang="scss" scoped>
@import '../../styles/common.scss';

page {
  padding-top: var(--status-bar-height);
  height: 100vh;
  background-color: rgb(245, 246, 247);
}

.wrapper {
  background-color: rgb(245, 246, 247);
  background-color: #fff;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
}
.logo-box {
  text-align: center;
  margin: 22px auto;
  font-size: 20px;
  font-weight: 600;

  .logo-img {
    width: 72px;
    height: 72px;
  }
}

.aboutInfo-item-wrapper {
  .item {
    display: flex;
    justify-content: space-between;
    padding: 12px 20px 12px 0;
    margin-left: 20px;
    font-size: 14px;
    font-weight: normal;
    border-bottom: 1px solid #f5f8fc;
  }
}
</style>
