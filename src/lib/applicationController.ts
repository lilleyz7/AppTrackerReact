import { Application } from "@/types/Application";
import { GetTokens } from "./authUtils";

export async function getApplications(): Promise<Error | Application[]>{
    const token = GetTokens();
    if (typeof token !== "string"){
        return token
    }
    const baseUrl = import.meta.env.BASE_API_DEV_URL;
    const finalUrl = baseUrl + "/apps";
    const options = {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }
    try{
        const response = await fetch(finalUrl, options)
        const jsonData: Application[] = await response.json();
        return jsonData;
    } catch(e){
        const newError = new Error("" + e);
        return newError;
    }
}

export function getAppById(){

}

export function addApplication(){

}

export function updateApplication(){

}

export function deleteApplication(){

}