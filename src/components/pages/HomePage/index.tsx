import * as React from "react";
import HeaderNavbar from "../../organisms/HeaderNavbar";
import MainBanner from "../../organisms/MainBanner";
import CollectionSection from "../../organisms/CollectionSection";
export interface IHomePageProps {}

export default function HomePage(props: IHomePageProps) {
  return (
    <div>
      <HeaderNavbar></HeaderNavbar>
      <MainBanner></MainBanner>
      {
        <CollectionSection
          className="rd-elegant-section"
          mainHeading={"Elegant collection"}
          subtext={"Our collection of non-exclusive designs"}
          buttonText="Browse Elegant Collection"
          backgroundUrl={`${process.env.PUBLIC_URL + "/assets/images/Cansus_Prense in bedroom arcadus.jpg"}`}
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
            `${process.env.PUBLIC_URL + "/assets/images/Bundle designs/Archelypse.thumb.jpg"}`,
            `${process.env.PUBLIC_URL + "/assets/images/Bundle designs/Archelypse.1.thumb.jpg"}`,
            `${process.env.PUBLIC_URL + "/assets/images/Bundle designs/Archelypse.2.thumb.jpg"}`,
          ]}
        ></CollectionSection>
      }

      {
        <CollectionSection
          className="rd-seamless-section"
          mainHeading={"Seamless designs"}
          subtext={"Designs that can be seamlessly tiled over any product like fabric, wallpaper, table cloth, etc."}
          buttonText="Browse Seamless Designs"
          backgroundUrl={`${process.env.PUBLIC_URL + "/images/Cansus_Prense in bedroom arcadus.jpg"}`}
        ></CollectionSection>
      }

      {
        <CollectionSection
          className="rd-signature-section"
          textAtRight={true}
          mainHeading={"Signature collection"}
          subheading={"EXCLUSIVE DESIGNS"}
          subtext={
            "Each design in this collection can only be purchased once, after which it will only be available to the buyer."
          }
          buttonText="Sign in to view"
          backgroundUrl={`${process.env.PUBLIC_URL + "/images/Cansus_Prense in bedroom arcadus.jpg"}`}
        ></CollectionSection>
      }
    </div>
  );
}
