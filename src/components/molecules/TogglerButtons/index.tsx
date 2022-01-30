import classNames from "classnames";

export interface ITogglerButtonsProps {
  wrapperClassName: string;
  className: string;
  ButtonTexts: string[];
  selectedButtonClass?: string;
  selectedButtonIndex: number | null;
  onButtonClick?: (index:number) => void;
}

export default function TogglerButtons(props: ITogglerButtonsProps) {
  const {
    wrapperClassName = "rd-collection-categories",
    className,
    ButtonTexts,
    selectedButtonClass,
    selectedButtonIndex,
    onButtonClick
  } = props;

  return (
    <div className={wrapperClassName}>
      {ButtonTexts.map((ButtonText, index) => (
        <div
          key={index}
          className={classNames(className, "rd-button-text", { selected: index === selectedButtonIndex })}
          onClick={()=>{if(onButtonClick) onButtonClick(index)}}
        >
          {ButtonText}
        </div>
      ))}

    </div>
  );
}
