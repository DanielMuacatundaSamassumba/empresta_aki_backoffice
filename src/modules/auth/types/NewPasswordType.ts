import * as yup from "yup"

const schema = yup.object({
     newPassword:yup.string()
                 .min(6, "Este Campo dev ter no monimo 6 caractéres")
                 .required("Campo obrigatório!"),

     confNewPassword: yup.string()
                      .min(6, "Este Campo dev ter no monimo 6 caractéres")
                      .required("Campo obrigatório!")
                      .oneOf([yup.ref("newPassword")], "As senhas não coincidem")
})

export { schema }