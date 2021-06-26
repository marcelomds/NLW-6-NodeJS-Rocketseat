import {getCustomRepository} from "typeorm";
import {UsersRepositories} from "../repositories/UsersRepositories";

import {compare} from "bcryptjs";
import {sign} from "jsonwebtoken";

interface IAutheticateRequest {
    email: string;
    password: string;
}

class AuthenticateUserService {

    async execute({email, password}: IAutheticateRequest) {
        const usersRepositories = getCustomRepository(UsersRepositories);

        // Verificar se o E-mail existe
        const user = await usersRepositories.findOne({
            email
        });

        if (!user) {
            throw new Error("Email ou Senha incorretos");
        }

        // Verificar se a Senha está correta
        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new Error("Email ou Senha incorretos");
        }

        // Gerar o Token
        const token = sign({
            email: user.email
        }, "a35d09eb3ef97e60e0040fa231ebd256", {
            subject: user.id,
            expiresIn: "1d"
        })

        return token;
    }

}

export {AuthenticateUserService};