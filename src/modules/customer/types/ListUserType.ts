

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
  plan_id: string;
  plan:[ {
    id: string;
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

export interface ListUserType {
  id: string;
  name: string;
  email: string;
  phone_number: number;
  bi_number: string;
  path_profile_photo: string | null;
  permissions: string[];
  roles: string[];
  status: {
    id: string;
    name: string;
    code: number;
    created_at: string;
    updated_at: string;
  };
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  creditRequestProcessed:CreditRequestProcessedType
}
