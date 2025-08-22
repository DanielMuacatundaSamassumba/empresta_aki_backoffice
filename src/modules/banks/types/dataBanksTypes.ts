export interface dataBanksTypes {
    id?: string,
    status?: string,
    status_name?: string,
    bank_name: string,
    short_name?: string,
    country_prefix?: string,
    bank_prefix?: string,
    statu?:{
        name:string,
        status_id:string
    },
    statu_id:string
}

export enum StatusBankEnum {
    Active = "active",
    Inactive = "inactive",

}

export function handleBankStatus(status: StatusBankEnum) {

    switch (status) {
        case StatusBankEnum.Active:
            return { statusName: "activo", color: "green" }
        case StatusBankEnum.Inactive:
            return { statusName: "desactivado", color: "red" }
    }
}