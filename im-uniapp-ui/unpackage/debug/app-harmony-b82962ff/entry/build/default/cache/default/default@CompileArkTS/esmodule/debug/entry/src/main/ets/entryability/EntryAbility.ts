import { UniEntryAbility } from "@normalized:N&&&@dcloudio/uni-app-runtime/Index&2.3.19";
import { initUniModules } from "@normalized:N&&&entry/src/main/ets/uni_modules/index.generated&";
import BuildProfile from "@normalized:N&&&entry/build/default/generated/profile/default/BuildProfile&";
initUniModules();
interface IHmr {
    init: Function;
}
export default class EntryAbility extends UniEntryAbility {
    constructor() {
        super("HBuilder", {
            debug: BuildProfile.DEBUG,
        });
        if (BuildProfile.DEBUG) {
            import("@normalized:N&&&@uni_modules/hmr-for-uni-app/utssdk/app-harmony/index&1.0.0").then((hmr: IHmr) => {
                hmr.init();
            }).catch((err: Error) => {
                console.error('[HMR] import @uni_modules/hmr-for-uni-app failed: ' + err.message);
            });
        }
    }
}
