import { observer } from "mobx-react-lite";
import React from "react";
import { Grid, Header } from "semantic-ui-react";
import LoginComponent from "../../components/login/LoginComponent";
import LayoutCenter from "../../layout/center/LayoutCenter";

import styles from "./LoginPage.module.less";

let LoginPage: React.FC = () => {
  return (
    <>
      <LayoutCenter maxWidth="450px">
        <LoginComponent />
      </LayoutCenter>
    </>
  );
};

LoginPage = observer(LoginPage);

export default LoginPage;
