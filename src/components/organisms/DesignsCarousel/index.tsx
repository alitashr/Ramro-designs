import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { fileItem, NodeType } from "../../../interfaces/design";
import { RootReducerState } from "../../../redux";
import LazyThumbnail from "../../molecules/LazyThumbnail";

export interface IDesignsCarouselProps {
  tree : NodeType[]
}


interface IThumbFileProps {
  key ?: number,
  file :fileItem,
  handleThumbnailClick : (file: fileItem, activeVariation: fileItem)=> void,
}
const ThumbFile = (props: IThumbFileProps) =>{
  const { file, handleThumbnailClick } = props;
  //console.log("TCL: node", node);
  return (
    <>
       <LazyThumbnail className="designthumbs"
                onThumbnailClick={(activeVariation: fileItem) =>
                  handleThumbnailClick(file, activeVariation)
                }
                node={file}
      />
    </>
  ); 
}

export default function DesignsCarousel(props: IDesignsCarouselProps) {

  const [DesignThumblist, setDesignThumblist] = React.useState<fileItem[]>([]);
   
  const designCarouselList = useSelector((state: RootReducerState) => state.design?.designCarouselList);
  
  // React.useEffect(() => {
  //   if (!tree) return;
  //   console.log("tree is finally here", tree);
  //   let designsTreeToShow = tree[0].children || [];
   
  //   let designListArr: fileItem[]= [];
  //   designsTreeToShow.forEach( (element:NodeType) => {
  //     if(element.files && element.files.length>0){
  //       const files = element.files;
  //       const totalFilesInFolder = files.length;
  //       for(var i=0; i<3; i++){
  //         const randomNumber = Math.round(Math.random()* (totalFilesInFolder-1));
        
  //         designListArr.push(files[randomNumber])
  //       }
  //       // files.forEach(file => {
  //       //   designListArr.push(file);
  //       // });  
       
  //     }
  //     });
  //     setDesignThumblist(designListArr);
     
  //   console.log("useEffect -> designListArr", designListArr);

  // }, [tree]);
  const handleThumbnailClick = (file: fileItem, activeVariation: fileItem) => {
    console.log(
      "TCL: handleThumbnailClick -> file, activeVariation",
      file,
      activeVariation
    );
  }
  return (<div className="designCarouselBox">
    { 
          designCarouselList && designCarouselList.length?
          <ul className="tree-node-list">
            {
              designCarouselList
              .map((node:fileItem, index:number) => (
                <ThumbFile key={index} file={node} handleThumbnailClick={handleThumbnailClick} />
              ))
            }
            </ul>
        :null
    }
  </div>);
}
