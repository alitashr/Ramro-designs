
import classNames from "classnames";
import { IconSvgPaths } from "./icons";

type IiconProps = {
  icon: keyof typeof IconSvgPaths,
  className ?: string,
  color ?: string,
}
const Icon = (props: IiconProps)=>{
  const { icon: iconName, className, color, ...otherprops } = props;
  const pathStrings = IconSvgPaths[iconName];
  const paths = pathStrings && pathStrings.map((d, i) => <path fillRule="evenodd" clipRule="evenodd" key={i} d={d} />);
  if (!iconName) return null;
  return (
    <span {...otherprops} className={classNames("at-icon", className)} style={{ color: color }}>
      <svg viewBox="0 0 24 24" fill="currentColor">
        {paths}
      </svg>
    </span>
  );
}

export default Icon;