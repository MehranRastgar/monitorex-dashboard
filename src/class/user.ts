import { GroupItemType, UserType } from 'src/types/types';

export default class User {
  OwnUser?: UserType;
  AllUsers: UserType[] = [];
  constructor(OwnUser?: UserType) {
    this.OwnUser = OwnUser ?? undefined;
  }
  setAllUsers(AllUsers: UserType[]) {
    this.AllUsers = AllUsers
  }
  async quertAdder(OwnUser: UserType) { }
  async queryRemover() { }

  async addNewGroup(NewGroup: GroupItemType) {
    // const userD = await JSON.parse(localStorage.getItem('user') ?? '');
    const arr: GroupItemType[] = [...(this.OwnUser?.groups ?? [])];
    arr.push(NewGroup);
    const user: UserType = { ...this.OwnUser, groups: [...arr] };
    return user;
  }
  async removeGroup(gpId: string) {
    if (this?.OwnUser?.groups !== undefined) {
      const user: UserType = {
        ...this.OwnUser,
        groups: [...this?.OwnUser?.groups.filter((obj) => obj._id !== gpId)],
      };
      return user;
    }
    return this.OwnUser;
  }
  async updateThisGroup(gpId: string, UpdatedGroup: GroupItemType) {
    if (this?.OwnUser?.groups !== undefined) {
      const user: UserType = {
        ...this.OwnUser,
        groups: [
          ...this?.OwnUser?.groups.map((obj) => {
            if (obj._id === gpId) {
              return { ...UpdatedGroup, _id: gpId };
            } else {
              return obj;
            }
          }),
        ],
      };
      return user;
    }
    return this.OwnUser;
  }
  getUserData(): UserType {
    let dev: UserType = {
      name: this.OwnUser?.name,
      family: this.OwnUser?.family,
      isAdmin: this.OwnUser?.isAdmin,
      groups: [...this.OwnUser?.groups ?? []],
      password: this.OwnUser?.password,
      nationalId: this.OwnUser?.nationalId,
      personalId: this.OwnUser?.personalId,
      username: this.OwnUser?.username,
      accessControll: {
        ...this.OwnUser?.accessControll ?? {
          devices: 'read',
          profile: 'read',
          reports: 'read',
          users: 'read'
        }
      },
      _id: this.OwnUser?._id

    }

    return dev;
  }
  getNewUser(): UserType {
    let dev: UserType = {
      name: '',
      family: '',
      isAdmin: false,
      groups: [...[]],
      password: '',
      nationalId: '',
      personalId: '',
      username: 'new-user',
      accessControll: {
        ...  {
          devices: 'read',
          profile: 'read',
          reports: 'read',
          users: 'read'
        }
      },
      // _id: this.OwnUser?._id

    }

    return dev;
  }

}
