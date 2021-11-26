import * as React from "react";
import { RouteMatch, RouteProps, RouterProps, useParams } from "react-router";
import { useSearchParams } from "react-router-dom";
import IPage from "../../../interfaces/page";
import Footer from "../../organisms/Footer";
import HeaderNavbar from "../../organisms/HeaderNavbar";

export default function AboutPage(props: RouterProps) {
  const params = useParams();
  console.log(params);

  React.useEffect(() => {
    console.log(props);
  }, []);

  return (
    <div>
      <HeaderNavbar></HeaderNavbar>
      THis is Help page
      <Footer />
    </div>
  );
}
