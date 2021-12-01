import classNames from "classnames";

import "./index.css";

type ButtonProps = {
  disabled?: boolean;
  className: string;
  dataTestid?: string;
  children: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
};

export const Button = (props: ButtonProps) => {
  const {
    children,
    className,
    dataTestid,
    disabled,
    type = "button",
    onClick,
  } = props;
  return (
    <button
      className={classNames("button", className)}
      disabled={disabled}
      type={type}
      data-testid={dataTestid}
      onClick={onClick}>
      {children}
    </button>
  );
};
