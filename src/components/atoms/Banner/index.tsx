import classNames from 'classnames';
export interface IBannerProps {
  children ?: React.ReactNode,
  className ?: string,
  backgroundUrl : string
}

export default function Banner (props: IBannerProps) {
  const { children, className, backgroundUrl } = props;
  return (
    <div className={classNames(className, "rd-banner")}
    style={{
      backgroundImage: backgroundUrl,
    }}
  >
    {children}
      
    </div>
  );
}
