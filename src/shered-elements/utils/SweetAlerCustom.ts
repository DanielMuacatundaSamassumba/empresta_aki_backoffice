import Swal from "sweetalert2"
import type { SweetAlertIcon } from "sweetalert2";


export function sweetAlertCustum(title: string,
    text: string,
    icon: SweetAlertIcon) {
    Swal.fire({
        title: title,
        text: text,
        icon: icon
    });
}