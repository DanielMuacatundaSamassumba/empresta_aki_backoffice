export interface ButtonTypes {
  name: string,
  onclick?: React.MouseEventHandler<HTMLButtonElement> | undefined
  style?: string,
  typeOfButtonCustom:string
  type:"button" | "reset" | "submit" 
}