import { getAbilityContext } from '../sdk'
import { AdComponent, advertising, identifier } from '@kit.AdsKit'

interface Detail {
  errCode?: number
  errMsg?: string
}

export interface CustomEvent {
  detail: Detail
}

let getAdId: ((adpid: string) => Promise<Object>) | null = () => Promise.resolve<Object>(() => {});

@Component
export struct Ad {
  @Prop adpid?: string = ''
  @Prop oaid?: string = ''
  onLoad?: (detail?: CustomEvent) => void = undefined
  onClose?: (detail?: CustomEvent) => void = undefined
  onError?: (detail?: CustomEvent) => void = undefined
  onResize?: (detail?: CustomEvent) => void = undefined
  onAdOpen?: (detail?: CustomEvent) => void = undefined
  onAdClick?: (detail?: CustomEvent) => void = undefined

  @State ads: Array<advertising.Advertisement> = [];
  @State adDisplayOptions: advertising.AdDisplayOptions = {
    refreshTime: 120000
  }
  @State adVisibilityState: Visibility = Visibility.Visible;

  private adid = '';

  aboutToAppear() {
    if (!this.adpid) {
      return;
    }

    getAdId!(this.adpid).then((res) => {
      let adid = res as string;
      if (adid.length > 0) {
        this.adid = adid;
        return identifier.getOAID().then((data) => {
          this.oaid = data;
        }).catch(() => {})
      } else  {
        throw Error('adid invalid');
      }
    }, (err: Error) => {
      this.onError?.({
        detail: {
          errMsg: err.message
        }
      });
    }).then((res) => {
      this.loadAdData(this.adid);
    })
  }

  build() {
    if (this.adVisibilityState == Visibility.Visible) {
      if (this.ads.length > 0) {
        AdComponent({
          ads: [this.ads[0]],
          displayOptions: this.adDisplayOptions,
          interactionListener: {
            onStatusChanged: (status: string, ad: advertising.Advertisement, data: string) => {
              switch (status) {
                case 'onAdOpen':
                  this.onAdOpen?.({
                    detail: {}
                  })
                  break;
                case 'onAdClick':
                  this.onAdClick?.({
                    detail: {}
                  })
                  break;
                case 'onAdClose':
                  this.onClose?.({
                    detail: {}
                  })
                  break;
                default:
              }
            }
          }
        }).onAreaChange((oldArea: Area, newArea: Area ) => {
            this.onResize?.({
              detail: {}
            })
          })
      }
    }
  }

  private loadAdData(adid: string): void {
    const adOptions: advertising.AdOptions = {
      allowMobileTraffic: 0,
      tagForChildProtection: -1,
      tagForUnderAgeOfPromise: -1,
      adContentClassification: 'A'
    };

    const adReqParams: advertising.AdRequestParams[] = [{
      adId: adid,
      adType: 3,
      adCount: 1,
      enableDirectReturnVideoAd: true,
      oaid: this.oaid
    }];

    const adLoaderListener: advertising.MultiSlotsAdLoadListener = {
      onAdLoadSuccess: (ads: Map<string, Array<advertising.Advertisement>>) => {
        ads.forEach((adsArray) => this.ads.push(...adsArray));
      },
      onAdLoadFailure: (errorCode: number, errorMsg: string) => {
        console.log(errorMsg);
        this.onError?.({
          detail: {
            errCode: errorCode,
            errMsg: errorMsg
          }
        })
      },
    };
    const load: advertising.AdLoader = new advertising.AdLoader(getAbilityContext());
    load.loadAdWithMultiSlots(adReqParams, adOptions, adLoaderListener);
  }
}

export function setAdServer(getFeedAdData: ((adpid: string) => Promise<Object>) | null): void {
  getAdId = getFeedAdData;
}
