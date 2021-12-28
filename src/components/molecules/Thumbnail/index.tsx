import classNames from "classnames";
import * as React from "react";
import { getPriceFromPath } from "../../../utils/stringUtils";

interface thumbType {
  thumbUrl?: string | undefined; 
  name?: string;
}
export interface IThumbnailProps {
  className ?: string;
  thumb ?: thumbType | any;
  onThumbnailClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  imageRotated ?: boolean;
  aspect ?: string;
  showTitle?: boolean;
  showPrice ?:boolean;
  fitwidth?: boolean;
  active?: boolean;
  showAsBg?: boolean;
  price?:Number | string
}

export default function Thumbnail(props: IThumbnailProps) {
  const {
    className,
    thumb,
    onThumbnailClick,
    imageRotated,
    aspect = "portrait",
    showTitle = false,
    showPrice = false,
    fitwidth = true,
    active,
    showAsBg = false,
    price
  } = props;
  const { thumbUrl, name, fullPath } = thumb;
  //console.log("Thumbnail -> thumb", thumb)
  const [isHovering, setIsHovering] = React.useState(false);
  const [isloading, setIsloading] = React.useState(true);
  const thumbImg = React.useRef<HTMLImageElement>(null);
  const ref = React.useRef(null);

  React.useEffect(() => {
    //console.log("useEffect -> thumbUrl", thumbUrl)

    setIsloading(true);
    if (!thumbUrl) return;
    const image = new Image();
    image.src = thumbUrl;
    image.onload = () => {
      try {
        if(thumbImg && thumbImg.current){
          thumbImg.current.src = image.src;
        }      
      } catch (error) {
        console.error(error);
      }
      setIsloading(false);
    };
  }, [thumbUrl]);

  const rendername = (name: string) => {
    return (
      <>
        {name &&
          name.split("~").map((item, i) => {
            return <p key={i}>{item}</p>;
          })}
      </>
    );
  };
  const getBgImage = (showDesignThumbsAsBg: boolean) => {
    if (!showDesignThumbsAsBg) return "none";
    const thumbSrc = thumbImg.current !== null ? "url(" + thumbImg.current.src + ")" : "none";
    return thumbSrc;
  };
  return (
    <div
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={classNames("thumb-item", { active: active }, className)}
      onClick={(e) => {
        if (onThumbnailClick) onThumbnailClick(e);
      }}
      ref={ref}
    >
      <div
        className={classNames("thumb-image-container", aspect, {
          "bp3-skeleton": !thumbUrl || isloading,
        })}
        style={{
          backgroundImage: getBgImage(showAsBg),
        }}
      >
        <img
          className={classNames(
            `thumb-image`,
            {
              "fit-width": fitwidth,
            },
            {
              "fit-height": !fitwidth,
            },
            {
              rotated: imageRotated,
              "thumb-hidden": getBgImage(showAsBg) !== "none" || showAsBg,
            }
          )}
          ref={thumbImg}
          alt="thumbnail"
        />
      </div>
      {showTitle && (
        <span className="thumb-title" title={name}>
          {rendername(name)}
        </span>
      )}
      {
        showPrice && (
          <span className="thumb-price">
            {getPriceFromPath(fullPath)}
          </span>
        )
      }
    </div>
  );
}
