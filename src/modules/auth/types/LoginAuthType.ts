import * as yup from "yup"

const scheme = yup.object({
     email: yup.string().
          email("O email precisa ser válido Ex: mauro@exemplo.com")
          .required("Campo Obrigatório"),
     password: yup.string().required("Campo Obrigatório")
}).required("Campo obrigatório")

export interface LoginTypeData {
     email: string,
     password: string
}

export { scheme }