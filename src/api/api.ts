import axios from "axios"

export const api = axios.create({
       baseURL:"https://emprestaki.beeangola.com/api",
       //baseURL:"http://192.168.100.78:8000/api"
})