import Cookies from "js-cookie"

export function CheckForTokens(): boolean{
    const accessToken = Cookies.get("access")
    if (accessToken){
        return true;
    }
    const refreshToken = Cookies.get("refresh")
    if (refreshToken){
        try{
        RefreshTokens();
        return true;
        } catch (e){
            console.log(e)
            return false;
        }
    }
    return false;
}

export function GetTokens(){
    const success = CheckForTokens();
    if (!success) return new Error("Not logged in");
    else return Cookies.get("access")!;
}

function RefreshTokens(){

}