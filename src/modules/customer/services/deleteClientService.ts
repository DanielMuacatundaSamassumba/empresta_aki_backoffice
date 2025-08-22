export async function  deleteClientService (id:string){
  try {
    const response =  await fetch(`/api/customer/delete?id=${id}`, {
        method: 'DELETE',
        headers:{
            'Content-Type': 'application/json',
        },
    })
    return response
  } catch (error) {
    console.error(error)
  }
}