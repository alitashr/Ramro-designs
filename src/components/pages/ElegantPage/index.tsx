import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fileItem } from "../../../interfaces/design";
import { RootReducerState } from "../../../redux";
import { getAllDesignsOnly } from "../../../utils/treeUtils";
import Heading from "../../atoms/Heading";
import LazyThumbnail from "../../molecules/LazyThumbnail";
import SamplesBanner from "../../organisms/SamplesBanner";

export interface IElegantPageProps {}

export default function ElegantPage(props: IElegantPageProps) {
  const tree = useSelector((state: RootReducerState) => state.design?.tree);
  const [designList, setDesignList] = useState<fileItem[]>([]);

  useEffect(() => {
    const allDesigns = getAllDesignsOnly(tree[0].children);
    console.log("useEffect -> allDesigns", allDesigns);
    setDesignList(allDesigns);
  }, []);

  const handleThumbnailClick = (file: fileItem, activeVariation: fileItem) => {
    console.log("TCL: handleThumbnailClick -> file, activeVariation", file, activeVariation);
  };
  return (
    <div>
      <div className="rd-collection-container">
        <Heading>Elegant Collection</Heading>
        <div className="rd-designs-container-grid">
          {designList &&
            designList.map((node: fileItem, index: number) => {
              return (
                <LazyThumbnail
                showTitle= {true}
                showPrice={true}
                  className="designthumbs"
                  onThumbnailClick={(activeVariation: fileItem) => handleThumbnailClick(node, activeVariation)}
                  node={node}
                />
              );
            })}
        </div>
      </div>
      Elegant page
      <SamplesBanner />
    </div>
  );
}
