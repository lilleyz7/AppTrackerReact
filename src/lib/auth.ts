import Cookies from "js-cookie"

export function CheckForTokens(): boolean{
    const accessToken = Cookies.get("access")
    const refreshToken = Cookies.get("refresh")
    if (accessToken){
        return true;
    }
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

function RefreshTokens(){

}