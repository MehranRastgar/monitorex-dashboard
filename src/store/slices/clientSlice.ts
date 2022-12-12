import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addToCartApi,
  checkSignIn,
  fetchClient,
  PutUserApi,
  reduceFromCartApi,
  requestSms,
  signIn,
} from "../api/clientApi";

import type { AppState, AppThunk } from "../store";
// import { fetchCount } from './../counterAPI'
import type {
  AddToCartType,
  Cart,
  Client,
  OtpRequest,
  SignInCheck,
  SignInRequest,
  SignInResponse,
  SignUpRequest,
} from "../../types/types";
import { updateCartVariants } from "../api/orderApi";

// import axios, { AxiosResponse } from "axios";
// import { ActionsFromAsyncThunk } from "@reduxjs/toolkit/dist/matchers";

export interface ProductId {
  value: string;
}
export interface ClientState {
  value: Client;
  status: "logedIn" | "loading" | "403" | "401" | "unknownError" | "logout";
  token: "loading" | string;
  updateFlag:
    | "idle"
    | "request"
    | "success"
    | "pending"
    | "403"
    | "401"
    | "unknownError"
    | "faild";
  signInFlag:
    | "idle"
    | "request"
    | "loading"
    | "smsWaiting"
    | "smsCodeError"
    | "smsProviderError"
    | "smsNotSend"
    | "success"
    | "faild";

  cartFlag: "idle" | "loading" | "success" | "error";
}

const initialState: ClientState = {
  value: {},
  updateFlag: "idle",
  status: "loading",
  token: "loading",
  signInFlag: "idle",
  cartFlag: "idle",
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const signInAction = createAsyncThunk(
  "client/signIn",
  async (signInReq: SignInRequest) => {
    const response:
      | Client
      | {
          error: {
            errorCode: any;
          };
        } = await signIn(signInReq.usernamebyphone, signInReq.code);
    console.log("response thunk signInsignInsignIn", response);

    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const signInRequestAsync = createAsyncThunk(
  "client/requestSms",
  async (OtpReq: OtpRequest) => {
    const response:
      | any
      | {
          error: {
            errorCode: any;
          };
        } = await requestSms(OtpReq.usernamebyphone);
    // The value we return becomes the `fulfilled` action payload
    console.log("response thunk", response);
    return response;
  }
);

export const signInCheck = createAsyncThunk("client/checkSignIn", async () => {
  const response:
    | Client
    | {
        error: {
          errorCode: any;
        };
      } = await checkSignIn(
    String(localStorage?.getItem("user-id")),
    String(localStorage?.getItem("accessToken"))
  );
  console.log("response thunk", response);
  return response;
});

export const updateUserData = createAsyncThunk(
  "client/updateUserData",
  async (userInfo: Client) => {
    const response:
      | Client
      | {
          error: {
            errorCode: any;
          };
        } = await PutUserApi(
      String(localStorage?.getItem("accessToken")),
      userInfo
    );
    // console.log("response thunk", response);
    return response;
  }
);

//================================================================
export const updateVariantsCart = createAsyncThunk(
  "client/updateVariantsCart",
  async () => {
    const response:
      | Client
      | {
          error: {
            errorCode: any;
          };
        } = await updateCartVariants(
      String(localStorage?.getItem("accessToken")),
      String(localStorage?.getItem("user-id"))
    );
    return response;
  }
);

export const addToCart = createAsyncThunk(
  "client/addToCart",
  async (AddToCart: AddToCartType) => {
    const response:
      | Client
      | {
          error: {
            errorCode: any;
          };
        } = await addToCartApi(AddToCart);
    return response;
  }
);

export const reduecFromCart = createAsyncThunk(
  "client/reduceFromCart",
  async (reduceItem: AddToCartType) => {
    const response:
      | Client
      | {
          error: {
            errorCode: any;
          };
        } = await reduceFromCartApi(reduceItem);
    return response;
  }
);
//================================================================
export const clientSlice = createSlice({
  name: "client",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    signInRequest: (state, action: PayloadAction<OtpRequest>) => {
      state.signInFlag = "request";
      const getConfig = {
        headers: {
          "Cache-Control": "no-cache",
          "Content-Type": "application/json;charset=UTF-8",
          Accept: "*/*",
        },
      };
      const uri: string =
        "/api/sendotp" + `PhoneNumber=${action.payload.usernamebyphone}`;
      // const {data, status} = axios.get(uri, getConfig)
      // .then((Response: AxiosResponse) => {
      //   console.log("sms sended:", Response.data);
      //   if (Response.status < 300) state.signInFlag = "smsWaiting";
      // })
      // .catch((err) => {
      //   state.signInFlag = "smsProviderError";
      // });
    },
    removeProfile: (state) => {
      localStorage.removeItem("accessToken");
      state.value = {
        accessToken: undefined,
        cart: [],
        firstname: undefined,
        usernamebyphone: undefined,
      };
      state.token = "loading";
      state.status = "logout";
      state.signInFlag = "idle";
    },
    refreshToken: (state) => {},

    setMobileNumber: (state, action: PayloadAction<number>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value.usernamebyphone = action.payload;
    },

    // addToCart: (state, action: PayloadAction<ProductId>) => {
    //   const data: Cart[] | undefined = state?.value?.cart;
    //   console.log(action.payload.value);
    // },
    // decrement: (state) => {
    //   state.value -= 1
    // },
    // // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload
    // },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.

  extraReducers: (builder) => {
    builder
      .addCase(signInRequestAsync.pending, (state) => {
        state.signInFlag = "loading";
      })
      .addCase(signInRequestAsync.fulfilled, (state, action) => {
        state.signInFlag = "request";
      })
      .addCase(signInRequestAsync.rejected, (state, action) => {
        state.signInFlag = "smsProviderError";
      })
      .addCase(signInAction.pending, (state) => {
        state.signInFlag = "smsWaiting";
      })
      .addCase(
        signInAction.fulfilled,
        (state, action: PayloadAction<Client | any>) => {
          state.value = action.payload;
          if (state?.value?.accessToken !== undefined)
            localStorage.setItem("accessToken", state?.value?.accessToken);
          if (state?.value?.usernamebyphone !== undefined)
            localStorage.setItem(
              "usernamebyphone",
              String(state?.value?.usernamebyphone)
            );
          if (state?.value?._id !== undefined)
            localStorage.setItem("user-id", String(state?.value?._id));
          state.signInFlag = "success";
        }
      )
      .addCase(signInAction.rejected, (state, action) => {
        state.signInFlag = "smsCodeError";
      })
      .addCase(
        signInCheck.fulfilled,
        (state, action: PayloadAction<Client | any>) => {
          if (action?.payload?.usernamebyphone !== undefined) {
            state.value = action.payload;
            state.signInFlag = "success";
          } else {
            state.signInFlag = "faild";
          }
        }
      )
      .addCase(signInCheck.rejected, (state) => {
        state.signInFlag = "faild";
      })
      .addCase(signInCheck.pending, (state) => {
        state.signInFlag = "loading";
      })
      .addCase(addToCart.pending, (state) => {
        state.cartFlag = "loading";
      })
      .addCase(addToCart.rejected, (state) => {
        state.cartFlag = "error";
      })
      .addCase(
        addToCart.fulfilled,
        (state, action: PayloadAction<Client | any>) => {
          if (
            action?.payload?.error === undefined &&
            action?.payload?.usernamebyphone !== undefined
          ) {
            state.value = action.payload;
            state.cartFlag = "success";
          } else {
            state.cartFlag = "error";
          }
        }
      )
      .addCase(reduecFromCart.pending, (state) => {
        state.cartFlag = "loading";
      })
      .addCase(reduecFromCart.rejected, (state) => {
        state.cartFlag = "error";
      })
      .addCase(
        reduecFromCart.fulfilled,
        (state, action: PayloadAction<Client | any>) => {
          if (
            action?.payload?.error === undefined &&
            action?.payload?.usernamebyphone !== undefined
          ) {
            state.value = action.payload;
            state.cartFlag = "success";
          } else {
            state.cartFlag = "error";
          }
        }
      )
      .addCase(updateUserData.pending, (state) => {
        state.updateFlag = "pending";
      })
      .addCase(updateUserData.rejected, (state) => {
        state.updateFlag = "faild";
      })
      .addCase(
        updateUserData.fulfilled,
        (state, action: PayloadAction<Client | any>) => {
          if (
            action?.payload?.error === undefined &&
            action?.payload?.usernamebyphone !== undefined
          ) {
            state.value = action.payload;
            state.updateFlag = "success";
          } else {
            state.updateFlag = "faild";
          }
        }
      )
      .addCase(updateVariantsCart.pending, (state) => {
        state.updateFlag = "pending";
      })
      .addCase(updateVariantsCart.rejected, (state) => {
        state.updateFlag = "faild";
      })
      .addCase(
        updateVariantsCart.fulfilled,
        (state, action: PayloadAction<Client | any>) => {
          if (
            action?.payload?.error === undefined &&
            action?.payload?.usernamebyphone !== undefined
          ) {
            state.value = action.payload;
            state.updateFlag = "success";
          } else {
            state.updateFlag = "faild";
          }
        }
      );
  },
});

export const { signInRequest, setMobileNumber, removeProfile } =
  clientSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectMobileNumber = (state: AppState) =>
  state.client.value.usernamebyphone;
export const selectUserInfo = (state: AppState) => state.client.value;
export const selectToken = (state: AppState) => state.client.token;
export const selectUserInfoStatus = (state: AppState) => state.client.status;
export const selectSignInFlag = (state: AppState) => state.client.signInFlag;
export const selectCartFlag = (state: AppState) => state.client.cartFlag;
export const selectUserUpdateFlag = (state: AppState) =>
  state.client.updateFlag;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd =
//   (amount: number): AppThunk =>
//   (dispatch, getState) => {
//     const currentValue = selectCount(getState())
//     if (currentValue % 2 === 1) {
//       dispatch(incrementByAmount(amount))
//     }
//   }

export default clientSlice.reducer;
