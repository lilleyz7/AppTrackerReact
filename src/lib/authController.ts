import { TokenResponse } from "@/types/TokenResponse";
import Cookies from "js-cookie";
interface RequestBody{
    email: string,
    password: string
}

export async function login(email: string, password: string){
    const baseUrl = import.meta.env.VITE_BASE_API_DEV_URL;
    console.log(baseUrl)
    const url = baseUrl + "/login"
    const body: RequestBody = {email: email, password: password}
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    }

    const res = await makeLoginRequest(url, options);
    if (typeof res === "string"){
        return new Error(res);
    }
    Cookies.set("access", res.access, {expires: res.expiresIn});
    Cookies.set("refresh", res.refresh, {expires: res.expiresIn * 8});

}

export async function register(email: string, password: string){
    const url = import.meta.env.VITE_BASE_API_DEV_URL + "/register";
    const body: RequestBody = {email: email, password: password}
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    }

    const res = await makeRegistrationRequest(url, options);
    if (typeof res === "string"){
        return new Error(res);
    }
}

export function logout(){
    Cookies.remove("access")
    Cookies.remove("refresh")
}

async function makeLoginRequest(url: string, options: RequestInit){
    try{
        const response = await fetch(url, options);
        const jsonData: TokenResponse = await response.json();
        return jsonData;
    } catch(e){
        return "failed to get data with error: " + e;
    }
}

export async function makeRegistrationRequest(url: string, options: RequestInit){
    try{
        const response = await fetch(url, options);
        if (response.status >= 200){
            return
        } else{
            return Error("Bad request")
        }
    } catch(e){
        return new Error(e + "");
    }
}