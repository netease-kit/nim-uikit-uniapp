import type { NimKitCoreTypes } from '@xkit-yx/core-kit'
import RootStore from '@xkit-yx/im-store'
/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare global {
  interface Uni {
    $UIKitStore: RootStore

    $UIKitNIM: NimKitCoreTypes.INimKitCore
  }
}
