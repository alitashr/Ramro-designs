import classNames from "classnames";
import { Link } from "react-router-dom";
import NavItem from "../../atoms/NavItem/index";

type NavBarProps = {
  className: string;
};
const Navbar = (props: NavBarProps) => {
  const { className } = props;
  return (
    <ul className={classNames("rd-menu", className)}>
      <NavItem text="Home" className="rd-navItem"></NavItem>
      <NavItem text="Elegant Collection" className="rd-navItem"></NavItem>
      <NavItem text="Signature Collection" className="rd-navItem"></NavItem>
      <Link to="/faq">
        <NavItem text="FAQ" className="rd-navItem"></NavItem>
      </Link>
      <Link to="/help">
        <NavItem text="Help" className="rd-navItem"></NavItem>
      </Link>
      <Link to="/about">
        <NavItem text="About us" className="rd-navItem"></NavItem>
      </Link>
    </ul>
  );
};

export default Navbar;
