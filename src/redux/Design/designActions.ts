import { Dispatch } from "redux";
import { fetchDesignList } from "../../api/appProvider";
import { ResponseNodeType } from "../../interfaces/design";
import { arrangeTree, getDesignThumbsToShow } from "../../utils/treeUtils";

export enum designActions {
  SET_TREE = "SET_TREE",
  SELECT_DESIGN = "SELECT_DESIGN",
  UPDATE_FILE_PROP = "UPDATE_FILE_PROP",
}

const setDesignList = (payload: any) => {
  return {
    type: designActions.SET_TREE,
    payload: payload,
  };
};
const updateFileProp = (payload: any) => {
  return {
    type: designActions.UPDATE_FILE_PROP,
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
      console.log("fetchDesignList -> tree", tree);
      let designCarouselList:any[];

      if(tree){
        designCarouselList = getDesignThumbsToShow(tree[0].children);
        dispatch(
          setDesignList({
            tree: tree,
            selectedFolder,
            selectedFile,
            designCarouselList: designCarouselList
          })
        );
      }
      else{
        dispatch(
          setDesignList({
            tree: tree,
            selectedFolder,
            selectedFile
          })
        );
      }

      
    });
  };
};
export const UpdateDesignFileProp = (payload:any) => {
  return (dispatch: Dispatch) => {
    dispatch(updateFileProp(payload));
  };
};
