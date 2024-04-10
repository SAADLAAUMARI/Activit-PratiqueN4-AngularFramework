import {  HttpInterceptorFn } from '@angular/common/http';

export const appHttpInterceptor: HttpInterceptorFn  = (req, next) =>{
       const modifiedReq = req.clone({
            headers: req.headers.set("Authorization", "Bearer JWT") // Remplacez 'Bearer JWT' par votre jeton d'authentification réel
        });
        return next(modifiedReq)
    };

