import classNames from "classnames";

import "./index.css";

type ErrorProps = {
  className?: string;
  dataTestid?: string;
  children: string;
};

export const Error = ({ children, className, dataTestid }: ErrorProps) => {
  return (
    <span
      className={classNames("error-wrapper", className)}
      data-tesid={dataTestid}>
      {children}
    </span>
  );
};
