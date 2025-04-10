@Component
export declare struct Map {
    @Prop
    longitude: number;
    @Prop
    latitude: number;
    @Prop
    zoom: number;
    private mapOption?;
    private callback?;
    private mapController?;
    aboutToAppear(): void;
    build(): void;
}
