
import { Dispatch } from "redux";
import { fetchDesignList } from "../../api/appProvider";

export enum designActions {
  SET_TREE = "SET_TREE",
  SELECT_DESIGN = "SELECT_DESIGN"
}

const setDesignList = (payload:any) => {
  return {
    type: designActions.SET_TREE,
    payload: payload,
  };
};


export const getDesignList = ()=>{
  return (dispatch : Dispatch)=>{
    fetchDesignList({struct: true}).then((nestedDesignList)=>{
      console.log("fetchDesignList -> nestedDesignList", nestedDesignList);
      
      dispatch(
        setDesignList({
          tree: nestedDesignList
        })
      )
    });
  }
}