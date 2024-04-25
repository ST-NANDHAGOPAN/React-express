export interface ListItems {
    name: string;
    cards: { name: string }[];
  }

export interface Dropdown1  {
    handleClose: () => void;
};


export enum BasicList {
    TODO ="To Do" ,
    INPROGRESS ="In Progress",
    DONE ="Done"
}
export enum Addlabels {
  ADDACARD = "Add a Card",
  ADDCARD = "Add Card",
  ADDALIST = "Add a List",
  ADDLIST = "Add List"
}