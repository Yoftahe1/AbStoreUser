import axiosInstance from "./main";
import Cookies from "js-cookie";

interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: number;
  location: string;
}

export function userSignUp(user: IUser) {
  return axiosInstance
    .post("/users/signup", user)
    .then((res: any) => res.data)
    .catch((error: any) => {
      throw error.response.data;
    });
}

interface ISignIn {
  email: string;
  password: string;
}

export function userSignIn(user: ISignIn) {
  return axiosInstance
    .post("/users/signin", user)
    .then((res: any) => res.data)
    .catch((error: any) => {
      throw error.response.data;
    });
}

interface IUserUpdate {
  firstName: string;
  lastName: string;
  phoneNumber: number;
  location: string;
  id: string;
}

export function userUpdate(userUpdate: IUserUpdate) {
  const token = Cookies.get("token");
  return axiosInstance
    .patch(`/users/${userUpdate.id}/update`, userUpdate, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res: any) => res.data)
    .catch((error: any) => {
      throw error.response.data;
    });
}

interface IUserChangePassword {
  id: string;
  password: string;
  confirmPassword: string;
}

export function userChangePassword(changePassword: IUserChangePassword) {
  const token = Cookies.get("token");
  return axiosInstance
    .patch(`/users/${changePassword.id}/changePassword`, changePassword, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res: any) => res.data)
    .catch((error: any) => {
      throw error.response.data;
    });
}

export function userDelete(id: string) {
  const token = Cookies.get("token");
  return axiosInstance
    .delete(`/users/${id}/delete`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res: any) => res.data)
    .catch((error: any) => {
      throw error.response.data;
    });
}

export function forgotPasswordUser(email: string) {
  return axiosInstance
    .patch(`/users/forgotPassword`, { email })
    .then((res: any) => res.data)
    .catch((error: any) => {
      throw error.response.data;
    });
}
