import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GroupItemType, SignInRequest, UserType } from '../../types/types';
import {
  checkSignIn,
  CreateUserApi,
  PatchUserApi,
  signIn,
  UpdateGroupApi,
} from '../api/userApi';
import type { AppState, AppThunk } from '../store';
export interface UserState {
  ownUser: UserType;
  selectedUser: UserType;
  status: UserSignInStatus;
  users: UserType[];
  token: 'initial' | string;
  updateFlag: ApiFlag;
  signInFlag: ApiFlag;
  selectedGroup?: number;
}

export type UserSignInStatus =
  | 'initial'
  | 'logedIn'
  | 'loading'
  | '403'
  | '401'
  | 'unknownError'
  | 'logout';
export type ApiFlag =
  | 'initial'
  | 'loading'
  | 'request'
  | 'success'
  | 'pending'
  | '403'
  | '401'
  | 'unknownError'
  | 'faild';

const initialState: UserState = {
  selectedUser: {},
  ownUser: {},
  users: [],
  status: 'initial',
  signInFlag: 'initial',
  token: 'initial',
  updateFlag: 'initial',
};

//--------------------------------------------------------------------------------//
export const signInAction = createAsyncThunk(
  'user/signIn',
  async (signInReq: SignInRequest) => {
    const response:
      | UserType
      | {
          error: {
            errorCode: any;
          };
        } = await signIn(signInReq.userName, signInReq.password);
    ////console.log("response thunk signInsignInsignIn", response);
    // The value we return becomes the `fulfilled` action payload
    return response;
  },
);
//--------------------------------------------------------------------------------//
export const signInCheck = createAsyncThunk('user/checkSignIn', async () => {
  const response:
    | UserType
    | {
        error: {
          errorCode: any;
        };
      } = await checkSignIn(String(localStorage?.getItem('access_token')));
  ////console.log("response thunk", response);
  return response;
});
//--------------------------------------------------------------------------------//
export const updateUserData = createAsyncThunk(
  'user/updateUserData',
  async (userInfo: UserType) => {
    const response:
      | UserType
      | {
          error: {
            errorCode: any;
          };
        } = await PatchUserApi(
      String(localStorage?.getItem('access_token')),
      userInfo,
    );
    return response;
  },
);
//--------------------------------------------------------------------------------//
export const createUser = createAsyncThunk(
  'user/createUser',
  async (userInfo: UserType) => {
    const response:
      | UserType
      | {
          error: {
            errorCode: any;
          };
        } = await CreateUserApi(
      String(localStorage?.getItem('access_token')),
      userInfo,
    );
    return response;
  },
);
//--------------------------------------------------------------------------------//
// export const updateUserGroup = createAsyncThunk(
//   "user/updateUserGroup",
//   async (userInfo: GroupItemType) => {
//     const response:
//       | GroupItemType
//       | {
//           error: {
//             errorCode: any;
//           };
//         } = await UpdateGroupApi(
//       String(localStorage?.getItem("access_token")),
//       userInfo
//     );
//     return response;
//   }
// );
//--------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------//
export const userSlice = createSlice({
  name: 'user',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setSignInFlag: (state, action: PayloadAction<UserSignInStatus>) => {
      state.status = action.payload;
    },
    refreshToken: (state) => {},
    setUsersData: (state, action: PayloadAction<UserType>) => {
      state.ownUser = action.payload;
    },
    setAllUsersData: (state, action: PayloadAction<UserType[]>) => {
      state.users = action.payload;
    },
    setSelectedUser: (state, action: PayloadAction<UserType>) => {
      state.selectedUser = action.payload;
    },
    addGroupToUserData: (state, action: PayloadAction<GroupItemType>) => {
      const arr: GroupItemType[] = state.ownUser?.groups ?? [];
      arr.push(action.payload);
      const user: UserType = { ...state.ownUser, groups: [...arr] };
      state.ownUser = user;
    },

    removeGroupFromUserData: (state, action: PayloadAction<string>) => {
      const gpId = action.payload;
    },

    updateGroupInUserData: (state, action: PayloadAction<GroupItemType>) => {
      state.selectedUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInAction.pending, (state) => {
        state.signInFlag = 'loading';
      })
      .addCase(
        signInAction.fulfilled,
        (state, action: PayloadAction<UserType | any>) => {
          state.ownUser = action.payload.user;
          state.token = action.payload.access_token;
          if (state?.token !== undefined) {
            localStorage.setItem('access_token', state?.token);
            state.signInFlag = 'success';
            localStorage.setItem('user', JSON.stringify(state?.ownUser));
          } else {
            state.signInFlag = 'faild';
          }
        },
      )
      .addCase(signInAction.rejected, (state, action) => {
        state.signInFlag = 'faild';
      })
      .addCase(
        signInCheck.fulfilled,
        (state, action: PayloadAction<UserType | any>) => {
          state.ownUser = action.payload.user;
          state.token = action.payload.access_token;
          if (state?.token !== undefined) {
            localStorage.setItem('access_token', state?.token);
            state.signInFlag = 'success';
            localStorage.setItem('user', JSON.stringify(state?.ownUser));
          } else {
            state.signInFlag = 'faild';
          }
        },
      )
      .addCase(signInCheck.rejected, (state) => {
        state.signInFlag = 'faild';
      })
      .addCase(signInCheck.pending, (state) => {
        state.signInFlag = 'loading';
      })
      .addCase(updateUserData.pending, (state) => {
        state.updateFlag = 'pending';
      })
      .addCase(updateUserData.rejected, (state) => {
        state.updateFlag = 'faild';
      })
      .addCase(
        updateUserData.fulfilled,
        (state, action: PayloadAction<UserType | any>) => {
          // state.ownUser = action.payload.user;
          // state.token = action.payload.access_token;
          if (state?.token !== undefined) {
            // localStorage.setItem("access_token", state?.token);
            state.signInFlag = 'success';
            state.updateFlag = 'success';
            // localStorage.setItem("user", JSON.stringify(state?.ownUser));
            state.selectedUser = action.payload.user;
            state.ownUser = action.payload.user;
          } else {
            state.signInFlag = 'faild';
          }
        },
      )
      .addCase(createUser.pending, (state) => {
        state.updateFlag = 'pending';
      })
      .addCase(createUser.rejected, (state) => {
        state.updateFlag = 'faild';
      })
      .addCase(
        createUser.fulfilled,
        (state, action: PayloadAction<UserType | any>) => {
          // state.ownUser = action.payload.user;
          // state.token = action.payload.access_token;
          if (state?.token !== undefined) {
            // localStorage.setItem("access_token", state?.token);
            state.signInFlag = 'success';
            state.updateFlag = 'success';
            // localStorage.setItem("user", JSON.stringify(state?.ownUser));
            state.selectedUser = action.payload.user;
          } else {
            state.signInFlag = 'faild';
          }
        },
      );
  },
});

export const {
  setUsersData,
  setSignInFlag,
  setAllUsersData,
  setSelectedUser,
  addGroupToUserData,
} = userSlice.actions;
export const selectOwnUser = (state: AppState) => state.user.ownUser;
export const selectAllUsersData = (state: AppState) => state.user.users;
export const selectSelectedUser = (state: AppState) =>
  state.user?.selectedUser ?? {};
export const selectSignInFlag = (state: AppState) => state.user.signInFlag;
export const selectUpdateFlag = (state: AppState) => state.user.updateFlag;
export const selectUserGroups = (state: AppState) =>
  state.user?.ownUser?.groups;

export default userSlice.reducer;
