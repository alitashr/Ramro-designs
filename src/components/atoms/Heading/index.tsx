import classNames from "classnames";
import * as React from "react";

export interface IHeadingProps {
  children ?: React.ReactNode
  className?: string;
  main?: boolean;
}

export default function Heading(props: IHeadingProps) {
  const { className, main = false, children } = props;
  return <span className={classNames("rd-heading", { "main-heading": main }, className)}>{children}</span>;
}
