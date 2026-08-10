import { EventTracking } from "./index";
import { NIM_WEB_SDK_VERSION } from "./nim";
import { NIM_UNIAPP_UI_VERSION } from "./constants";

export const trackInit = (
  component: "ChatUIKit" | "ContactUIKit" | "ConversationUIKit" | "SearchUIKit",
): void => {
  if (uni.$UIKitNIM?.options?.appkey) {
    const eventTracking = new EventTracking({
      appKey: uni.$UIKitNIM.options.appkey,
      version: NIM_UNIAPP_UI_VERSION,
      component,
      imVersion: NIM_WEB_SDK_VERSION,
      platform: "UniApp",
      os: uni.getSystemInfoSync().platform.toUpperCase(),
      framework: "UniApp",
      language: "Vue3",
      container: uni.getSystemInfoSync().uniPlatform.toUpperCase(),
    });

    eventTracking.track("init", "");
  }
};
