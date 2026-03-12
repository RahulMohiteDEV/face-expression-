import axios from 'axios';

const api =  axios.create({
    baseURL:"http://localhost:3000",
    withCredentials: true,
})

export async function registerUser({email, password, username}) {
    const response = await api.post("/api/auth/register", 
        {email, password, username}
    )
    return response.data;
}

export async function loginUser({email, password, username}) {
    const response = await api.post("/api/auth/login", {
        email, password, username
    })
    return response.data;
}

export async function getmeUser(){
    const response = await api.get("/api/auth/get-user")
    return response.data;
}

export async function logoutUser() {

 const reaponse = await api.get("/api/auth/logout");
    return reaponse.data;
  
}