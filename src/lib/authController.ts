import { TokenResponse } from "@/types/TokenResponse";
import Cookies from "node_modules/@types/js-cookie";

interface RequestBody{
    email: string,
    password: string
}

export async function login(email: string, password: string){
    const url = import.meta.env.BASE_API_DEV_URL + "/api/login";
    const body: RequestBody = {email: email, password: password}
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    }

    const res = await makeRequest(url, options);
    if (typeof res === "string"){
        return new Error(res);
    }
    Cookies.set("access", res.access);
    Cookies.set("refresh", res.refresh);

}

export function register(){

}

export function logout(){

}

async function makeRequest(url: string, options: RequestInit){
    try{
        const response = await fetch(url, options);
        const jsonData: TokenResponse = await response.json();
        return jsonData;
    } catch(e){
        return "failed to get data with error: " + e;
    }
}