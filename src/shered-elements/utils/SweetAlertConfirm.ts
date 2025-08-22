import sweetAlert from 'sweetalert2';

export  function sweetAlertConfirm({
  confirmButtonText = 'Sim',
  cancelButtonText = 'Não',
  title,
  text
}: {
  title: string;
  text: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
}){
    return sweetAlert.fire({
        title:title,
        text: text,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: cancelButtonText,
        confirmButtonText: confirmButtonText
      })
}