import * as React from 'react';
import { CDN_domain } from '../../../api/appProvider';
import Banner from "../../atoms/Banner";
import { Button } from "../../atoms/Button";

export interface ISamplesBannerProps {
}

export default function SamplesBanner (props: ISamplesBannerProps) {
  return (
    <Banner className="footer-banner" backgroundUrl={`url(${CDN_domain + "/images/FooterImage.png"})`}>
          <div style={{ width: "27rem" }}>
            <div className="rd-subtext">
              Download EXCLUSIVE AND NON-EXCLUSIVE samples to see what you get on a purchase.
            </div>
            <div className="rd-buttons-area">
              <Button className="rd-buttons" intent="primary">
                {" "}
                Download Samples
              </Button>
            </div>
          </div>
        </Banner>
  );
}
