import { EntityRepository, Repository } from "typeorm";
import { Tag } from "../../entities/Tag/Tag";

@EntityRepository(Tag)
class TagsRepositories extends Repository<Tag>{}

export { TagsRepositories };