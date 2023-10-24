import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";
import * as crypto from "crypto";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column({ unique: true })
    email: string;

    @Column()
    passwordHash: string;

    @Column()
    salt: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    setPassword(password: string): void {
        this.salt = crypto.randomBytes(16).toString("hex");
        this.passwordHash = crypto
            .pbkdf2Sync(password, this.salt, 10000, 64, "sha512")
            .toString("hex");
    }

    isValidPassword(password: string): boolean {
        const hash = crypto
            .pbkdf2Sync(password, this.salt, 10000, 64, "sha512")
            .toString("hex");
        return this.passwordHash === hash;
    }
}
