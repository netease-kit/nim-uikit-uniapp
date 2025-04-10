if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Map_Params {
    longitude?: number;
    latitude?: number;
    zoom?: number;
    mapOption?: mapCommon.MapOptions;
    callback?: AsyncCallback<map.MapComponentController>;
    mapController?: map.MapComponentController;
}
import { MapComponent } from "@bundle:com.huawei.hms.mapservice.kit/mapLibrary/ets/MapComponent";
import mapCommon from "@bundle:com.huawei.hms.mapservice.kit/mapLibrary/ets/mapCommon";
import type map from "@bundle:com.huawei.hms.mapservice.kit/mapLibrary/ets/map";
import type { AsyncCallback } from "@ohos:base";
export class Map extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__longitude = new SynchedPropertySimpleOneWayPU(params.longitude, this, "longitude");
        this.__latitude = new SynchedPropertySimpleOneWayPU(params.latitude, this, "latitude");
        this.__zoom = new SynchedPropertySimpleOneWayPU(params.zoom, this, "zoom");
        this.mapOption = undefined;
        this.callback = undefined;
        this.mapController = undefined;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Map_Params) {
        if (params.mapOption !== undefined) {
            this.mapOption = params.mapOption;
        }
        if (params.callback !== undefined) {
            this.callback = params.callback;
        }
        if (params.mapController !== undefined) {
            this.mapController = params.mapController;
        }
    }
    updateStateVars(params: Map_Params) {
        this.__longitude.reset(params.longitude);
        this.__latitude.reset(params.latitude);
        this.__zoom.reset(params.zoom);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__longitude.purgeDependencyOnElmtId(rmElmtId);
        this.__latitude.purgeDependencyOnElmtId(rmElmtId);
        this.__zoom.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__longitude.aboutToBeDeleted();
        this.__latitude.aboutToBeDeleted();
        this.__zoom.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __longitude: SynchedPropertySimpleOneWayPU<number>;
    get longitude() {
        return this.__longitude.get();
    }
    set longitude(newValue: number) {
        this.__longitude.set(newValue);
    }
    private __latitude: SynchedPropertySimpleOneWayPU<number>;
    get latitude() {
        return this.__latitude.get();
    }
    set latitude(newValue: number) {
        this.__latitude.set(newValue);
    }
    private __zoom: SynchedPropertySimpleOneWayPU<number>;
    get zoom() {
        return this.__zoom.get();
    }
    set zoom(newValue: number) {
        this.__zoom.set(newValue);
    }
    private mapOption?: mapCommon.MapOptions;
    private callback?: AsyncCallback<map.MapComponentController>;
    private mapController?: map.MapComponentController;
    aboutToAppear(): void {
        this.mapOption = {
            position: {
                target: {
                    latitude: this.latitude,
                    longitude: this.longitude
                },
                zoom: this.zoom,
            },
            mapType: mapCommon.MapType.STANDARD,
            myLocationControlsEnabled: true,
        };
        this.callback = async (err, mapController) => {
            if (!err) {
                this.mapController = mapController;
                this.mapController.on('mapLoad', () => {
                    console.info('mapLoad');
                });
            }
            else {
                console.error('map init failed');
            }
        };
    }
    initialRender() {
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new MapComponent(this, { mapOptions: this.mapOption, mapCallback: this.callback }, undefined, elmtId, () => { }, { page: "oh_modules/.ohpm/@dcloudio+uni-app-runtime@idazlhvgikh3aw++r+ncdsd8lhisx+iuufxvzpgrtyy=/oh_modules/@dcloudio/uni-app-runtime/src/main/ets/uni-mp-sdk/components/Map.ets", line: 39, col: 5 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            mapOptions: this.mapOption,
                            mapCallback: this.callback
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "MapComponent" });
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}
