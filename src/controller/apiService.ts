import axios from "axios";
import { authStore } from "../model/authStore";

export interface ResponseType<T> {
  status:
    | "success"
    | "notfound"
    | "badrequest"
    | "unauthorized"
    | "forbidden"
    | "unknown";
  errorMessage?: string;
  responseData?: T;
}

export interface RequestType<T> {
  method: "get" | "post" | "patch";
  path: string;
  params: any;
  data: T;
}

async function request<RequestDataType, ResponseDataType>(
  req: RequestType<RequestDataType>
): Promise<ResponseType<ResponseDataType>> {
  let res;
  try {
    res = await axios("https://test.tth37.xyz/api" + req.path, {
      params: req.params,
      method: req.method,
      data: req.data,
      headers: {
        authorization: authStore.userWithToken
          ? `Bearer ${authStore.userWithToken.token}`
          : "",
      },
      validateStatus: () => true,
    });
  } catch (e: any) {
    console.error(e);
    return {
      status: "unknown",
      errorMessage: "network error",
    };
  }

  switch (res.status) {
    case 200:
    case 201:
      return {
        status: "success",
        responseData: res.data,
      };

    case 404:
      return {
        status: "notfound",
        errorMessage: res.data.message,
      };

    case 401:
      return {
        status: "unauthorized",
        errorMessage: res.data.message,
      };
    case 400:
      return {
        status: "badrequest",
        errorMessage: res.data.message,
      };

    case 403:
      return {
        status: "forbidden",
        errorMessage: res.data.message,
      };

    default:
      return {
        status: "unknown",
        errorMessage: res.data.message,
      };
  }
}

export function createGetRequest<ResponseDataType>(path: string) {
  return (params?: any) => {
    return request<null, ResponseDataType>({
      method: "get",
      path,
      params,
      data: null,
    });
  };
}

export function createPostRequest<RequestDataType, ResponseDataType>(
  path: string
) {
  return (data: RequestDataType, params?: any) => {
    return request<RequestDataType, ResponseDataType>({
      method: "post",
      path,
      params,
      data,
    });
  };
}
