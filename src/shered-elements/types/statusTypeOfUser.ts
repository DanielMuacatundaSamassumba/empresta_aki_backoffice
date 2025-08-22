export type StatusTypeOfUser = {
  status_type_id: string;
  name: string;
  created_at: string; // formato ISO date string
  updated_at: string;
  deleted_at: string | null;
  status_type_status: {
    status_type_status_id: string;
    status_id: string;
    status_type_id: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    status: {
      status_id: string;
      name: string;
      code: number;
      created_at: string;
      updated_at: string;
      deleted_at: string | null;
    };
  }[];
};