export class UserEntity {
  id: number;
  name: string;
}

export class UserEntityWithToken extends UserEntity {
  token: string;
}
