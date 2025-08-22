import * as yup from "yup"

const schema = yup.object({
     email: yup.string(). 
     email("O email precisa ser válido Ex: mauro@exemplo.com")
     .required("Campo obrigatório"),
})

export { schema }