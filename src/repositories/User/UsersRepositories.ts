import { EntityRepository, Repository } from "typeorm";
import { User } from "../../entities/User/User";

@EntityRepository(User)
class UsersRepositories extends Repository<User>{}

export { UsersRepositories };