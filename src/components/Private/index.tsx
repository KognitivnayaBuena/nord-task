import { useState, FormEvent, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";

import { LoginForm } from "../LoginForm";
import { loginUser } from "../../redux/user/actions";
import { userTokenSelector } from "../../redux/user/selectors";

type PrivateProps = {
  children: JSX.Element;
  loginUserTest?: () => void;
};

export const Private = ({ children, loginUserTest }: PrivateProps) => {
  const dispatch = useDispatch();
  const isLoggedIn = Boolean(useSelector(userTokenSelector));

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const usernameOnChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const passwordOnChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onSubmitHandler = (event: FormEvent) => {
    event.preventDefault();

    if (loginUserTest) {
      loginUserTest();
    } else {
      dispatch(loginUser({ username, password }));
    }
  };

  return (
    <>
      {!isLoggedIn && (
        <LoginForm
          username={username}
          password={password}
          onSubmitHandler={onSubmitHandler}
          usernameOnChangeHandler={usernameOnChangeHandler}
          passwordOnChangeHandler={passwordOnChangeHandler}
        />
      )}
      {isLoggedIn && children}
    </>
  );
};
