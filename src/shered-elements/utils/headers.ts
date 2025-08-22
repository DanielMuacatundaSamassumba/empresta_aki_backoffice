
export function headerConfig() {
  const token = localStorage.getItem("token")
    return {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` })
      }
    };
  }
  
export  function headerInformation(){
  const token = localStorage.getItem("token")
   return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` })
   }
}