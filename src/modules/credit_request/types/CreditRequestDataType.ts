export interface CreditRequestDataType {
  id: string;
  ammount: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  customer_id: string;
  payment_method_id: string;
  plan_id: string;
  iban: string | null;
  totalInterestRate: number,
  totalEffectiveCost?: number
  openingCommittee: number,
  netAmountReceivable: number,
  customer: {
    id: string;
    name: string;
    email: string;
    phone_number: string | null;
    bi_number: string | null;
    birtday_date: string | null;
    accountNumber: string | null;
    bank_id: string | null;
    monthlyIincome: string | null;
    multicaixaExpress: string | null;
    profission_id: string | null;
    score: string | null;
    path_back_identity_card: string | null;
    path_front_identity_card: string | null;
    path_profile_photo: string | null;
    statu_id: string | null;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    email_verified_at: string | null;
  };

  plan:[ {
    id: string;
    flat_name: string;
    description: string;
    interest_rate: string;
    commission: string;
    spread: string;
    quantity_installments: number;
    refund_period: number;
    maximum_capital: number;
    statu_id: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
  }],
  validated_at: string,
  statu?: {
    name: string
  },
  installments: any[];
}

enum StatusEnum {
  Approved = "approved",
  Pending = "pending",
  Denied = "denied",
  UnderAnalysi = 'under analysis',
  validated = 'validated',
  processed = 'processed',
  notValidated ='not validated'
}

function handleStatus(status: StatusEnum) {
  switch (status) {
    case StatusEnum.Approved:
      return { statusName: "Aprovado", color: "green" };
    case StatusEnum.Pending:
      return { statusName: "Pendente", color: "orange", itsTrue:false};
    case StatusEnum.Denied:
      return { statusName: "Negado", color: "red", itsTrue: false };
    case StatusEnum.UnderAnalysi:
      return { statusName: "Em analise", color: "orange", itsTrue: false };
    case StatusEnum.processed:
      return { statusName: "Processado", color: "green", itsTrue: false };
    case StatusEnum.validated:
      return { statusName: "Validado", color: "green", itsTrue: false };
    case StatusEnum.notValidated:
      return { statusName: "Näo Validado", color: "red", itsTrue: true };
    default:
      return { statusName: "unknown", color: "gray" };
  }
}
export interface DialogModalProps {
  isPonded: boolean,
  setIsPonded: (isPonded: boolean) => void,
  message: string,
  setMessage: (message: string) => void,
  ButtonSubmit: () => void,
  editor: React.RefObject<null>,
  config: {
    readonly: boolean
  }
}

export { handleStatus, StatusEnum }