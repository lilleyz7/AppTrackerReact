import { Application } from "@/types/Application";
import { GetTokens } from "./authUtils";
import { ApplicationDTO } from "../types/ApplicationDTO";

export async function getApplications(): Promise<Error | Application[]>{
    const token = GetTokens();
    if (typeof token !== "string"){
        return token
    }
    const baseUrl = import.meta.env.VITE_BASE_API_DEV_URL;
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

export async function addApplication(appToAdd: ApplicationDTO): Promise<string | undefined>{
    const token = GetTokens();
    if (typeof token !== "string"){
        return token.message
    }
    const baseUrl = import.meta.env.VITE_BASE_API_DEV_URL;
    const finalUrl = baseUrl + "/addApp";
    const options = {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(appToAdd)
    }
    console.log(JSON.stringify(appToAdd))
    try{
        const response = await fetch(finalUrl, options)
        if (!response.ok){
            return response.text()
        }
    } catch(e){
        return "" + e;
    }
}

export function updateApplication(){

}

export async function deleteApplication(appId: string){
    const token = GetTokens();
    if (typeof token !== "string"){
        return token
    }

    const url = import.meta.env.VITE_BASE_API_DEV_URL + `/delete/${appId}`
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    }

    try{
        const result = await fetch(url, options)
        if (!result.ok){
            return result.text()
        }
    } catch(e){
        return e + ""
    }
}