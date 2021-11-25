import { Dispatch } from "redux";
import { fetchDesignList } from "../../api/appProvider";
import { ResponseNodeType } from "../../interfaces/design";
import { arrangeTree } from "../../utils/treeUtils";

export enum designActions {
  SET_TREE = "SET_TREE",
  SELECT_DESIGN = "SELECT_DESIGN",
}

const setDesignList = (payload: any) => {
  return {
    type: designActions.SET_TREE,
    payload: payload,
  };
};

export const getDesignList = (initDesignPath = "") => {
  return (dispatch: Dispatch) => {
    fetchDesignList({ struct: true }).then((nestedDesignList: any | ResponseNodeType[]) => {
      console.log("fetchDesignList -> nestedDesignList", nestedDesignList);
      const designTree = arrangeTree({
        tree: nestedDesignList,
        initDesignPath: initDesignPath !== "" ? initDesignPath : null,
        setActiveItem: true,
        expandSelectedFolder: true,
        keepFoldersExpanded: false,
      });
      const tree = designTree?.copiedNode;
      const selectedFile = designTree?.selectedFile;
      const selectedFolder = designTree?.selectedFolder;
      console.log("fetchDesignList -> tree", tree)
     
      dispatch(
        setDesignList({
          tree: tree,
          selectedFolder,
          selectedFile,
        })
      );
    });
  };
};
