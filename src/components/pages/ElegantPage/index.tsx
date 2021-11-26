import * as React from 'react';
import Heading from '../../atoms/Heading';
import Footer from '../../organisms/Footer';
import HeaderNavbar from '../../organisms/HeaderNavbar';
import SamplesBanner from '../../organisms/SamplesBanner';

export interface IElegantPageProps {
}

export default function ElegantPage (props: IElegantPageProps) {
  return (
    <div>
      <HeaderNavbar></HeaderNavbar>

      <div className="rd-collection-container">
        <Heading>Elegant Collection</Heading>

      </div>
      
      Elegant page
      <SamplesBanner />
      <Footer />
    </div>
  );
}
