import type { Uni as _Uni } from '@dcloudio/types'
import type V2NIM from './components/NEUIKit/utils/module/nim-web-sdk/esm/nim/src/index'
import type RootStore from './components/NEUIKit/utils/store'

declare global {
    interface Uni extends _Uni {
        $UIKitNIM: V2NIM
        $UIKitStore: RootStore
        $UIKitCallKit: any
    }
}
