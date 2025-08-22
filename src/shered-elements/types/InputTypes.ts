


export interface InpuTypes {
  name: string,
  type: string,
  style?: string,
  register?: any
  maxLengTh?: any
  placeholder: string,
  value?: string | number | undefined,
  onchage?: React.ChangeEventHandler<HTMLInputElement> | undefined,
  required?: boolean
  errors?: any
  desible?:any,
  oninput?:React.FormEventHandler<HTMLInputElement> | undefined
  defaulValue?: any,
  onKeyDown?: React.ChangeEventHandler<HTMLInputElement> | undefined,


}


export interface LoginData {
  email: string,
  password: string
}
