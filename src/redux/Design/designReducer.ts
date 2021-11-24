import { designActions } from "./designActions";


interface DesignState {
  tree: null,
  filteredTree: null
}

const initialState: DesignState = {
  tree: null,
  filteredTree: null,
};
interface Action {
  type: keyof designActions,
  payload: any
}
const designReducer = (state:DesignState = initialState, action:Action) => {
  const { type, payload } = action;
  switch (type) {
    case designActions.SET_TREE:
      return setDesignTree(state, payload);
    default:
      return state;
  }
};

function setDesignTree(state: DesignState, payload:any) {
  const { selectedFolder, selectedFile, tree } = payload;
  return { ...state, tree };
}

export default designReducer;