import { GroupItemType, UserType } from 'src/types/types';

export default class User {
  OwnUser: UserType;

  constructor(OwnUser: UserType) {
    this.OwnUser = OwnUser;
  }

  async quertAdder(OwnUser: UserType) {}
  async queryRemover() {}

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
}
