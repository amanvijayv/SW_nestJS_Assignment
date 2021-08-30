import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column({
        nullable: true,
    })
    lastName: string;

    @Column({
        unique: true,
    })
    email: string;

    @Column()
    password: string;

    @Column({ type: 'bigint' })
    phone: string;

    @Column({
        nullable: true,
    })
    hobbies: string;

    @Column({
        nullable: true,
    })
    skills: string;

    @Column({
        nullable: true,
    })
    token: string;

}