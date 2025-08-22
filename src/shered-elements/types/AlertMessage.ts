import type { AlertColor, AlertPropsColorOverrides } from "@mui/material";
import type { OverridableStringUnion } from "@mui/types";

export interface AlertMessage{
    message:string,
    statusOfMessege: OverridableStringUnion<AlertColor, AlertPropsColorOverrides> | undefined
}