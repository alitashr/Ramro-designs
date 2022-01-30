import * as React from "react";
import TogglerButtons from "../../molecules/TogglerButtons";

interface ICategoriesTogglerProps {
  onCategoriesToggle?: (buttonText: string) => void;
}

const CategoriesToggler: React.FunctionComponent<ICategoriesTogglerProps> = (props) => {
  const { onCategoriesToggle } = props;
  const ButtonTexts = ["All", "Seamless", "Bundles"];
  const [selectedButtonIndex, setSelectedButtonIndex] = React.useState(0);

  return (
    <TogglerButtons
      wrapperClassName="rd-collection-categories"
      className="rd-categories"
      ButtonTexts={ButtonTexts}
      selectedButtonClass="selected"
      selectedButtonIndex={selectedButtonIndex}
      onButtonClick={(index) => {
        setSelectedButtonIndex(index);
        if (onCategoriesToggle) onCategoriesToggle(ButtonTexts[index]);
      }}
    />
  );
};

export default CategoriesToggler;
