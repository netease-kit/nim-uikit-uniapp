<script>
import {
  initIMUIKit,
  onIMUIKitShow,
  onIMUIKitHide,
} from "./components/NEUIKit/utils/init.ts";

export default {
  onLaunch() {
    initIMUIKit({
      appkey: "", //您在云信控制台注册的appkey
      account: "", //云信控制台上的account
      token: "",
    });
  },
  // 推送相关，应用回到前台时，同步 IMUIKit 前台状态并处理通知栏唤起后的会话跳转。
  onShow() {
    onIMUIKitShow();
  },
  // 推送相关，应用进入后台时，同步 IMUIKit 后台状态并清理通知栏唤起缓存。
  onHide() {
    onIMUIKitHide();
  },
};
</script>
<style>
uni-page-body {
  height: 100%;
}
uni-page-body > uni-view {
  height: 100%;
}
</style>
