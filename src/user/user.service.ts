import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/User';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as jsonwebtoken from 'jsonwebtoken';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }
    // Service to get user information
    async getUserInfo(token): Promise<any> {
        try {
            const decoded = jsonwebtoken.verify(token, "nestjs");
            const user = await this.usersRepository.findOne({ where: { id: decoded._id, token: token } });
            return user;
        } catch (error) {
            return error;
        }

    }
    // Signup Service
    async createUser(user): Promise<any> {
        try {
            user.password = await bcrypt.hash(user.password, 8);
            let result = await this.usersRepository.save(user);
            // for token
            const token = jsonwebtoken.sign({ _id: result.id.toString() }, "nestjs");
            result.token = token;
            let response = await this.usersRepository.save(result);

            return response;
        } catch (error) {

            return { "error": error.detail };
        }

    }
    // Login Service
    async getUser(user): Promise<User> {
        let password = user.password;
        const userInfo = await this.usersRepository.findOne({ where: { email: user.email } });
        if (!userInfo) {
            console.log("unable to login")
            throw new Error('Unable to login')
        }
        const isMatch = await bcrypt.compare(password, userInfo.password);
        if (!isMatch) {
            throw new Error('Unable to login');
        }
        // for token generation
        const token = jsonwebtoken.sign({ _id: userInfo.id.toString() }, "nestjs");
        userInfo.token = token;
        let response = await this.usersRepository.save(userInfo);
        return response;
    }
}
