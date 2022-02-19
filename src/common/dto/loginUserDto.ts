export class LoginUserDto {
  name: string;
  password: string;
}

export class CreateUserDto extends LoginUserDto {}
