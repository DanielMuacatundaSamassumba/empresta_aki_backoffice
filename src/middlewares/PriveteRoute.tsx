import Unauthorized from '@/modules/ErrorPages/Unauthorized';
import React from 'react'

export default function PriveteRoute({ allowedRoles, children }: { allowedRoles: string[], children: React.ReactNode }) {
    const dataUserInLocalStorage = localStorage.getItem("dataUser");

    const dataUser = JSON.stringify(dataUserInLocalStorage);
    const user = JSON.parse(dataUser);
    const role = JSON.parse(user).roles[0]
    return   allowedRoles.includes(role) ? <>{children}</>  : <Unauthorized/>
}
