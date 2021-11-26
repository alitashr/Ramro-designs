import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootReducerState } from '../../../redux';
import { getAllDesignsOnly } from '../../../utils/treeUtils';
import Heading from '../../atoms/Heading';
import SamplesBanner from '../../organisms/SamplesBanner';

export interface IElegantPageProps {
}

export default function ElegantPage (props: IElegantPageProps) {
  const tree = useSelector((state: RootReducerState) => state.design?.tree);
  useEffect(()=>{
    const allDesigns =  getAllDesignsOnly(tree[0].children)
    console.log("useEffect -> allDesigns", allDesigns)

  }, [])
 
  return (
    <div>
     
      <div className="rd-collection-container">
        <Heading>Elegant Collection</Heading>

      </div>
      
      Elegant page
      <SamplesBanner />
    </div>
  );
}
