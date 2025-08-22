interface CountryType {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}
interface CreditRequestProcessedType {
  id: string;
  ammount: string;
  netAmountReceivable: string;
  totalAmountPayable: number;
  totalEffectiveCost: number;
  totalEffectiveCostByInstallment: string | null;
  totalInterestRate: string;
  avalableInstallment_id: string;
  avalable_installment: any | null;
  backoffice_id: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  validated_at: string | null;
  reason_for_rejection: string | null;
  daysLate: number | null;
  fineForLate: number | null;
  openingCommittee: number;
  statu_id: string;
  statu: {
    status_id: string;
    name: string;
    code: number;
    created_at: string;
    updated_at: string;
  };

  plan: [{
    plan_id: string;
    flat_name: string;
    interest_rate: string;
    description: string;
    minimum_capital: number;
  }];
  payment_method_id: string;
  payment_method: {
    id: string;
    payment_type: string;
    code: number;
    created_at: string;
    updated_at: string;
  };
  customer_id: string;
  customer: {
    id: string;
    name: string;
    email: string | null;
    bi_number: string;
    birtday_date: string | null;
    phone_number?: string;
  };
  installments: any[];
  loans_requested_in_the_financial_areas: any[];
}

export interface CreateClientType {
  // Dados pessoais

  profission?: {
    id: string;
    name: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
  }
  bank?: {
    id: string;
    bank_name: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
  }
  name: string;
  email: string;
  phone_number: string;
  birtday_date: string;
  profission_id: string;
  city_id: string;
  house_or_building_number: number;
  statu_id?: string
  // Documentos
  bi_number: string;
  biFrontImage: (Blob | MediaSource)[];
  biBackImage: (Blob | MediaSource)[];
  profilePhoto: (Blob | MediaSource)[];

  // Bancários
  bank_id: string;
  accountNumber: string;
  iban: string;
  multicaixaExpress: string;
  monthlyIincome: string;
  neighbourhood:string
  // Campos opcionais ou auxiliares
  id?: string;
  province?: string;
  municipality?: string;
  street?: string;
  residence?: string;
  marital_status?: string
  house_number?: string
  status?: {
    id: string;
    name: string;
    code: number;
    created_at: string;
    updated_at: string;
    status_id: string;
  };
  createdAt?: string;
  score?: string;
  recive_message?: string;
  path_front_identity_card?: string | null;
  path_back_identity_card?: string | null;
  path_profile_photo?: string | null;
  created_at?: []
  creditRequestProcessed?: CreditRequestProcessedType
  address?: {
    id: string;
    user_id: string;
    country_id: string;
    municipality: string;
    province: string;
    residence: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    country: CountryType;
    street: string;
    neighborhood:string

    house_number: string;
  }
}


export enum statusUsers {
  ACTIVE = "active",
  INACTIVE = "inactive"
}

export function handleStatusUser(status: string): { name: string, color: string, nameIngles?: string } {
  switch (status) {
    case statusUsers.ACTIVE:
      return { name: "Activo", color: "green", nameIngles: "active" };
    case statusUsers.INACTIVE:
      return { name: "Inativo", color: "red", nameIngles: "inactive" };
    default:
      return { name: "Desconhecido", color: "gray", };
  }

}