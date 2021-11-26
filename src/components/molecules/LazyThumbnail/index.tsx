import * as React from 'react';
import { fileItem } from '../../../interfaces/design';
import Thumbnail from "../../molecules/Thumbnail";
import { useInView } from 'react-intersection-observer';
import { getDesignThumbnails } from '../../../api/appProvider';
import { UpdateDesignFileProp } from '../../../redux';
import { useDispatch } from 'react-redux';

export interface ILazyThumbnailProps {
  node: fileItem, 
  onThumbnailClick: (node: fileItem)=> void,
  className  ?:string
}

export default function LazyThumbnail (props: ILazyThumbnailProps) {
  const { node, onThumbnailClick, ...otherProps } = props;
  const dispatch = useDispatch();
 
  //const ref = React.useRef(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.25
  });


  const handleThumbClick = (node: fileItem) => {
    if (onThumbnailClick) {
      onThumbnailClick(node);
    }
};
React.useEffect(()=>{
  if (!inView) return;
  const loadDesignThumbnail = async ()=>{
      if (node.thumbUrl) return;
      const thumbs = await getDesignThumbnails({ designs: [node] });
      dispatch(UpdateDesignFileProp({ ...thumbs[0] }));
      }
      loadDesignThumbnail();
  }, [inView, node]);
 return (
        <div className="thumnail-container" ref={ref}>
           <Thumbnail {...otherProps} thumb={node} onThumbnailClick={()=>handleThumbClick(node)} />
        </div>
    );
}
