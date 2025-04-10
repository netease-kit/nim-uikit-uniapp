import { UniEntryAbility } from "@dcloudio/uni-app-runtime";
import { initUniModules } from "../uni_modules/index.generated";
import BuildProfile from "BuildProfile";

initUniModules();

interface IHmr {
  init: Function
}

export default class EntryAbility extends UniEntryAbility {
  constructor() {
    super("HBuilder", {
      debug: BuildProfile.DEBUG,
    });

    if (BuildProfile.DEBUG) {
      import('@uni_modules/hmr-for-uni-app').then((hmr: IHmr) => {
        hmr.init()
      }).catch((err: Error) => {
        console.error('[HMR] import @uni_modules/hmr-for-uni-app failed: ' + err.message)
      })
    }
  }
}
