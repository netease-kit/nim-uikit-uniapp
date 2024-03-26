// const baseUrl = 'https://yiyong-user-center-qa.netease.im'
const baseUrl = "https://yiyong-user-center.netease.im";
// // @ts-ignore
// BUILD_ENV === 'prod'
//   ? 'https://yiyong-user-center.netease.im/'
//   : 'https://yiyong-user-center-qa.netease.im'

const loginByCodeHeader = {
  appKey: "",
  parentScope: 2,
  scope: 7,
};
const urlMap = {
  getLoginSmsCode: "/userCenter/v1/auth/sendLoginSmsCode",
  loginRegisterByCode: "/userCenter/v1/auth/loginRegisterByCode",
  loginRegisterByToken: "/userCenter/v1/auth/loginByToken",
  logout: "/userCenter/v1/auth/logout",
};
type LoginSmsCodeRes = {
  isFirstRegister: boolean;
};
export const getLoginSmsCode = (data: {
  mobile: string;
}): Promise<LoginSmsCodeRes> => {
  const url = baseUrl + urlMap.getLoginSmsCode;

  return new Promise((resolve, reject) => {
    // @ts-ignore
    uni.request({
      url,
      header: loginByCodeHeader,
      method: "POST",
      data,
      success: (res) => {
        // @ts-ignore
        const responseData = res.data as AnyObject;
        if (responseData.code !== 200) {
          reject(responseData);
        }
        resolve(responseData.data as LoginSmsCodeRes);
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
};

type LoginRegisterByCodeRes = {
  accessToken: string;
  imAccid: string;
  imToken: string;
};
export const loginRegisterByCode = (data: {
  mobile: string;
  smsCode: string;
}): Promise<LoginRegisterByCodeRes> => {
  const url = baseUrl + urlMap.loginRegisterByCode;
  return new Promise((resolve, reject) => {
    // @ts-ignore
    uni.request({
      url,
      header: loginByCodeHeader,
      method: "POST",
      data,
      success: (res) => {
        // @ts-ignore
        const responseData = res.data as AnyObject;
        if (responseData.code !== 200) {
          reject(responseData);
        }
        resolve(responseData.data as LoginRegisterByCodeRes);
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
};

/*
export const loginRegisterByToken = (data: { accessToken: string }) => {
  const url = baseUrl + urlMap.loginRegisterByToken
  const loginByTokenHeader = {
    ...loginByCodeHeader,
    accessToken: data.accessToken,
  }
  return new Promise((resolve, reject) => {
    uni.request({
      url,
      header: loginByTokenHeader,
      method: 'POST',
      success: (res) => {
        console.log(res.data)
        resolve(res.data)
      },
      fail: (err) => {
        reject(err)
      },
    })
  })
}
*/
