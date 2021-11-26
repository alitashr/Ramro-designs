import { useSelector } from "react-redux";

import MainBanner from "../../organisms/MainBanner";
import CollectionSection from "../../organisms/CollectionSection";
import { CDN_domain } from "../../../api/appProvider";
import SamplesBanner from "../../organisms/SamplesBanner";
import DesignsCarousel from "../../organisms/DesignsCarousel";
import { RootReducerState } from "../../../redux";

export interface IHomePageProps {}

export default function HomePage(props: IHomePageProps) {
  const tree = useSelector((state: RootReducerState) => state.design?.tree);
  return (
    <div>
      <MainBanner></MainBanner>
      {tree && 
      <DesignsCarousel tree={tree}></DesignsCarousel>
      }
      {
        <CollectionSection
          className="singleImage rd-elegant-section"
          mainHeading={"Elegant collection"}
          subtext={"Our collection of non-exclusive designs"}
          buttonText="Browse Elegant Collection"
          backgroundUrl={`${CDN_domain + "/images/Cansus_Prense in bedroom arcadus.jpg"}`}
        ></CollectionSection>
      }

      {
        <CollectionSection
          className="rd-bundles-section"
          textAtRight={true}
          mainHeading={"Bundles"}
          subtext={"SET OF 2-5 DESIGNS"}
          buttonText="Browse Bundles"
          backgroundUrlArr={[
            `${CDN_domain + "/images/Bundle designs/Archelypse.thumb.jpg"}`,
            `${CDN_domain + "/images/Bundle designs/Archelypse.1.thumb.jpg"}`,
            `${CDN_domain + "/images/Bundle designs/Archelypse.2.thumb.jpg"}`,
          ]}
        ></CollectionSection>
      }

      {
        <CollectionSection
          className="singleImage rd-seamless-section"
          mainHeading={"Seamless designs"}
          subtext={"Designs that can be seamlessly tiled over any product like fabric, wallpaper, table cloth, etc."}
          buttonText="Browse Seamless Designs"
          backgroundUrl={`${CDN_domain + "/images/Cansus_Prense in bedroom arcadus.jpg"}`}
        ></CollectionSection>
      }

      {
        <CollectionSection
          className="singleImage rd-signature-section"
          textAtRight={true}
          mainHeading={"Signature collection"}
          subheading={"EXCLUSIVE DESIGNS"}
          subtext={
            "Each design in this collection can only be purchased once, after which it will only be available to the buyer."
          }
          buttonText="Sign in to view"
          backgroundUrl={`${CDN_domain + "/images/Cansus_Prense in bedroom arcadus.jpg"}`}
        ></CollectionSection>
      }
      <SamplesBanner />
    </div>
  );
}
