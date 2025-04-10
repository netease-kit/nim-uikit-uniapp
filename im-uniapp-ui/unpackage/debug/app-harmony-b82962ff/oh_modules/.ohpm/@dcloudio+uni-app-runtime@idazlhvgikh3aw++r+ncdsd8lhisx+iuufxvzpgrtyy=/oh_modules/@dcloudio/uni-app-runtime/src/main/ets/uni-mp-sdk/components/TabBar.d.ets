import { ObservedArray } from '../utils/index';
@Observed
export declare class TabBarStyle {
    backgroundColor: string;
    borderColor: string;
    color: string;
    selectedColor: string;
    constructor(style: TabBarStyle);
}
export interface OnTabItemClickOptions {
    index: number;
}
export declare function createTabBarState(options: TabBarState): TabBarState;
export declare function createTabBarItem(options: TabBarItem): TabBarItem;
@Observed
export declare class TabBarItem {
    text?: string;
    iconPath?: string;
    selectedIconPath?: string;
    pagePath: string;
    visible: boolean;
    badgeType?: undefined | 'dot' | 'number';
    badgeText?: string;
    constructor(options: TabBarItem);
}
export interface ITabBarMidButtonIconfont {
    text?: string;
    selectedText?: string;
    fontSize?: string;
    color?: string;
    selectedColor?: string;
}
export interface ITabBarMidButton {
    width?: string;
    height?: string;
    text?: string;
    iconPath?: string;
    iconWidth?: string;
    backgroundImage?: string;
    iconfont?: ITabBarMidButtonIconfont;
}
@Observed
export declare class TabBarState extends TabBarStyle {
    selectedIndex: number;
    list: ObservedArray<TabBarItem>;
    midButton?: ITabBarMidButton;
    onClick?: ((options: OnTabItemClickOptions) => void) | undefined;
    onMidButtonClick?: (() => void) | undefined;
    visible: boolean;
    constructor(options: TabBarState);
}
@Component
export declare struct TabBar {
    onTabItemClick?: (options: OnTabItemClickOptions) => void;
    onMidButtonClick?: () => void;
    @ObjectLink
    style: TabBarStyle;
    @Prop
    selectedIndex: number;
    @ObjectLink
    items: ObservedArray<TabBarItem>;
    @Prop
    midButton?: ITabBarMidButton;
    build(): void;
}
