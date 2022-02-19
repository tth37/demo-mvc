import { observer } from "mobx-react-lite";
import { authStore } from "./model/authStore";
import { Helmet } from "react-helmet";
import { lazy, mount, route } from "navi";
import { Router, View } from "react-navi";
import HomePage from "./view/pages/home/HomePage";
import { Suspense } from "react";

const routes = mount({
  "/": route({ view: <HomePage /> }),
  "/login": lazy(() => import("./view/pages/login/LoginPageRouter")),
  "/register": lazy(() => import("./view/pages/register/RegisterPageRouter")),
  //  "/": route({ view: <HomePage /> }),
});

const App: React.FC = () => {
  // AuthStore initialization
  authStore.setUserWithTokenFromLocalStorage();

  return (
    <>
      <Helmet>
        <title>Demo MVC</title>
      </Helmet>
      <Router routes={routes}>
        <Suspense fallback={null}>
          <View />
        </Suspense>
      </Router>
    </>
  );
};

export default observer(App);
