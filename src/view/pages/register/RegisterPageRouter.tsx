import { map, redirect, route } from "navi";
import { authStore } from "../../../model/authStore";
import RegisterPage from "./RegisterPage";

export default map(() => {
  if (!authStore.userWithToken) return route({ view: <RegisterPage /> });
  else return redirect("/");
});
