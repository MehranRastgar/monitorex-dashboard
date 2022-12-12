import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { AddToCartType, Cart, Client, Order } from "../../../src/types/types";
import { variantId } from "../slices/orderSlice";

export type updatedPrice = {
  variantId: string;
  rrp_price: number;
  selling_price: number;
};

export async function getOrderByIdApi(
  orderId: string,
  token: string,
  userId: string
): Promise<Order | { error: { errorCode: any } }> {
  // let clientid = localStorage.getItem("clientId");
  // console.log(clientid);
  try {
    const axiosConf: AxiosRequestConfig = {
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
      orderId: orderId,
    };
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/order/fid/` +
        `${userId}?orderid=${orderId}`,
      axiosConf
    );
    const result: Order = response.data;
    return result;
  } catch (err: any | AxiosError) {
    {
      return { error: { errorCode: err } };
    }
  }
}

export async function getOrdersApi(
  perpage: number,
  page: number,
  token: string,
  userId: string
): Promise<Order[] | { error: { errorCode: any } }> {
  // let clientid = localStorage.getItem("clientId");
  // console.log(clientid);
  try {
    const axiosConf: AxiosRequestConfig = {
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
      perpage: perpage,
      page: page,
    };
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/order/findclientorders/` +
        `${userId}?perpage=${perpage}&page=${page}`,

      axiosConf
    );
    const result: Order[] = response.data;
    return result;
  } catch (err: any | AxiosError) {
    {
      return { error: { errorCode: err } };
    }
  }
}

export async function getCartPrices(
  variantIds: variantId[],
  token: string,
  userId: string
): Promise<UpdatePriceRespons[] | { error: { errorCode: any } }> {
  // let clientid = localStorage.getItem("clientId");
  // console.log(clientid);
  try {
    const axiosConf: AxiosRequestConfig = {
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
      variantIds: variantIds,
    };
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/order/updateprices/` +
        `${userId}`,
      body,
      axiosConf
    );
    const result: UpdatePriceRespons[] = response.data;
    return result;
  } catch (err: any | AxiosError) {
    {
      return { error: { errorCode: err } };
    }
  }
}

export async function updateCartVariants(
  token: string,
  userId: string
): Promise<Client | { error: { errorCode: any } }> {
  // let clientid = localStorage.getItem("clientId");
  // console.log(clientid);
  try {
    const axiosConf: AxiosRequestConfig = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
        "Cache-Control": "no-cache",
        "Content-Type": "application/json;charset=UTF-8",
        Accept: "*/*",
        token: token,
      },
    };
    const body: any = {};
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/order/updatepricesincart/` +
        `${userId}`,
      body,
      axiosConf
    );
    const result: Client = response.data;
    result.accessToken = token;
    return result;
  } catch (err: any | AxiosError) {
    {
      return { error: { errorCode: err } };
    }
  }
}

export interface UpdatePriceRespons {
  price?: Price;
  _id?: string;
}

export interface Price {
  selling_price?: number;
  rrp_price?: number;
}
