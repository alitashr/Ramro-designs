import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fileItem } from "../../../interfaces/design";
import { RootReducerState, setSelectedFile } from "../../../redux";
import { filterDesigns, getAllDesignsOnly, shuffle } from "../../../utils/treeUtils";
import Heading from "../../atoms/Heading";
import LazyThumbnail from "../../molecules/LazyThumbnail";
import SamplesBanner from "../../organisms/SamplesBanner";
import { PaginationContainer } from "../../molecules/Pagination/PaginationContainer";
import { AddToCart } from "../../../redux/Cart/cartActions";
import FullDesignContainer from "../../organisms/FullDesignContainer";
import TogglerButtons from "../../molecules/TogglerButtons";
import CategoriesToggler from "../../organisms/CategoriesToggler";
import PriceToggler from "../../organisms/PriceToggler";

import { Popover2 } from "@blueprintjs/popover2";

export interface IElegantPageProps {}

export default function ElegantPage(props: IElegantPageProps) {
  const tree = useSelector((state: RootReducerState) => state.design?.tree);
  const selectedFile = useSelector((state: RootReducerState) => state.design?.selectedFile);

  const dispatch = useDispatch();
  const [designList, setDesignList] = useState<fileItem[]>([]);
  const [currentItems, setCurrentItems] = useState<fileItem[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);

  const [showFullDesign, setShowFullDesign] = useState(false);
  const [currentDesignIndex, setCurrentDesignIndex] = useState(0);

  const [categoriesFilter, setCategoriesFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");

  const itemsPerPage = 8;
  useEffect(() => {
    setPriceFilter("");
    filterDesignsByCategory("");
  }, []);

  const filterDesignsByCategory = (filterText: string = "") => {
    filterText = filterText && filterText.toLowerCase() === "all" ? "" : filterText;
    filterText = filterText && filterText.toLowerCase() === "bundles" ? "bundle" : filterText;

    setCategoriesFilter(filterText);
    let totalDesigns = tree[0].children;
    let filteredDesignsByCategory = getAllDesignsOnly(totalDesigns, filterText);
    let filteredDesignsByPrice = filterDesigns(filteredDesignsByCategory, priceFilter);

    const shuffledDesigns = shuffle(filteredDesignsByPrice);
    setDesignList(shuffledDesigns);
    arrangePages(shuffledDesigns);
  };
  const filterDesignsByPrice = (priceFilterText: string = "") => {
    priceFilterText = priceFilterText && priceFilterText.toLowerCase() === "all" ? "" : priceFilterText;
    setPriceFilter(priceFilterText);
    let totalDesigns = tree[0].children;
    let filteredDesignsByCategory = getAllDesignsOnly(totalDesigns, categoriesFilter);
    let filteredDesignsByPrice = filterDesigns(filteredDesignsByCategory, priceFilterText);

    const shuffledDesigns = shuffle(filteredDesignsByPrice);
    setDesignList(shuffledDesigns);
    arrangePages(shuffledDesigns);
  };
  const arrangePages = (filteredDesigns: any[]) => {
    const TotalPages = Math.round(filteredDesigns.length / itemsPerPage);
    setTotalPages(TotalPages);
    const itemOffset = 0;
    const endOffset = 1 * itemsPerPage;
    const items = filteredDesigns.slice(itemOffset, endOffset);
    setCurrentItems(items);
  };

  const handleThumbnailClick = (file: fileItem, activeVariation: fileItem) => {
    console.log("TCL: handleThumbnailClick -> file, activeVariation", file, activeVariation);
    dispatch(setSelectedFile(file));
    const index = currentItems.indexOf(file);
    console.log("handleThumbnailClick -> index", index);
    setCurrentDesignIndex(index);
    setShowFullDesign(true);
  };
  const handlePagination = (page: number) => {
    console.log("handlePagination -> page", page);
    const itemOffset = page * itemsPerPage;
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(designList.slice(itemOffset, endOffset));
  };
  const handleDesignNavArrows = (direction: string = "next") => {
    console.log("handleDesignNavArrows -> direction", direction);
    direction = direction.toLowerCase();
    var designIndex = direction === "next" ? currentDesignIndex + 1 : currentDesignIndex - 1;
    designIndex = designIndex >= currentItems.length ? 0 : designIndex;
    designIndex = designIndex < 0 ? currentItems.length - 1 : designIndex;
    console.log("handleDesignNavArrows -> designIndex", designIndex);
    setCurrentDesignIndex(designIndex);
    dispatch(setSelectedFile(currentItems[designIndex]));
  };
  const onCategoriesToggle = (filterText: string) => {
    console.log("onCategoriesToggle -> filterText", filterText);
    filterDesignsByCategory(filterText);
  };
  const onPriceToggle = (priceText: string = "all") => {
    console.log("onPriceToggle -> priceText", priceText);

    filterDesignsByPrice(priceText);
  };
  return (
    <div>
      <div className="rd-collection-container">
        <Heading className='page-heading'>Elegant Collection</Heading>
        <div className="rd-categories-filters-area">
          {/* <TogglerButtons
            wrapperClassName="rd-collection-categories"
            className="rd-categories"
            ButtonTexts={["All", "Seamless", "Bundles"]}
            selectedButtonClass="selected"
            selectedButtonIndex={0}
            
          /> */}
          <CategoriesToggler onCategoriesToggle={onCategoriesToggle} />
          <div className="rd-filters-area">
            <div className="rd-collection-filters">
              <span className="rd-button-text">Color filter</span>
              <span className="rd-svg-icons">
                <img src="./assets/icons/triangle-down.svg" alt="dropdown-icon" />
              </span>
            </div>

            <div className="rd-vertical-bar">|</div>

            <Popover2
              content={
                // <TogglerButtons
                //   wrapperClassName="rd-collection-categories"
                //   className="rd-categories"
                //   ButtonTexts={["20", "40", "50", "80", "All"]}
                //   selectedButtonClass="selected"
                //   selectedButtonIndex={4}
                // />
                <PriceToggler onPriceToggle={onPriceToggle} />
              }
              minimal={true}
              interactionKind="click"
              placement="bottom-end"
            >
              <div className="rd-collection-filters ">
                <span className="rd-button-text">Price filter</span>
                <span className="rd-svg-icons">
                  <img src="./assets/icons/triangle-down.svg" alt="dropdown-icon" />
                </span>
              </div>
              {/* <Button intent="primary" text="Popover target" /> */}
            </Popover2>
          </div>
        </div>

        <div className="rd-designs-container-grid">
          {currentItems &&
            currentItems.map((node: fileItem, index: number) => {
              return (
                <LazyThumbnail
                  showTitle={true}
                  showPrice={true}
                  className="designthumbs"
                  onThumbnailClick={(activeVariation: fileItem) => handleThumbnailClick(node, activeVariation)}
                  node={node}
                />
              );
            })}
        </div>
        <PaginationContainer handlePagination={handlePagination} totalPages={totalPages} />
        {selectedFile && showFullDesign && (
          <FullDesignContainer
            selectedFile={selectedFile}
            onNavArrowClick={handleDesignNavArrows}
            onClose={() => setShowFullDesign(false)}
          />
        )}
      </div>
      <SamplesBanner />
    </div>
  );
}
