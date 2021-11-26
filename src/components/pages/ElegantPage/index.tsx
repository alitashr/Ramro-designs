import * as React from 'react';
import Footer from '../../organisms/Footer';
import HeaderNavbar from '../../organisms/HeaderNavbar';
import SamplesBanner from '../../organisms/SamplesBanner';

export interface IElegantPageProps {
}

export default function ElegantPage (props: IElegantPageProps) {
  return (
    <div>
      <HeaderNavbar></HeaderNavbar>

      
      Elegant page
      <SamplesBanner />
      <Footer />
    </div>
  );
}
