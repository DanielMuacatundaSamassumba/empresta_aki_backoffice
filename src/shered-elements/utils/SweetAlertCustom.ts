
import Swal from "sweetalert2";

export function showSweetAlert({ title, text, icon }: { title: string; text: string; icon: 'success' | 'error' | 'warning' | 'info' | 'question' }) {

  return  Swal.fire({
    title,
    text,
    icon,
    
  })
}
