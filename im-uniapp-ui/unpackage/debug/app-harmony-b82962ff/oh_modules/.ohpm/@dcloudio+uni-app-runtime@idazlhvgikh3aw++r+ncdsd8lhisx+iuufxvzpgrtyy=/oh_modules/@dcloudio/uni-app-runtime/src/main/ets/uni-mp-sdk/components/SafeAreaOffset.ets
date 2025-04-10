import {
  getSafeAreaInsets,
  onSafeAreaInsetsChange,
  offSafeAreaInsetsChange
} from '../sdk';

interface SafeAreaInsets {
  top?: number
  bottom?: number
}

@Component
export struct SafeAreaOffset {
  @Prop type: string
  @State h: number = 0
  onSafeAreaInsetsChange = (safeAreaInsets: SafeAreaInsets) => {
    if (this.type === 'top' && typeof safeAreaInsets.top === 'number') {
      this.h = safeAreaInsets.top
    } else if (this.type === 'bottom' && typeof safeAreaInsets.bottom === 'number') {
      this.h = safeAreaInsets.bottom
    }
  }

  build() {
    Stack().height(this.h + 'px').width('100%')
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
