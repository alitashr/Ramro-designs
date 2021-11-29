import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fileItem } from "../../../interfaces/design";
import { RootReducerState } from "../../../redux";
import { getAllDesignsOnly } from "../../../utils/treeUtils";
import Heading from "../../atoms/Heading";
import LazyThumbnail from "../../molecules/LazyThumbnail";
import SamplesBanner from "../../organisms/SamplesBanner";
import {PaginationContainer} from "../../molecules/Pagination/PaginationContainer";
import { AddToCart } from "../../../redux/Cart/cartActions";
export interface IElegantPageProps {}

export default function ElegantPage(props: IElegantPageProps) {
  const tree = useSelector((state: RootReducerState) => state.design?.tree);

  const dispatch  =  useDispatch();
  const [designList, setDesignList] = useState<fileItem[]>([]);
  const [currentItems, setCurrentItems] = useState<fileItem[]>([]);
  
  const itemsPerPage = 8;
  useEffect(() => {
    const allDesigns = getAllDesignsOnly(tree[0].children);
    console.log("useEffect -> allDesigns", allDesigns);
    setDesignList(allDesigns);

    const itemOffset = 0;
    const endOffset = 1* itemsPerPage;
    const items = allDesigns.slice(itemOffset, endOffset)
    setCurrentItems(items);
    dispatch(AddToCart(items.slice(0,3)));

  }, []);

  const handleThumbnailClick = (file: fileItem, activeVariation: fileItem) => {
    console.log("TCL: handleThumbnailClick -> file, activeVariation", file, activeVariation);
  };
  const handlePagination = (page: number)=>{
  console.log("handlePagination -> page", page);
  const itemOffset = page * itemsPerPage;
const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(designList.slice(itemOffset, endOffset));
  }
  return (
    <div>
      <div className="rd-collection-container">
        <Heading>Elegant Collection</Heading>
        <div className="rd-designs-container-grid">
          {currentItems &&
            currentItems.map((node: fileItem, index: number) => {
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
        <PaginationContainer handlePagination={handlePagination}/>
        
      </div>
      Elegant page
      <SamplesBanner />
    </div>
  );
}
