import * as React from 'react';
import Footer from '../../organisms/Footer';
import HeaderNavbar from '../../organisms/HeaderNavbar';
import SamplesBanner from '../../organisms/SamplesBanner';

export interface ISignaturePageProps {
}

export default function SignaturePage (props: ISignaturePageProps) {
  return (
    <div>
      <HeaderNavbar></HeaderNavbar>

      This is signature page
      <SamplesBanner />
      <Footer />
    </div>
  );
}
