import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import {
  AddToCartType,
  Cart,
  Client,
  GroupItemType,
  UserType,
} from "../../../src/types/types";
//--------------------------------------------------------------------------------//
export async function signIn(
  userName: string,
  password: string
): Promise<any | { error: { errorCode: any } }> {
  // let clientid = localStorage.getItem("clientId");
  ////console.log(clientid);
  // state.signInFlag = "request";

  const postConfig = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
      "Cache-Control": "no-cache",
      "Content-Type": "application/json;charset=UTF-8",
      Accept: "*/*",
    },
  };
  const body = {
    username: userName,
    password: password,
  };
  const uri: string = `${process.env.NEXT_PUBLIC_BASE_API_URL}/users/login/`;
  try {
    const { data, status } = await axios.post(uri, body, postConfig);
    // .then((Response: AxiosResponse) => {
    //  //console.log("sms sended:", Response.data);
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
//--------------------------------------------------------------------------------//
export async function checkSignIn(
  accessToken: string
): Promise<any | { error: { errorCode: any } }> {
  // let clientid = localStorage.getItem("clientId");
  ////console.log(clientid);
  // state.signInFlag = "request";

  const getConfig = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
      "Cache-Control": "no-cache",
      "Content-Type": "application/json;charset=UTF-8",
      Accept: "*/*",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const uri: string = `${process.env.NEXT_PUBLIC_BASE_API_URL}/users/login/islogin`;
  try {
    const { data, status } = await axios.get(uri, getConfig);
    // .then((Response: AxiosResponse) => {
    //  //console.log("sms sended:", Response.data);
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
//--------------------------------------------------------------------------------//
export async function PatchUserApi(
  token: string,
  userInfo: UserType
): Promise<any | { error: { errorCode: any } }> {
  const getConfig = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
      "Cache-Control": "no-cache",
      "Content-Type": "application/json;charset=UTF-8",
      Accept: "*/*",
      Authorization: `Bearer ${token}`,
    },
  };
  const body: any = {
    ...userInfo,
  };
  //console.log(userInfo);
  const uri: string = `${process.env.NEXT_PUBLIC_BASE_API_URL}/users/${String(
    userInfo._id
  )}`;
  try {
    const { data, status } = await axios.patch(uri, body, getConfig);
    // .then((Response: AxiosResponse) => {
    //  //console.log("sms sended:", Response.data);
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
//--------------------------------------------------------------------------------//
export async function CreateUserApi(
  token: string,
  userInfo: UserType
): Promise<any | { error: { errorCode: any } }> {
  const getConfig = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
      "Cache-Control": "no-cache",
      "Content-Type": "application/json;charset=UTF-8",
      Accept: "*/*",
      Authorization: `Bearer ${token}`,
    },
  };
  const body: any = {
    ...userInfo,
  };
  //console.log(userInfo);
  const uri: string = `${process.env.NEXT_PUBLIC_BASE_API_URL}/users`;
  try {
    const { data, status } = await axios.post(uri, body, getConfig);
    // .then((Response: AxiosResponse) => {
    //  //console.log("sms sended:", Response.data);
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
//--------------------------------------------------------------------------------//
export async function UpdateGroupApi(
  token: string,
  userInfo: UserType
): Promise<any | { error: { errorCode: any } }> {
  // let clientid = localStorage.getItem("clientId");
  ////console.log(clientid);
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
  const uri: string = `${
    process.env.NEXT_PUBLIC_BASE_API_URL
  }/users/group/${String(userInfo._id)}`;
  try {
    const { data, status } = await axios.put(uri, body, getConfig);
    // .then((Response: AxiosResponse) => {
    //  //console.log("sms sended:", Response.data);
    //   if (Response.status < 300) state.signInFlag = "smsWaiting";
    // })
    // .catch((err) => {
    //   state.signInFlag = "smsProviderError";
    // });
    const result: UserType = data;
    result.access_token = token;
    return result;
  } catch (err: any | AxiosError) {
    {
      return { error: { errorCode: JSON.stringify(err) } };
    }
  }
}
//--------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------//
