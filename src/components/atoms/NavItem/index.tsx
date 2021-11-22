import classNames from "classnames";

type NavItemProps = {
  text: string;
  children?: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  icon?: string;
  className?: string;
  onClick?: Function;
};

const MENU_ITEM = "at-menu-item";
const NavItem = (props: NavItemProps) => {
  const { children, active, disabled, className, text, onClick } = props;
  const hasSubmenu = !!children;

  const anchorClasses: string = classNames(
    MENU_ITEM,
    {
      [`${MENU_ITEM}--active`]: active,
      [`${MENU_ITEM}--disabled`]: disabled,
    },
    className
  );
  const target = (
    <button className={anchorClasses} onClick={(e: any) => !disabled && onClick && onClick(e)}>
      <span>{text}</span>
    </button>
  );
  return <li>{!hasSubmenu && target}</li>;
};

export default NavItem;