export const enum typeOfUser {
    Customer = "customer",
    Teller = "teller",
    Administrator = "administrator",
    CreditAnalyst = "credit-analyst",
    SuperAdmin = "super-admin",
    FINANCIAL_MANEGER = "financial-manager",
}

export function handleTypeOfUser(typeOfuser: typeOfUser) {
    switch (typeOfuser) {
        case typeOfUser.Customer:
            return { name: "Cliente" }
        case typeOfUser.Teller:
            return { name: "Caixa" }
        case typeOfUser.Administrator:
            return { name: "Administrador" }
        case typeOfUser.CreditAnalyst:
            return { name: "Analista de Crédito" }
        case typeOfUser.SuperAdmin:
            return { name: "Super Admin" }
        case typeOfUser.FINANCIAL_MANEGER:
            return { name: "Gestor Financeiro" }
    }
}