import Cookies from "js-cookie"
import { logout } from "./authController";
import { TokenResponse } from "../types/TokenResponse";

export function CheckForTokens(): boolean{
    const accessToken = Cookies.get("access")
    if (accessToken){
        return true;
    }
    const refreshToken = Cookies.get("refresh")
    console.log(refreshToken)
    if (refreshToken){
        try{
        RefreshTokens(refreshToken);
        return true;
        } catch (e){
            console.log(e)
            logout();
            return false;
        }
    }
    console.log("How?")
    return false;
}

export function GetTokens(){
    const success = CheckForTokens();
    if (!success) return new Error("Not logged in");
    else return Cookies.get("access")!;
}

async function RefreshTokens(refreshToken: string){
    const url = import.meta.env.VITE_BASE_API_DEV_URL + "/refresh"
    console.log("Refreshing tokens")
    const tokenString = `Bearer ${refreshToken}`
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({refresh: tokenString})
    }
    try{
        const res = await fetch(url, options)
        const tokens: TokenResponse = await  res.json();
        Cookies.set("access", tokens.accessToken, {expires: tokens.expiresIn, sameSite: "None"})
        Cookies.set("refresh", tokens.refreshToken, {expires: tokens.expiresIn * 8, sameSite: "None"})
    } catch(e){
        console.log(e)
        logout();
    }
}