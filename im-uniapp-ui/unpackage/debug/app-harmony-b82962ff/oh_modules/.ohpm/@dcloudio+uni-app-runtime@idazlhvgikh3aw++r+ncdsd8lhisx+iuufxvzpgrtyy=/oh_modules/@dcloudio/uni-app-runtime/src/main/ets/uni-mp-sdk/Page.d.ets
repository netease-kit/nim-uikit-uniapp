import { createTabBarState, createTabBarItem } from './components/TabBar';
import { ITitleNView } from './components/NavBar';
import { NodeController } from '@kit.ArkUI';
@Observed
declare class PullToRefresh {
    support?: boolean;
    constructor(pullToRefresh?: PullToRefresh);
}
@Observed
declare class ObservedPageStyle {
    titleNView?: ITitleNView;
    pullToRefresh?: PullToRefresh;
    background?: string;
    backgroundTextStyle?: 'light' | 'dark';
    marginTop?: number;
    paddingBottom?: number;
    constructor(style: ObservedPageStyle);
}
@Observed
declare class ObservedChildren extends Array<NodeController> {
}
@Observed
declare class RefreshState {
    refreshing?: boolean;
    onRefreshing?: () => void;
    onRefreshStateChange?: (state?: RefreshStatus) => void;
    constructor(state?: RefreshState);
}
@Observed
declare class SubPageState {
    id: string;
    style: ObservedPageStyle;
    embedChildren: ObservedChildren;
    stackChildren: ObservedChildren;
    refreshState: RefreshState;
    constructor(id: string, style: ObservedPageStyle, embedChildren: NodeController[], stackChildren: NodeController[], refreshState?: RefreshState);
}
export declare function createSubPageState(options: SubPageState): SubPageState;
export { createTabBarState, createTabBarItem };
