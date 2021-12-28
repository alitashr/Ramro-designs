import classNames from "classnames";
import * as React from "react";

export interface ITogglerButtonsProps {
  wrapperClassName: string;
  className: string;
  ButtonTexts: string[];
  selectedButtonClass?: string;
  selectedButtonIndex: number | null;
}

export default function TogglerButtons(props: ITogglerButtonsProps) {
  const {
    wrapperClassName = "rd-collection-categories",
    className,
    ButtonTexts,
    selectedButtonClass,
    selectedButtonIndex,
  } = props;

  return (
    <div className={wrapperClassName}>
      {ButtonTexts.map((ButtonText, index) => (
        <div
          key={index}
          className={classNames(className, "rd-button-text", { selected: index === selectedButtonIndex })}
        >
          {ButtonText}
        </div>
      ))}

    </div>
  );
}
