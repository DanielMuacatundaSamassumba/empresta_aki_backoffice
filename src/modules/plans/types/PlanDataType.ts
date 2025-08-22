// Interface para cada parcela do plano
interface InstallmentType {
  id?: string;
  installment_duration: number;
  installment_number: number;
  plan_id: string;
  status: number;
  status_name: string;
}

export interface statusTypes {
  status: {
    name: string
  },
  status_id: string
}

interface PlanDataType {
  id?: string;
  installment?: number;
  flat_name: string;
  maximum_capital: string;
  minimum_capital: string;
  interest_rate: string;
  spread: string;
  commission: string;
  refund_period: number;
  description: string;
  refund_duration_type: string;
  interest_on_arrears_for_each_day_of_delay: string,
  maximum_number_of_plan_operations:string
  operation_limit?: number;
  late_payment_interest?: number;
  statu?: {
    name: string;
    status_id:string
  };
  status_name: string
  statu_id?: string
  installment_quantity: number;
  avalable_installments?: InstallmentType[];
}


export type {
  PlanDataType,
  InstallmentType
};


enum statusOfPlan {
  active = "active",
  inactive = "inactive",
  pending = "pending"
}

function handleStatusPlan(status: statusOfPlan) {
  switch (status) {
    case statusOfPlan.active:
      return { status_name: "Activo", color: "green" }
    case statusOfPlan.inactive:
      return { status_name: "Inactivo", color: "red" }
    case statusOfPlan.pending:
      return { status_name: "Pendente", color: "orange" }
    default:
      return { status_name: "Desconhecido", color: "gray" }
  }
}


export { handleStatusPlan, statusOfPlan }