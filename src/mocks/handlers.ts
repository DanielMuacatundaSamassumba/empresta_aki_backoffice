import { http, HttpResponse, } from 'msw'
import { db } from '@/mocks/db'

export const handlers = [
    http.get("/api/customer/list", async () => {
        const usersData = localStorage.getItem("users");
        const currentData = usersData ? JSON.parse(usersData) : [];
        return HttpResponse.json(
           
                {
                    data: currentData
                }

        )
    }),

    http.post("/api/customer/create", async ({ request }) => {
        const requestBody = await request.json()
        const response = await db.create(requestBody)
        return HttpResponse.json({
            data: response
        })
    }),

    http.get("/api/customer/show", async ({ request }) => {
        const url = new URL(request.url)
        const idClient: string = url.searchParams.get('id') ?? '';
        const response = await db.fundClient(idClient)
        return HttpResponse.json({
            data: response
        })
    }),
    http.put("/api/customer/update", async ({ request,  }) => {
        const requestBody = await request.json()
        const url = new URL(request.url)
        const idClient: string = url.searchParams.get('id') ?? '';
        const response = await db.fundClient(idClient)
         if( response ){
            const upDateClient = await db.updateClient(idClient, requestBody)
            return HttpResponse.json({
                data: upDateClient
            })
         }
    }),
    http.delete("/api/customer/delete", async ({ request,  }) => {
        const url = new URL(request.url)
        const idClient: string = url.searchParams.get('id') ?? '';
        const response = await db.fundClient(idClient)
         if( response ){
            const upDateClient = await db.deleClient(idClient)
            console.log(upDateClient)
            return HttpResponse.json({
                data: response
            })
         }
    })

]