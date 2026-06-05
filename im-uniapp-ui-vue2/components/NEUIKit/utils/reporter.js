import { EventTracking } from "./index";

export const trackInit = (component) => {
  if (uni.$UIKitNIM?.options?.appkey) {
    const eventTracking = new EventTracking({
      appKey: uni.$UIKitNIM.options.appkey,
      version: "10.0.0",
      component,
      imVersion: "10.9.81",
      platform: "UniApp",
      os: uni.getSystemInfoSync().platform.toUpperCase(),
      framework: "UniApp",
      language: "Vue2",
      container: uni.getSystemInfoSync().uniPlatform.toUpperCase(),
    });

    eventTracking.track("init", "");
  }
};
