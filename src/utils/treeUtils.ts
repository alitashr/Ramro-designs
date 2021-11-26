import { v4 as uuid } from "uuid";
import { getPathOffile } from "./stringUtils";
import {ResponseNodeType, fileItem, NodeType} from "../interfaces/design";

const findVariations = (fileNode: ResponseNodeType, parentNode: ResponseNodeType) => {
  const { Children } = parentNode;
  const { Name } = fileNode;
  const filtered = Children.filter((item) => item.Name[0] === ".");
  const varFolder = filtered.find((item) => item.Name.toLowerCase() === `.${Name.toLowerCase()}`);
  if (!varFolder) return null;
  const varFiles = varFolder.Children.filter((child: ResponseNodeType) => child.Type === "file").map((item: ResponseNodeType) => ({
    name: item.Name,
    type: item.Type,
    fullPath: item.FullPath,
    location: item.Location,
    id: uuid(),
  }));
  if (varFiles.length) return { vars: varFiles };
  let colors = [];
  let shapes = [];
  const varColorsFolder = varFolder.Children.find(
    (child: ResponseNodeType) => child.Type === "folder" && child.Name.toLowerCase() === "colors"
  );
  if (varColorsFolder) {
    colors = varColorsFolder.Children.filter((item: ResponseNodeType) => item.Type === "file").map((item: ResponseNodeType) => ({
      name: item.Name,
      type: item.Type,
      fullPath: item.FullPath,
      location: item.Location,
      id: uuid(),
    }));
  }
  const varShapesFolder = varFolder.Children.find(
    (child: ResponseNodeType) => child.Type === "folder" && child.Name.toLowerCase() === "shapes"
  );
  if (varShapesFolder) {
    shapes = varShapesFolder.Children.filter((item: ResponseNodeType) => item.Type === "file").map((item: ResponseNodeType) => ({
      name: item.Name,
      type: item.Type,
      fullPath: item.FullPath,
      location: item.Location,
      id: uuid(),
    }));
  }
  return { colors, shapes };
};

export function arrangeTree({
  tree,
  initDesignPath,
  setActiveItem = true,
  designfromFolder = false,
  expandSelectedFolder = false,
  keepFoldersExpanded = false,
}: {
  tree: ResponseNodeType[] | any;
  initDesignPath: string | null;
  setActiveItem: boolean;
  designfromFolder?: boolean;
  expandSelectedFolder: boolean;
  keepFoldersExpanded: boolean;
}) {
  let defaultFileLocation: string;
  if (!!initDesignPath) defaultFileLocation = designfromFolder ? initDesignPath : getPathOffile(initDesignPath);

  const treeNode = tree[0];
  return deepCopy(treeNode);

  function deepCopy(node: NodeType | any) {
    if(!node) return;
    const { Children, Type, Name, FullPath, Location } = node;
    const fileNodes = Children.filter((child: ResponseNodeType) => child.Type === "file");
    const files = fileNodes.map((item:ResponseNodeType) => ({
      type: item.Type,
      name: item.Name,
      fullPath: item.FullPath,
      location: item.Location,
      id: uuid(),
      variations: findVariations(item, node),
    }));
    let level = 0;
    let selectedFile: fileItem | undefined = undefined;
    let selectedFolder = null;
    let isSelected = false;
    let isExpanded = false;
    let showThumbnails = false;
    if (!selectedFile) {
      if (initDesignPath) {
        if (!designfromFolder) {
          const item = files.find((item: fileItem) => initDesignPath && item.fullPath.toLowerCase() === initDesignPath.toLowerCase());
          showThumbnails = !!item;
          selectedFile = item;
          isSelected = setActiveItem && FullPath.toLowerCase() === defaultFileLocation.toLowerCase();
          isExpanded = setActiveItem && initDesignPath.split("/").includes(Name);
        } else {
          isSelected = setActiveItem && FullPath.toLowerCase() === defaultFileLocation.toLowerCase();
          isExpanded = setActiveItem && initDesignPath.split("/").includes(Name);
          if (isSelected) {
            if (files.length) {
              selectedFile = files[0];
              showThumbnails = true;
            } else {
              isSelected = false;
              initDesignPath = null;
            }
          }
        }
      } else {
        if (Name.charAt(0) !== "." && files.length) {
          selectedFile = files[0];
          isSelected = setActiveItem;
          isExpanded = showThumbnails = expandSelectedFolder && setActiveItem;
        } else {
          isExpanded = true;
        }
      }
    }
    if (keepFoldersExpanded) isExpanded = true;
    let copiedNode: NodeType = {
      type: Type,
      name: Name,
      fullPath: FullPath,
      location: Location,
      children: [],
      showThumbnails,
      files,
      isSelected,
      isExpanded,
      level,
      id: uuid(),
    };
    const folderNodes = Children.filter((child: ResponseNodeType) => child.Type === "folder");
    copiedNode["children"] = Array(folderNodes.length);
    folderNodes.forEach((child:ResponseNodeType, index:number) => {
      copiedNode.children[index] = {
        type: null,
        name: null,
        fullPath: null,
        location: null,
        children: [],
        files: null,
      };
      traverse(child, copiedNode.children[index]);
    });
    if (isSelected) selectedFolder = copiedNode;

    function traverse(node: ResponseNodeType, copyNode:NodeType) {
      const { Children, Type, Name, FullPath, Location } = node;
      const fileNodes = Children? Children.filter((child: ResponseNodeType) => child.Type === "file"): [];
      const files = fileNodes.map((item: ResponseNodeType) => ({
        type: item.Type,
        name: item.Name,
        fullPath: item.FullPath,
        location: item.Location,
        id: uuid(),
        variations: findVariations(item, node),
      }));
      let isSelected = false;
      let isExpanded = false;
      let showThumbnails = false;
      if (!selectedFile)
        if (initDesignPath) {
          if (!designfromFolder) {
            const item = files.find((item) => initDesignPath && item.fullPath.toLowerCase() === initDesignPath.toLowerCase());
            showThumbnails = !!item;
            selectedFile = item;
            isSelected = setActiveItem && FullPath.toLowerCase() === defaultFileLocation.toLowerCase();
            isExpanded = setActiveItem && initDesignPath.split("/").includes(Name);
          } else {
            isSelected = setActiveItem && FullPath.toLowerCase() === defaultFileLocation.toLowerCase();
            isExpanded = setActiveItem && initDesignPath.split("/").includes(Name);
            if (isSelected) {
              if (files.length) {
                selectedFile = files[0];
                showThumbnails = true;
              } else {
                isSelected = false;
                showThumbnails = false;
                initDesignPath = null;
              }
            }
          }
        } else {
          if (Name.charAt(0) !== "." && files.length) {
            isSelected = setActiveItem;
            isExpanded = showThumbnails = expandSelectedFolder && setActiveItem;
            selectedFile = files[0];
          } else {
            isExpanded = true;
          }
        }
      if (keepFoldersExpanded) isExpanded = true;
      copyNode["type"] = Type;
      copyNode["name"] = Name;
      copyNode["fullPath"] = FullPath;
      copyNode["location"] = Location;
     // copyNode["children"] = Type;
      copyNode["files"] = files;
      copyNode["isSelected"] = isSelected;
      copyNode["isExpanded"] = isExpanded;
      copyNode["showThumbnails"] = showThumbnails;
      copyNode["level"] = Location.split("/").length;
      copyNode["id"] = uuid();
      const folderNodes = Children.filter((child) => child.Type === "folder");
      copyNode["children"] = Array(folderNodes.length);

      folderNodes.forEach((child, index) => {
        copyNode.children[index] = {
          type: null,
          name: null,
          fullPath: null,
          location: null,
          children: [],
          files: null,
        };
        traverse(child, copyNode.children[index]);
      });
      if (isSelected) selectedFolder = copyNode;
    }
    return { copiedNode: [copiedNode], selectedFile, selectedFolder };
  }

}


export const updateSingleFileProp = (array:NodeType[], fileNode: fileItem) => {
  const arr = [...array];
  let done = false;
  arr.forEach(function iter(a) {
    if (done) return;
    const files = a.files ||[];
    files.forEach((file) => {
      if (fileNode.fullPath === file.fullPath) {
        file.thumbUrl = fileNode.thumbUrl;
        file.designProps = fileNode.designProps;
        return;
      }
    });
    Array.isArray(a.children) && a.children.forEach(iter);
  });
  return arr;
};


export const getDesignThumbsToShow = (baseFolders:any[])=>{
  let designsTreeToShow = baseFolders; // tree[0].children || [];
    let designListArr: fileItem[]= [];
    designsTreeToShow.forEach( (element:NodeType) => {
      if(element.files && element.files.length>0){
        const files = element.files;
        const totalFilesInFolder = files.length;
        const randomNumList:number[] = [];
        for(var i=0; i<3; i++){
          const getRandomNum = (): number=> {
            const randomNumber = Math.round(Math.random()* (totalFilesInFolder-1));
            if(randomNumList.indexOf(randomNumber)!==-1){
              return getRandomNum()
            }
            else{
              return randomNumber
            }
          }
          const randomNum = getRandomNum();
          designListArr.push(files[randomNum])
        }
      }
      });
      console.log("getDesignThumbsToShow -> designListArr", designListArr);
      return designListArr;
}



export const getAllDesignsOnly = (baseFolders:any[])=>{
  let AllDesigns = baseFolders; // tree[0].children || [];
    let designListArr: fileItem[]= [];
    AllDesigns.forEach( (element:NodeType) => {
      if(element.files && element.files.length>0){
        const files = element.files;
        const totalFilesInFolder = files.length;

        for(var i=0; i<totalFilesInFolder; i++){
          designListArr.push(files[i])
        }
        // const randomNumList:number[] = [];
        // for(var i=0; i<3; i++){
        //   const getRandomNum = (): number=> {
        //     const randomNumber = Math.round(Math.random()* (totalFilesInFolder-1));
        //     if(randomNumList.indexOf(randomNumber)!==-1){
        //       return getRandomNum()
        //     }
        //     else{
        //       return randomNumber
        //     }
        //   }
        //   const randomNum = getRandomNum();
        //   designListArr.push(files[randomNum])
        // }
      }
      });
      console.log("getAllDesignsOnly -> getAllDesignsOnly", designListArr);
      return designListArr;
}