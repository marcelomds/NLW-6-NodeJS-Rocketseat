import { EntityRepository, Repository } from "typeorm";
import { Compliment } from "../../entities/Compliment/Compliment";


@EntityRepository(Compliment)
class ComplimentsRepositories extends Repository<Compliment> {}

export { ComplimentsRepositories };