import classNames from 'classnames';
import * as React from 'react';
import { useMount } from 'react-use';
import { Button } from '../../atoms/Button';
import Heading from '../../atoms/Heading';
import Thumbnail from '../../molecules/Thumbnail';

export interface ICollectionSectionProps {
    mainHeading ?: string,
    subheading ?: string,
    subtext ?: string,
    buttonText ?: string,
    backgroundUrl ?: string,
    backgroundUrlArr ?: string[],
    handleThumbnailClick ?:(event: React.MouseEvent<HTMLDivElement>)=> void,
    textAtRight ?: boolean,
    className ?:string,
}

interface imgNode {
  thumbUrl ?: string,
  name ?: string ,
  
}

export default function CollectionSection (props: ICollectionSectionProps) {
  const {
    mainHeading = "",
    subheading = "",
    subtext = "",
    buttonText = "",
    backgroundUrl = "",
    backgroundUrlArr = [],
    handleThumbnailClick,
    textAtRight = false,
    className,
  } = props;
  const [imageNode, setImageNode] = React.useState<imgNode>();
  
  useMount(() => {
    if (backgroundUrl !== "") {
      const imgNode = {
        thumbUrl: backgroundUrl,
        name: "roomImage",
      };
      setImageNode(imgNode);
    } else if (backgroundUrlArr.length > 0) {
      backgroundUrlArr.forEach((bgUrl, index) => {
        const imgNode = {
          thumbUrl: bgUrl,
          name: `roomImage ${index}`,
        };
        setImageNode(imgNode);
      });
    }
  });
  const getImageNode = (bgUrl : string) => {
    const imgNode = {
      thumbUrl: bgUrl,
      name: `roomImage`,
    };
    return imgNode;
  };

  const handleThumbClick = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log("section image clicked");
    if (handleThumbnailClick) handleThumbnailClick(e);
  };

  return (
    <div className={classNames("rd-section", className)}>
      <div className="rd-section-box">
      <div
          className={classNames("rd-section-textarea", { order1: textAtRight })}
        >
          <Heading>{mainHeading}</Heading>
          <div className="rd-subheading">{subheading}</div>
          <div className="rd-subtext">{subtext}</div>
          <div className="rd-buttons-area">
          <Button className="rd-buttons" intent="primary">
              {buttonText}
            </Button>
        </div>
        </div>
        <div className="rd-section-imagearea">
          {imageNode && backgroundUrl !== "" && (
            <Thumbnail
              thumb={imageNode}
              aspect="landscape"
              fitwidth={false}
              className="rd-section-image"
              onThumbnailClick={handleThumbClick}
              showAsBg={true}
            />
          )}
          {backgroundUrl === "" && backgroundUrlArr.length && (
            <div className="rd-bundle-images">
              {backgroundUrlArr.map((bgUrl, index) => (
                <Thumbnail
                  key={index}
                  thumb={getImageNode(bgUrl)}
                  aspect="landscape"
                  fitwidth={false}
                  className={classNames(
                    "rd-section-image",
                    `bundleimage${index}`
                  )}
                  onThumbnailClick={handleThumbClick}
                  showAsBg={true}
                />
              ))}
            </div>
          )}
          </div>



      </div>
    </div>
  );
}
