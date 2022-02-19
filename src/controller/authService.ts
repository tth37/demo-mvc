import { CreateUserDto, LoginUserDto } from "../common/dto/loginUserDto";
import { createPostRequest } from "./apiService";
import { UserEntityWithToken } from "../common/entities/userEntity";
import { authStore } from "../model/authStore";

export class LoginUserResponse {
  status: "success" | "failed";
  name?: string[];
  password?: string[];
  other?: string[];
  userWithToken?: UserEntityWithToken;
}

export class LogoutUserResponse {
  status: "success" | "failed";
}

export class RegisterUserDto extends LoginUserDto {
  confirmPassword: string;
}

export class RegisterUserResponse {
  status: "success" | "failed";
  name?: string[];
  password?: string[];
  confirmPassword?: string[];
  other?: string[];
}

const fetchLoginUser = createPostRequest<LoginUserDto, UserEntityWithToken>(
  "/auth/loginUser"
);

const fetchCreateUser = createPostRequest<CreateUserDto, any>("/user");

class AuthService {
  async loginUser(loginUserDto: LoginUserDto): Promise<LoginUserResponse> {
    // validate emptiness
    if (!loginUserDto.name.length)
      return { status: "failed", name: ["请输入用户名"] };

    if (!loginUserDto.password.length)
      return { status: "failed", password: ["请输入密码"] };

    // validate correctness
    const res = await fetchLoginUser(loginUserDto);
    if (res.status !== "success" || !res.responseData) {
      if (res.status === "notfound")
        return { status: "failed", name: ["用户不存在"] };
      else if (res.status === "forbidden")
        return { status: "failed", password: ["用户名或密码错误"] };
      else return { status: "failed", other: ["请重试或联系网站管理员"] };
    }

    // save current user information
    const userWithToken = res.responseData;
    authStore.setUserWithToken(userWithToken);
    return { status: "success", userWithToken };
  }

  logoutUser(): LogoutUserResponse {
    if (!authStore.userWithToken) {
      return { status: "failed" };
    }
    authStore.delUserWithToken();
    return { status: "success" };
  }

  async registerUser(
    registerUserDto: RegisterUserDto
  ): Promise<RegisterUserResponse> {
    // validate emptiness
    if (!registerUserDto.name.length)
      return { status: "failed", name: ["请输入用户名"] };

    if (registerUserDto.name.length < 4)
      return { status: "failed", name: ["用户名过短"] };

    if (registerUserDto.name.length > 8)
      return { status: "failed", name: ["用户名过长"] };

    if (!registerUserDto.password.length)
      return { status: "failed", password: ["请输入密码"] };

    if (registerUserDto.password.length < 8)
      return { status: "failed", password: ["密码过短"] };

    if (registerUserDto.password.length > 20)
      return { status: "failed", password: ["密码过长"] };

    if (registerUserDto.password !== registerUserDto.confirmPassword)
      return { status: "failed", confirmPassword: ["密码不一致"] };

    const { confirmPassword, ...createUserDto } = registerUserDto;

    const res = await fetchCreateUser(createUserDto);
    if (res.status !== "success" || !res.responseData) {
      return { status: "failed", other: ["请重试或联系网站管理员"] };
    }

    return { status: "success" };
  }
}

export const authService = new AuthService();
