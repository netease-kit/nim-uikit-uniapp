import type { Uni as _Uni } from '@dcloudio/types'
import V2NIM from 'nim-web-sdk-ng/dist/v2/NIM_UNIAPP_SDK/index'
import RootStore from '@xkit-yx/im-store-v2'

declare global {
    interface Uni extends _Uni {
        $UIKitNIM: V2NIM
        $UIKitStore: RootStore
        $UIKitCallKit: any
        $currentAudioContext: any
    }
}