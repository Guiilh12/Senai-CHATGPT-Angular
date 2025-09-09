import { inject } from "@angular/core"
// import { routes } from "./app/app.routes"
import { Router } from "@angular/router";

export const authGuard = () => {
    const router = inject(Router);
    const token = localStorage.getItem("meuToken");
    const userId = localStorage.getItem("userId");

    if ( token != null && userId != null){
        return true;

    }else{
        router.navigate(["/login"]);
        return false;
    }

}