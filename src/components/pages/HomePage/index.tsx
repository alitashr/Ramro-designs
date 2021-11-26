import * as React from "react";
import { useMount } from "react-use";
import { useDispatch, useSelector } from "react-redux";
import HeaderNavbar from "../../organisms/HeaderNavbar";
import MainBanner from "../../organisms/MainBanner";
import CollectionSection from "../../organisms/CollectionSection";
import { CDN_domain, fetchApiKey, getApiKey } from "../../../api/appProvider";
import SamplesBanner from "../../organisms/SamplesBanner";
import Footer from "../../organisms/Footer";
import DesignsCarousel from "../../organisms/DesignsCarousel";

import { getDesignList } from "../../../redux";
import { RootReducerState } from "../../../redux";

export interface IHomePageProps {}

export default function HomePage(props: IHomePageProps) {
  const tree = useSelector((state: RootReducerState) => state.design?.tree);

  // const dispatch = useDispatch();
  // useMount(() => {
  //   // window.flags = {};
  //   // window.InterfaceElements = {};

  //   let key = getApiKey();
  //   let page = sessionStorage.getItem("page") || "";

  //   if (key === "" || page !== "ramro") {
  //     fetchApiKey({ username: "ramro", password: "ramro20", encrypted: false })
  //       .then((key) => {
  //         console.log("Login -> key", key);
  //         dispatch(getDesignList());
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   } else {
  //     console.log("Key from session ->", key, tree);
  //     if (!tree) {
  //       dispatch(getDesignList());
  //     }
  //   }
  // });

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
