import { action, makeObservable, observable } from "mobx";
import { UserEntity, UserEntityWithToken } from "../common/entities/userEntity";

class AuthStore {
  constructor() {
    makeObservable(this);
  }

  @observable
  userWithToken: UserEntityWithToken | null;

  @action
  setUserWithToken(userWithToken: UserEntityWithToken) {
    this.userWithToken = userWithToken;
    const str = JSON.stringify(userWithToken);
    localStorage.setItem("user", str);
  }

  @action
  setUserWithTokenFromLocalStorage() {
    const str = localStorage.getItem("user");
    if (str) {
      const userWithToken = JSON.parse(str) as UserEntityWithToken;
      this.userWithToken = userWithToken;
    } else {
      this.userWithToken = null;
    }
  }

  @action
  delUserWithToken() {
    this.userWithToken = null;
    localStorage.removeItem("user");
  }
}

export const authStore = new AuthStore();
