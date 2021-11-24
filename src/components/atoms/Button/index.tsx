import React from "react";
import classNames from "classnames";
import Icon from "../Icon";
import { IconSvgPaths } from "../Icon/icons";

export interface IButtonProps {
  intent ?:string,
    icon ?:keyof typeof IconSvgPaths,
    children ?: React.ReactNode,
    className ?:string,
    onClick ?:(event: React.MouseEvent<HTMLButtonElement>)=> void,
    styles ?: React.CSSProperties,
    tertiary ?: boolean,
    disabled ?: boolean,
    text ?:string,
    small ?:boolean,
    large ?:boolean,
    minimal ?:boolean,
    type ?:any,
    active ?:boolean,
}

export const Button = (props : IButtonProps) => {
  const {
    intent,
    icon,
    children,
    className,
    onClick,
    tertiary,
    disabled,
    text,
    small,
    large,
    minimal,
    type,
    active,
    ...otherProps
  } = props;
  const btnClassNames = () =>
    classNames(
      "at-button",
      {
        [`at-intent-${intent}`]: intent,
        "at-minimal": minimal,
        "at-disabled": disabled,
        "at-tertiary": tertiary,
        "at-small": small,
        "at-large": large,
        "at-active": active,
      },
      className
    );
  const textClassName = "at-button-text";
  return (
    <button
      type={type}
      disabled={disabled}
      className={btnClassNames()}
      onClick={onClick}
      {...otherProps}
    >
      {icon && <Icon icon={icon} />}
      {text &&
        (small ? (
          <p className={textClassName}>{text}</p>
        ) : large ? (
          <h5 className={textClassName}>{text}</h5>
        ) : (
          <h6 className={textClassName}>{text}</h6>
        ))}
      {children}
    </button>
  );
};

Button.defaultProps = {
  className: "",
  intent: null,
  tertiary: false,
  disabled: false,
  minimal: false,
  small: false,
  large: false,
};
