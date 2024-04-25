export interface ListItems {
    name: string;
    tasks: { name: string }[];
  }


export enum BasicList {
    TODO ="To Do" ,
    INPROGRESS ="In Progress",
    DONE ="Done"
}
export enum Add {
  ADDACARD = "Add a Card",
  ADDCARD = "Add Card",
  ADDALIST = "Add a List",
  ADDLIST = "Add List"
}