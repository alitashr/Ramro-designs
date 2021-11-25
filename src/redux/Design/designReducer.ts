import { designActions } from "./designActions";

import { DesignState, fileItem, NodeType } from "../../interfaces/design";
import { updateSingleFileProp } from "../../utils/treeUtils";

const initialState: DesignState = {
  tree: null,
  filteredTree: null,
  designCarouselList:[]
};
interface Action {
  type: keyof designActions;
  payload: any;
}
const designReducer = (state: DesignState = initialState, action: Action) => {
  const { type, payload } = action;
  switch (type) {
    case designActions.SET_TREE:
      return setDesignTree(state, payload);
    case designActions.UPDATE_FILE_PROP:
      return UpdateFileProp(state, payload);
    default:
      return state;
  }
};

function setDesignTree(state: DesignState, payload: any) {
  const { selectedFolder, selectedFile, tree, designCarouselList } = payload;
  return { ...state, tree, designCarouselList };
}

function UpdateFileProp(state: DesignState, fileNode: fileItem) {
  const stateTree = state?.tree || [];
  if (!stateTree.length) return { ...state };
  const tree = updateSingleFileProp(stateTree, fileNode);
  return { ...state, tree };
}

export default designReducer;
