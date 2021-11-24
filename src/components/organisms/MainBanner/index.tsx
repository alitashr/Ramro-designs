import * as React from 'react';
import Banner from '../../atoms/Banner';
import { Button } from '../../atoms/Button';
import Heading from "../../atoms/Heading";

export interface IMainBannerProps {
}

export default function MainBanner (props: IMainBannerProps) {
  return (
    <div>
        <Banner
       backgroundUrl={`url(${process.env.PUBLIC_URL +
        "/assets/images/CoverImage.png"})`}
    >
      <div style={{ width: "37rem" }}>
      <Heading main>Designs for textiles</Heading>
          <div className="rd-subtext">
            Designs for weaving as rugs, embellishing a piece of fabric, or
            printing onto anything custom or commercial.
          </div>
          <div className="rd-buttons-area">
            <Button className="rd-buttons" intent="primary">
              {" "}
              View Elegant Collection
            </Button>
            <Button className="rd-buttons" tertiary>
              {" "}
              View Signature (Exclusive) Designs
            </Button>
          </div>
      </div>
    </Banner>
    </div>
  );
}
