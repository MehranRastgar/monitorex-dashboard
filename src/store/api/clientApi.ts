import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { AddToCartType, Cart, Client } from "../../../src/types/types";

export async function fetchClient(
  clientId: string
): Promise<Client | { error: { errorCode: any } }> {
  let clientid = localStorage.getItem("clientId");
  // console.log(clientid);
  try {
    const getConfig = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
        "Cache-Control": "no-cache",
        "Content-Type": "application/json;charset=UTF-8",
        Accept: "*/*",
      },
    };
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/clients/find/${clientId ?? ""}`,
      getConfig
    );
    const result: Client = response.data;
    return result;
  } catch (err: any | AxiosError) {
    {
      return { error: { errorCode: err } };
    }
  }
}

export async function requestSms(
  phoneNumber: number
): Promise<any | { error: { errorCode: any } }> {
  // let clientid = localStorage.getItem("clientId");
  // console.log(clientid);
  // state.signInFlag = "request";

  const getConfig = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
      "Cache-Control": "no-cache",
      "Content-Type": "application/json;charset=UTF-8",
      Accept: "*/*",
    },
  };
  const uri: string = "/api/sendotp?" + `PhoneNumber=${phoneNumber}`;
  try {
    const { data, status } = await axios.get(uri, getConfig);
    // .then((Response: AxiosResponse) => {
    //   console.log("sms sended:", Response.data);
    //   if (Response.status < 300) state.signInFlag = "smsWaiting";
    // })
    // .catch((err) => {
    //   state.signInFlag = "smsProviderError";
    // });
    const result: any = data;
    return result;
  } catch (err: any | AxiosError) {
    {
      return { error: { errorCode: JSON.stringify(err) } };
    }
  }
}
export async function signIn(
  phoneNumber: number,
  code: number
): Promise<any | { error: { errorCode: any } }> {
  // let clientid = localStorage.getItem("clientId");
  // console.log(clientid);
  // state.signInFlag = "request";

  const getConfig = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
      "Cache-Control": "no-cache",
      "Content-Type": "application/json;charset=UTF-8",
      Accept: "*/*",
    },
  };
  const uri: string =
    "/api/signin?" + `PhoneNumber=${phoneNumber}&code=${code}`;
  try {
    const { data, status } = await axios.get(uri, getConfig);
    // .then((Response: AxiosResponse) => {
    //   console.log("sms sended:", Response.data);
    //   if (Response.status < 300) state.signInFlag = "smsWaiting";
    // })
    // .catch((err) => {
    //   state.signInFlag = "smsProviderError";
    // });
    const result: any = data;
    return result;
  } catch (err: any | AxiosError) {
    {
      return { error: { errorCode: JSON.stringify(err) } };
    }
  }
}
export async function checkSignIn(
  id: string,
  accessToken: string
): Promise<any | { error: { errorCode: any } }> {
  // let clientid = localStorage.getItem("clientId");
  // console.log(clientid);
  // state.signInFlag = "request";

  const getConfig = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
      "Cache-Control": "no-cache",
      "Content-Type": "application/json;charset=UTF-8",
      Accept: "*/*",
      token: accessToken,
    },
  };
  const uri: string =
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/client/islogin/` + `${id}`;
  try {
    const { data, status } = await axios.get(uri, getConfig);
    // .then((Response: AxiosResponse) => {
    //   console.log("sms sended:", Response.data);
    //   if (Response.status < 300) state.signInFlag = "smsWaiting";
    // })
    // .catch((err) => {
    //   state.signInFlag = "smsProviderError";
    // });
    console.log("datadatadatadata", { ...data, accessToken: accessToken });
    const result: any = { ...data, accessToken: accessToken };
    return result;
  } catch (err: any | AxiosError) {
    {
      return { error: { errorCode: JSON.stringify(err) } };
    }
  }
}
export async function addToCartApi(
  AddToCart: AddToCartType
): Promise<Client | { error: { errorCode: any } }> {
  // let clientid = localStorage.getItem("clientId");
  // console.log(clientid);
  // state.signInFlag = "request";
  const axiosConf: AxiosRequestConfig = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
      "Cache-Control": "no-cache",
      "Content-Type": "application/json;charset=UTF-8",
      Accept: "*/*",
      token: AddToCart.accessToken,
    },
  };
  const body: any = {
    ProductId: AddToCart.productId,
    variantId: AddToCart.variantId,
  };
  const uri: string =
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/client/cart/add/` +
    `${AddToCart.userId}`;
  // console.log(uri);
  try {
    const { data, status } = await axios.post(uri, body, axiosConf);

    const result: Client = { ...data, accessToken: AddToCart.accessToken };
    return result;
  } catch (err: any | AxiosError) {
    {
      return { error: { errorCode: JSON.stringify(err) } };
    }
  }
}
export async function reduceFromCartApi(
  removeItem: AddToCartType
): Promise<Client | { error: { errorCode: any } }> {
  // let clientid = localStorage.getItem("clientId");
  // console.log(clientid);
  // state.signInFlag = "request";
  const axiosConf: AxiosRequestConfig = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
      "Cache-Control": "no-cache",
      "Content-Type": "application/json;charset=UTF-8",
      Accept: "*/*",
      token: removeItem.accessToken,
    },
  };
  const body: any = {
    ProductId: removeItem.productId,
    variantId: removeItem.variantId,
  };
  const uri: string =
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/client/cart/reduce/` +
    `${removeItem.userId}`;
  // console.log(uri);
  try {
    const { data, status } = await axios.post(uri, body, axiosConf);
    const result: Client = { ...data, accessToken: removeItem.accessToken };
    return result;
  } catch (err: any | AxiosError) {
    {
      return { error: { errorCode: JSON.stringify(err) } };
    }
  }
}
export async function PutUserApi(
  token: string,
  userInfo: Client
): Promise<any | { error: { errorCode: any } }> {
  // let clientid = localStorage.getItem("clientId");
  // console.log(clientid);
  // state.signInFlag = "request";

  const getConfig = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
      "Cache-Control": "no-cache",
      "Content-Type": "application/json;charset=UTF-8",
      Accept: "*/*",
      token: token,
    },
  };
  const body: any = {
    ...userInfo,
  };
  const uri: string = `${process.env.NEXT_PUBLIC_BASE_API_URL}/client/${String(
    userInfo._id
  )}`;
  try {
    const { data, status } = await axios.put(uri, body, getConfig);
    // .then((Response: AxiosResponse) => {
    //   console.log("sms sended:", Response.data);
    //   if (Response.status < 300) state.signInFlag = "smsWaiting";
    // })
    // .catch((err) => {
    //   state.signInFlag = "smsProviderError";
    // });
    const result: Client = data;
    result.accessToken = token;
    return result;
  } catch (err: any | AxiosError) {
    {
      return { error: { errorCode: JSON.stringify(err) } };
    }
  }
}
