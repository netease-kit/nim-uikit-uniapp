export interface ITitleNView {
    titleText?: string;
    backgroundColor?: string;
    titleColor?: string;
    autoBackButton?: boolean;
    loading?: boolean;
}
@Component
export declare struct NavBar {
    onBackClick?: () => void;
    @Prop
    titleNView: ITitleNView;
    build(): void;
}
