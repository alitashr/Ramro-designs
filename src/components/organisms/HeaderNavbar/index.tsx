import * as React from "react";
import { useWindowSize } from "react-use";
import Navbar from "../../molecules/Navbar";
import Icon from "../../atoms/Icon";
import { IconNames } from "../../atoms/Icon/icons";
import classNames from "classnames";

export interface IHeaderNavbarProps {}

export default function HeaderNavbar(props: IHeaderNavbarProps) {
  const size = useWindowSize();

  const [collapseNavbar, setCollapseNavbar] = React.useState(size.width > 1000 ? false : true);

  const handleHamburgerClick = () => {
    setCollapseNavbar(!collapseNavbar);
  };
  React.useEffect(() => {
    if (size.width > 1000) {
      setCollapseNavbar(false);
    }
  }, [size]);
  return (
    <header className="app-header">
      <Navbar className={classNames("rd-navbar", { hidden: collapseNavbar })} ></Navbar>
      {
        <div className="rd-hamburger-menu" onClick={handleHamburgerClick}>
          <Icon icon={IconNames.HAMBURGER_MENU} />
        </div>
      }
    </header>
  );
}
