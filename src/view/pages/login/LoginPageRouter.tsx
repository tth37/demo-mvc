import { map, redirect, route } from "navi";
import { authStore } from "../../../model/authStore";
import LoginPage from "./LoginPage";

export default map(() => {
  if (!authStore.userWithToken) return route({ view: <LoginPage /> });
  else return redirect("/");
});
