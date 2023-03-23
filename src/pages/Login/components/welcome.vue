<template>
  <image src="../static/welcome.png" class="welcome-img" />
  <button class="login-btn" @click="$emit('click', $event)">注册/登录</button>
  <div class="bottom-box">
    <image src="../static/welcome-bottom.png" class="welcome-img-bottom" />
  </div>
</template>

<script lang="ts" setup>
defineEmits<{
  (event: 'click', payload: MouseEvent): void
}>();
</script>

<style lang="scss" scoped>
page {
  height: 100%;
  overflow: hidden;
}

.welcome-img {
  width: 120px;
  height: 154px;
  display: block;
  margin: 20vh auto 0;
}

.login-btn {
  height: 50px;
  width: 90%;
  background: #337EFF;
  border-radius: 8px;
  color: #fff;
  margin-top: 80px;
}

.bottom-box {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);

  .welcome-img-bottom {
    width: 82px;
    height: 20px;
  }
}
</style>
