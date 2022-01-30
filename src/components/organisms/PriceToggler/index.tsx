import * as React from "react";
import TogglerButtons from "../../molecules/TogglerButtons";

interface IPriceTogglerProps {
  onPriceToggle?: (buttonText: string) => void;
}

const PriceToggler: React.FunctionComponent<IPriceTogglerProps> = (props) => {
  const { onPriceToggle } = props;
  const ButtonTexts = ["20", "40", "50", "80", "All"];
  const [selectedButtonIndex, setSelectedButtonIndex] = React.useState(4);

  return (
    <TogglerButtons
      wrapperClassName="rd-collection-categories"
      className="rd-categories"
      ButtonTexts={ButtonTexts}
      selectedButtonClass="selected"
      selectedButtonIndex={selectedButtonIndex}
      onButtonClick={(index) => {
        setSelectedButtonIndex(index);
        if (onPriceToggle) onPriceToggle(ButtonTexts[index]);
      }}
    />
    
  );
};

export default PriceToggler;
