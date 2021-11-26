import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { fileItem, NodeType } from "../../../interfaces/design";
import { RootReducerState } from "../../../redux";
import LazyThumbnail from "../../molecules/LazyThumbnail";
import {
  List,
  AutoSizer,
  Grid,
  CellMeasurer,
  CellMeasurerCache,
  GridCellRenderer,
  ListRowRenderer,
  ListRowProps,
  CellRenderer,
  CellMeasurerProps,
  GridCellProps,
} from "react-virtualized";
export interface IDesignsCarouselProps {
  tree: NodeType[];
}

interface IThumbFileProps {
  key?: number;
  file: fileItem;
  handleThumbnailClick: (file: fileItem, activeVariation: fileItem) => void;
}
const ThumbFile = (props: IThumbFileProps) => {
  const { file, handleThumbnailClick } = props;
  //console.log("TCL: node", node);
  return (
    <>
      <LazyThumbnail
        className="designthumbs"
        onThumbnailClick={(activeVariation: fileItem) => handleThumbnailClick(file, activeVariation)}
        node={file}
      />
    </>
  );
};

export default function DesignsCarousel(props: IDesignsCarouselProps) {
  //const [DesignThumblist, setDesignThumblist] = React.useState<fileItem[]>([]);

  const designCarouselList = useSelector((state: RootReducerState) => state.design?.designCarouselList);

  const handleThumbnailClick = (file: fileItem, activeVariation: fileItem) => {
    console.log("TCL: handleThumbnailClick -> file, activeVariation", file, activeVariation);
  };
  const cache = new CellMeasurerCache({
    defaultWidth: 100,
    minWidth: 75,
    fixedHeight: true,
  });

  const renderRow = (props: ListRowProps) => {
    return (
      // <p style={{ width:500}}> this is a test</p>
      <ThumbFile key={props.index} file={designCarouselList[props.index]} handleThumbnailClick={handleThumbnailClick} />
    );
  };

  const  cellRenderer =  (props:GridCellProps) =>{
    const content=<p>testing</p> // Derive this from your data somehow
  
    return (
      <CellMeasurer
        cache={cache}
        columnIndex={props.columnIndex}
        key={props.key}
        parent={props.parent}
        rowIndex={props.rowIndex}
      >
        <div
          style={{
            ...props.style,
            height: 35,
            whiteSpace: 'nowrap'
          }}
        >
          {content}
        </div>
      </CellMeasurer>
    );
  }
  return (
    <div className="designCarouselBox">
      {designCarouselList && designCarouselList.length ? (
        <>
 <AutoSizer className="autosizer">
              {({ height, width }) => ( 
                  <Grid
                  className="tree-node-list"
                    cellRenderer= 
                    //  {cellRenderer}
                    {({ columnIndex, key, rowIndex, style }) => (
                       <ThumbFile key={rowIndex} file={designCarouselList[columnIndex]} handleThumbnailClick={handleThumbnailClick} />
                    )}
                    columnCount={designCarouselList.length}
                    columnWidth={window.innerWidth/designCarouselList.length}
                    height={260}
                    rowCount={1}
                    rowHeight={230}
                    width={window.innerWidth}
                  />
               )}
              </AutoSizer>
 {/* <AutoSizer className="autosizer">
                {({ height, width }) => (
          <List className="tree-node-list" width={window.innerWidth} height={300} rowHeight={100} rowRenderer={renderRow} rowCount={designCarouselList.length} />
                )}</AutoSizer> */}
          {/* <ul className="tree-node-list">
        {designCarouselList.map((node: fileItem, index: number) => (
        //     <>
        //       <AutoSizer className="autosizer">
        //         {({ height, width }) => (
        //           <Grid
        //             cellRenderer={({ columnIndex, key, rowIndex, style }) => (
        //               <ThumbFile key={index} file={node} handleThumbnailClick={handleThumbnailClick} />
        //             )}
        //             columnCount={12}
        //             columnWidth={100}
        //             height={300}
        //             rowCount={1}
        //             rowHeight={height}
        //             width={width}
        //           />
        //         )}
        //       </AutoSizer>
              
        //       ,
        //     </>
        //   ))}
        // </ul>
         */}
        </>
      ) : null}
    </div>
  );
}
