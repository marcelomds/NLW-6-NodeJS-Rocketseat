import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {

    // Receber o token
    const authToken = request.headers.authorization;

    // Validar se token está preenchido
    if (!authToken) {
        return response.status(401).end();
    }

    // Tirar o nome Bearer e pegar apenas o token
    const [, token] = authToken.split(" ");

    // Validar se o token é válido
    try{
        const { sub } = verify(token, "a35d09eb3ef97e60e0040fa231ebd256") as IPayload;

        // Recuperar informações do usuário
        request.user_id = sub;

        return next();
    } catch (err) {
        return response.status(401).end();
    }

}