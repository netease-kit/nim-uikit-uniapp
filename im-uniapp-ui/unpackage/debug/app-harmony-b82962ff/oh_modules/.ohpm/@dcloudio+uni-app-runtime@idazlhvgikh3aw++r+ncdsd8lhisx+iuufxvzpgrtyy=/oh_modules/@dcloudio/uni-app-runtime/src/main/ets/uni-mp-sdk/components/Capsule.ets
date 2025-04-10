import font from '@ohos.font';
import { getSafeAreaInsets, onSafeAreaInsetsChange, offSafeAreaInsetsChange,
  getCurrentMP } from '../sdk';
import { UniSystemIcons } from '../utils/index'
import {
  ICapsuleStyle,
  UniMP
} from '../types/index'


interface SafeAreaInsets {
  top?: number
  bottom?: number
}

@Component
struct CapsuleButton {
  @Prop text: string = ''
  @Prop textColor: string | undefined = undefined
  @Prop highlightColor: string | undefined = undefined
  @Prop onButtonClick: (() => void) | undefined = undefined
  @State styleBackgroundColor: string | undefined = undefined

  aboutToAppear() {
    font.registerFont({
      familyName: UniSystemIcons,
      familySrc: $rawfile('uni-app/iconfont.ttf')
    })
  }

  build() {
    Stack() {
      Text(this.text)
        .fontFamily(UniSystemIcons)
        .fontSize('22vp')
        .fontColor(this.textColor || '#000000')
    }
    .width('100%')
    .height('100%')
    .align(Alignment.Center)
    .backgroundColor(this.styleBackgroundColor)
    .onTouch((event) => {
      switch (event.type) {
        case TouchType.Down: {
          this.styleBackgroundColor = this.highlightColor || '#CBCCCD'
          break
        }
        case TouchType.Up:
        case TouchType.Cancel: {
          this.styleBackgroundColor = undefined
          break
        }
      }
    })
    .onHover((isHover) => {
      if (isHover) {
        this.styleBackgroundColor = this.highlightColor || '#CBCCCD'
        return
      }
      this.styleBackgroundColor = undefined
    })
  }
}

@Component
export struct Capsule {
  @Prop style: ICapsuleStyle
  @State safeAreaInsetsTop: number = 0
  @State closeButtonBackground: string | undefined = undefined
  @State menuButtonBackground: string | undefined = undefined
  onSafeAreaInsetsChange = (safeAreaInsets: SafeAreaInsets) => {
    if (typeof safeAreaInsets.top === 'number') {
      this.safeAreaInsetsTop = safeAreaInsets.top
    }
  }

  build() {
    Flex({
      direction: FlexDirection.Row,
      alignItems: ItemAlign.Center
    }) {
      // menu
      CapsuleButton({
        text: '\ue606',
        textColor: this.style.textColor,
        highlightColor: this.style.highlightColor
      })
        .flexGrow(1)
        .onClick(() => {
          const currentMP = getCurrentMP() as UniMP
          currentMP.capsuleMenuButtonClick?.()
        })
      Line({
        width: '1vp',
        height: '20vp'
      })
        // .fill(this.style.borderColor || '#FFE5E5E5')
        .backgroundColor(this.style.borderColor || '#FFE5E5E5')
      // close
      CapsuleButton({
        text: '\ue650',
        textColor: this.style.textColor,
        highlightColor: this.style.highlightColor
      })
        .flexGrow(1)
        .onClick(() => {
          const currentMP = getCurrentMP() as UniMP
          currentMP.capsuleCloseButtonClick?.()
        })
    }
    .height('32vp')
    .width('88vp')
    .margin({
      top: this.safeAreaInsetsTop + vp2px(12) + 'px',
      right: '10vp'
    })
    .borderStyle(BorderStyle.Solid)
    .borderWidth('1vp')
    .borderColor(this.style.borderColor || '#FFE5E5E5')
    .borderRadius('16vp')
    .align(Alignment.TopEnd)
    .clip(true)
    .backgroundColor(this.style.backgroundColor || '#FFFFFF')
  }

  aboutToAppear(): void {
    const safeAreaInsets: SafeAreaInsets = getSafeAreaInsets(true)
    this.onSafeAreaInsetsChange(safeAreaInsets)
    onSafeAreaInsetsChange(this.onSafeAreaInsetsChange, true)
  }

  aboutToDisappear(): void {
    offSafeAreaInsetsChange(this.onSafeAreaInsetsChange)
  }
}
