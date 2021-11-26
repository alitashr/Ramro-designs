import * as React from "react";
import { useMount } from "react-use";
import { useDispatch, useSelector } from "react-redux";
import HeaderNavbar from "../../organisms/HeaderNavbar";

import { fetchApiKey, getApiKey } from "../../../api/appProvider";

import Footer from "../../organisms/Footer";

import { getDesignList } from "../../../redux";
import { RootReducerState } from "../../../redux";
import { Params, useParams } from "react-router";
import HomePage from "../HomePage";
import ElegantPage from "../ElegantPage";
import SignaturePage from "../SignaturePage";

export interface IEntryPageProps {}

export default function EntryPage() {
  const tree = useSelector((state: RootReducerState) => state.design?.tree);

  const dispatch = useDispatch();
  const params = useParams();
  console.log(params);
  useMount(() => {
    // window.flags = {};
    // window.InterfaceElements = {};

    let key = getApiKey();
    let page = sessionStorage.getItem("page") || "";

    if (key === "" || page !== "ramro") {
      fetchApiKey({ username: "ramro", password: "ramro20", encrypted: false })
        .then((key) => {
          console.log("Login -> key", key);
          dispatch(getDesignList());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("Key from session ->", key, tree);
      if (!tree) {
        dispatch(getDesignList());
      }
    }
  });
  const renderPage = (params: Params) => {
    const page = params && params.page ? params.page : "";

    switch (page) {
      case ":home":
        return <HomePage />;
      case ":elegant":
        return <ElegantPage />;
      case ":signature":
        return <SignaturePage />;
      case "":
        return <HomePage />;
      default:
        break;
    }
    return;
  };
  return (
    <div>
      <HeaderNavbar></HeaderNavbar>
      {tree && renderPage(params)}
      <Footer />
    </div>
  );
}
