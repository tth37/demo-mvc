import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Link, useNavigation } from "react-navi";
import { Button, Form, Header, Message, Segment } from "semantic-ui-react";
import {
  authService,
  LoginUserResponse,
  RegisterUserResponse,
} from "../../../controller/authService";
import styles from "./RegisterComponent.module.less";

let RegisterComponent: React.FC = () => {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleChangeConfirmPassword = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    console.log({ name, password });
    setIsLoading(true);
    const registerUserResponse = await authService.registerUser({
      name,
      password,
      confirmPassword,
    });
    setIsLoading(false);
    setErrorMessage(registerUserResponse);
    if (registerUserResponse.status !== "success") return;
    setIsPositiveButton(true);
    setButtonContent("注册成功");
    setTimeout(() => {
      navigation.navigate("/login");
    }, 1500);
  };

  const [nameErrorMessage, setNameErrorMessage] = useState<null | string>(null);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<
    null | string
  >(null);
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] =
    useState<null | string>(null);
  const [otherErrorMessage, setOtherErrorMessage] = useState<null | string>(
    null
  );

  const setErrorMessage = (registerUserResponse: RegisterUserResponse) => {
    if (registerUserResponse.name && registerUserResponse?.name.length) {
      setNameErrorMessage(registerUserResponse.name[0]);
    } else {
      setNameErrorMessage(null);
    }

    if (registerUserResponse.password && registerUserResponse.password.length) {
      setPasswordErrorMessage(registerUserResponse.password[0]);
    } else {
      setPasswordErrorMessage(null);
    }

    if (
      registerUserResponse.confirmPassword &&
      registerUserResponse.confirmPassword.length
    ) {
      setConfirmPasswordErrorMessage(registerUserResponse.confirmPassword[0]);
    } else {
      setConfirmPasswordErrorMessage(null);
    }

    if (registerUserResponse.other && registerUserResponse.other.length) {
      setOtherErrorMessage(registerUserResponse.other[0]);
    } else {
      setOtherErrorMessage(null);
    }
  };

  const [isPositiveButton, setIsPositiveButton] = useState(false);
  const [buttonContent, setButtonContent] = useState("注册");
  return (
    <>
      <Segment stacked className={styles.registerSegment}>
        <Form size="large">
          <Form.Input
            fluid
            icon="user"
            iconPosition="left"
            placeholder="用户名"
            label="用户名"
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
            label="密码"
            onChange={handleChangePassword}
            error={passwordErrorMessage}
            value={password}
          ></Form.Input>
          <Form.Input
            fluid
            icon="lock"
            type="password"
            iconPosition="left"
            placeholder="确认密码"
            label="确认密码"
            onChange={handleChangeConfirmPassword}
            error={confirmPasswordErrorMessage}
            value={confirmPassword}
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
          <Message error header="网络异常" content={otherErrorMessage} />
        ) : null}
      </Segment>
      <Message>
        已有账号？ <Link href={"/login"}>登录</Link>
      </Message>
    </>
  );
};

RegisterComponent = observer(RegisterComponent);

export default RegisterComponent;
