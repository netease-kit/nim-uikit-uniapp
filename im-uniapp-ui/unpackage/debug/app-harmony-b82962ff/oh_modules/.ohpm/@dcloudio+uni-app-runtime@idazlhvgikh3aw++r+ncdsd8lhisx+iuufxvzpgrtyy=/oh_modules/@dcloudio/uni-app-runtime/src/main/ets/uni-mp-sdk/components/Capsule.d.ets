import { ICapsuleStyle } from '../types/index';
interface SafeAreaInsets {
    top?: number;
    bottom?: number;
}
@Component
export declare struct Capsule {
    @Prop
    style: ICapsuleStyle;
    @State
    safeAreaInsetsTop: number;
    @State
    closeButtonBackground: string | undefined;
    @State
    menuButtonBackground: string | undefined;
    onSafeAreaInsetsChange: (safeAreaInsets: SafeAreaInsets) => void;
    build(): void;
    aboutToAppear(): void;
    aboutToDisappear(): void;
}
export {};
