import Heading from '../../atoms/Heading';
import SamplesBanner from '../../organisms/SamplesBanner';

export interface IElegantPageProps {
}

export default function ElegantPage (props: IElegantPageProps) {
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
