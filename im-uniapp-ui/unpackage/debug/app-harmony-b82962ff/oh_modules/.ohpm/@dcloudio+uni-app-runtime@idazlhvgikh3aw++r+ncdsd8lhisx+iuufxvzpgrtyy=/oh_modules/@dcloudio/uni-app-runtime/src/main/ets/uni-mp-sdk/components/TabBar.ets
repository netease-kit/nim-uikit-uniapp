import { getResourceStr } from '../sdk'
import { SafeAreaOffset } from './SafeAreaOffset'
import { ObservedArray } from '../utils/index'

@Observed
export class TabBarStyle {
  backgroundColor: string
  borderColor: string
  color: string
  selectedColor: string

  constructor(style: TabBarStyle) {
    this.backgroundColor = style.backgroundColor
    this.borderColor = style.borderColor
    this.color = style.color
    this.selectedColor = style.selectedColor
  }
}

export interface OnTabItemClickOptions {
  index: number
}

export function createTabBarState(options: TabBarState) {
  return new TabBarState(options)
}

export function createTabBarItem(options: TabBarItem) {
  return new TabBarItem(options)
}

@Observed
export class TabBarItem {
  text?: string
  iconPath?: string
  selectedIconPath?: string
  pagePath: string
  visible: boolean
  badgeType?: undefined | 'dot' | 'number'
  badgeText?: string

  constructor(options: TabBarItem) {
    this.text = options.text
    this.iconPath = options.iconPath
    this.selectedIconPath = options.selectedIconPath
    this.pagePath = options.pagePath
    this.visible = options.visible
    this.badgeType = options.badgeType
    this.badgeText = options.badgeText
  }
}

// MidButton不支持动态修改暂不另行创建Observed Class
export interface ITabBarMidButtonIconfont {
  text?: string
  selectedText?: string
  fontSize?: string
  color?: string
  selectedColor?: string
}

export interface ITabBarMidButton {
  width?: string
  height?: string
  text?: string
  iconPath?: string
  iconWidth?: string
  backgroundImage?: string
  iconfont?: ITabBarMidButtonIconfont
}


@Observed
export class TabBarState extends TabBarStyle {
  selectedIndex: number;
  list: ObservedArray<TabBarItem>;
  midButton?: ITabBarMidButton
  onClick?: ((options: OnTabItemClickOptions) => void) | undefined;
  onMidButtonClick?: (() => void) | undefined;
  visible: boolean;

  constructor(options: TabBarState) {
    super(options)
    this.selectedIndex = options.selectedIndex
    this.list = new ObservedArray(...(options.list || []))
    this.midButton = options.midButton
    this.onClick = options.onClick
    this.onMidButtonClick = options.onMidButtonClick
    this.visible = options.visible
  }
}

@Component
struct TabBarItemComponent {
  @ObjectLink item: TabBarItem
  @Prop selectedIndex: number
  @Prop index: number
  @ObjectLink style: TabBarStyle

  build() {
    Flex({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center }) {
      Flex({
        direction: FlexDirection.Column,
        alignItems: ItemAlign.Center,
        justifyContent: FlexAlign.Center
      }) {
        if (this.item.iconPath) {
          Image(getResourceStr(this.selectedIndex == this.index ? (this.item.selectedIconPath || this.item.iconPath) :
          this.item.iconPath))
            .objectFit(ImageFit.Contain).width(24).height(24)
        }
        if (this.item.text) {
          Text(this.item.text)
            .fontSize(10)
            .fontColor(this.selectedIndex == this.index ? this.style.selectedColor : this.style.color)
            .margin({ top: 3 }).lineHeight(10)
        }
        if (this.item.badgeType == 'dot') {
          Circle({ width: 12, height: 12 })
            .fill('#f43530')
            .position({ top: 2, right: 0 })
            .translate({ x: '50%' })
        } else if (this.item.badgeType == 'number') {
          Text(this.item.badgeText?.toString())
            .fontColor('#fff')
            .fontSize(12)
            .textAlign(TextAlign.Center)
            .backgroundColor('#f43530')
            .border({ radius: 16 })
            .padding({ left: 4, right: 4 })
            .constraintSize({ minWidth: 16 })
            .lineHeight(16)
            .position({ top: 2, right: 0 })
            .translate({ x: '50%' })
        }
      }
    }
    .width('100%')
    .height('100%')
  }
}

@Component
struct TabBarMidButton {
  @Prop text?: string = ''
  @Prop textColor?: string = ''
  @Prop iconPath?: string = ''
  @Prop iconWidth?: string = ''
  @State iconHeight?: string = ''

  build() {
    Column() {
      if (this.iconPath) {
        Image(getResourceStr(this.iconPath))
          .width(this.iconWidth ? this.iconWidth.replace('px', 'vp') : '24vp')
          .height(this.iconHeight)
          .onComplete((e) => {
            if (!e) {
              return
            }
            const componentWidthVp = parseInt(this.iconWidth ? this.iconWidth.replace('px', '') : '24')
            const componentHeightVp = e.height / e.width * componentWidthVp
            this.iconHeight = componentHeightVp + 'vp'
          })
      }
      if (this.text) {
        Column() {
          Text(this.text)
            .foregroundColor(this.textColor || undefined)
            .fontSize(10)
        }
        .layoutWeight(1)
        .justifyContent(FlexAlign.Center)
        .alignItems(HorizontalAlign.Center)
      }
    }
    .alignItems(HorizontalAlign.Center)
    .width('100%')
    .height('100%')
  }
}

@Component
export struct TabBar {
  onTabItemClick?: (options: OnTabItemClickOptions) => void
  onMidButtonClick?: () => void
  @ObjectLink style: TabBarStyle
  @Prop selectedIndex: number
  @ObjectLink items: ObservedArray<TabBarItem>
  @Prop midButton?: ITabBarMidButton

  build() {
    Column() {
      Flex({ direction: FlexDirection.Row }) {
        Divider()
          .position({ x: 0, y: 0 })
          .margin(0)
          .padding(0)
          .strokeWidth(0.5)
          .color(this.style.borderColor)
        ForEach(this.items, (item: TabBarItem, index) => {
          if (item.visible !== false) {
            TabBarItemComponent({
              item: item!,
              index,
              selectedIndex: this.selectedIndex,
              style: this.style
            })
              .layoutWeight(1)
              .onClick(() => {
                this.onTabItemClick?.(
                  {
                    index
                  } as OnTabItemClickOptions
                );
              })
          }
          if (this.midButton && this.items.length / 2 === index + 1) {
            TabBarMidButton({
              text: this.midButton?.text,
              textColor: this.style.color,
              iconPath: this.midButton?.iconPath,
              iconWidth: this.midButton?.iconWidth,
            })
              .width(this.midButton?.width ? this.midButton.width.replace('px', 'vp') : '80vp')
              .height(this.midButton?.height ? this.midButton.height.replace('px', 'vp') : '50vp')
              .backgroundImage(this.midButton?.backgroundImage ? getResourceStr(this.midButton.backgroundImage) :
                undefined, ImageRepeat.NoRepeat)
              .backgroundImageSize({
                width: '100%',
                height: '100%'
              })
              .alignSelf(ItemAlign.End)
              .onClick(() => {
                this.onMidButtonClick?.()
              })
          }
        })
      }
      .height(50)


      SafeAreaOffset({ type: 'bottom' })
    }.backgroundColor(this.style.backgroundColor).expandSafeArea([SafeAreaType.SYSTEM], [SafeAreaEdge.BOTTOM])
  }
}
