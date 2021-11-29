export interface DesignState {
  tree: null,
  filteredTree: null,
  designCarouselList: any[]
}

export interface fileItem {
  type: string;
  name: string;
  fullPath: string;
  location: string;
  id: string;
  thumbUrl ?:string|null;
  designProps ?:any;
  variations: {
      vars: any;
      colors?: undefined;
      shapes?: undefined;
  } | {
      colors: any;
      shapes: any;
      vars?: undefined;
  } | null;
}


export interface ResponseNodeType {
  Type: string,
  Name: string,
  FullPath: string,
  Location: string,
  Children :any[]
}
export interface NodeType {
  type: string;
  name: string;
  fullPath: string;
  location: string;
  children: any[];
  showThumbnails: boolean;
  files: fileItem[] |null;
  isSelected: boolean;
  isExpanded: boolean;
  level: number;
  id: string;
}

export interface cartType{
  designs:fileItem[] | null
}