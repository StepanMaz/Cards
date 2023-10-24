import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) {}

    add(user: User) {
        return this.usersRepository.save(this.usersRepository.create(user));
    }

    find(id: number) {
        return this.findBy("id", id);
    }

    findBy<T extends keyof User>(selector: T, value: User[T]) {
        return this.usersRepository.findOneBy({ [selector]: value });
    }

    findByUsernameOrEmail(value: string) {
        return this.usersRepository.findOneBy([
            { username: value },
            { email: value },
        ]);
    }
}
