import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Link } from "react-navi";
import { Button, Form, Message, Segment } from "semantic-ui-react";
import {
  authService,
  LoginUserResponse,
} from "../../../controller/authService";
import styles from "./LoginComponent.module.less";

let LoginComponent: React.FC = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    console.log({ name, password });
    setIsLoading(true);
    const loginUserResponse = await authService.loginUser({ name, password });
    setIsLoading(false);
    setErrorMessage(loginUserResponse);
    if (
      loginUserResponse.status === "failed" ||
      !loginUserResponse.userWithToken
    )
      return;
    setButtonContent(
      "欢迎回来，" + loginUserResponse.userWithToken.name + "！"
    );
    setIsPositiveButton(true);
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  const [nameErrorMessage, setNameErrorMessage] = useState<null | string>(null);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<
    null | string
  >(null);
  const [otherErrorMessage, setOtherErrorMessage] = useState<null | string>(
    null
  );

  const setErrorMessage = (loginUserResponse: LoginUserResponse) => {
    if (loginUserResponse.name && loginUserResponse?.name.length) {
      setNameErrorMessage(loginUserResponse.name[0]);
    } else {
      setNameErrorMessage(null);
    }

    if (loginUserResponse.password && loginUserResponse.password.length) {
      setPasswordErrorMessage(loginUserResponse.password[0]);
    } else {
      setPasswordErrorMessage(null);
    }

    if (loginUserResponse.other && loginUserResponse.other.length) {
      setOtherErrorMessage(loginUserResponse.other[0]);
    } else {
      setOtherErrorMessage(null);
    }
  };

  const [isPositiveButton, setIsPositiveButton] = useState(false);
  const [buttonContent, setButtonContent] = useState("登录");
  return (
    <>
      <Segment stacked className={styles.loginSegment}>
        <Form size="large">
          <Form.Input
            fluid
            icon="user"
            iconPosition="left"
            placeholder="用户名"
            onChange={handleChangeName}
            error={nameErrorMessage}
            value={name}
          ></Form.Input>
          <Form.Input
            fluid
            icon="lock"
            type="password"
            iconPosition="left"
            placeholder="密码"
            onChange={handleChangePassword}
            error={passwordErrorMessage}
            value={password}
          ></Form.Input>

          <Button
            primary
            fluid
            onClick={handleSubmit}
            loading={isLoading}
            positive={isPositiveButton}
          >
            {buttonContent}
          </Button>
        </Form>
        {otherErrorMessage ? (
          <Message error header="网络异常" content="请重试或联系网站管理员" />
        ) : null}
      </Segment>

      <Message>
        没有账号？ <Link href={"/register"}>注册</Link>
      </Message>
    </>
  );
};

LoginComponent = observer(LoginComponent);

export default LoginComponent;
