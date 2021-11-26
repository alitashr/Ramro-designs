import * as React from "react";
import IPage from "../../../interfaces/page";
import Footer from "../../organisms/Footer";
import HeaderNavbar from "../../organisms/HeaderNavbar";

export default function HelpPage(props: IPage) {
  return (
    <div>
      <HeaderNavbar></HeaderNavbar>
      THis is Help page
      <Footer />
    </div>
  );
}
