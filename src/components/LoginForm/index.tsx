import { FormEvent, ChangeEvent } from "react";
import { useSelector } from "react-redux";

import { Button } from "../Button";
import { Error } from "../Error";
import {
  userErrorMessageSelector,
  userStatusSelector,
} from "../../redux/user/selectors";
import { Statuses } from "../../redux/types";

import "./index.css";

type LoginFormProps = {
  username: string;
  password: string;
  onSubmitHandler: (event: FormEvent) => void;
  usernameOnChangeHandler?: (event: ChangeEvent<HTMLInputElement>) => void;
  passwordOnChangeHandler?: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const LoginForm = ({
  username,
  password,
  onSubmitHandler,
  usernameOnChangeHandler,
  passwordOnChangeHandler,
}: LoginFormProps) => {
  const status = useSelector(userStatusSelector);
  const errorMessage = useSelector(userErrorMessageSelector);

  const isDisableButton =
    (!password || !username) && status !== Statuses.Loading;
  const isError = status === Statuses.Error;

  return (
    <form
      className={"login-form"}
      data-testid={"LoginForm:form"}
      onSubmit={onSubmitHandler}>
      <h2>Log In</h2>
      {isError && errorMessage && (
        <Error
          className={"login-form__error"}
          dataTestid={"LoginForm:block:error"}>
          {errorMessage}
        </Error>
      )}
      <label
        className={"login-form__username-label"}
        htmlFor={"login-form__username-input"}>
        Login
      </label>
      <input
        className={"login-form__username-input"}
        id={"login-form__username-input"}
        value={username}
        type={"text"}
        data-testid={"LoginForm:input:username"}
        required
        onChange={usernameOnChangeHandler}
      />
      <label
        className={"login-form__password-label"}
        htmlFor={"login-form__password-input"}>
        Password
      </label>
      <input
        className={"login-form__password-input"}
        id={"login-form__password-input"}
        value={password}
        type={"password"}
        data-testid={"LoginForm:input:password"}
        required
        onChange={passwordOnChangeHandler}
      />
      <Button
        className={"login-form__submit-button"}
        disabled={isDisableButton}
        type={"submit"}
        dataTestid={"LoginForm:button:submit"}>
        Log In
      </Button>
    </form>
  );
};
