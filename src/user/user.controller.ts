import { Controller, Get, Post, Req, Response } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get('getInfo')
    getUserInfo(@Req() request): any {
        const token = request.header('Authorization').replace('Bearer ', '');
        return this.userService.getUserInfo(token);
    }

    @Post('create')
    createUser(@Req() request): any {
        return this.userService.createUser(request.body);
    }
    @Post('login')
    async getUser(@Req() request, @Response() response): Promise<any> {
        try {
            let result = await this.userService.getUser(request.body);
            return response.status(200).send(result);
        } catch (error) {
            return response.status(401).send({"error": "Please Check YOur Credentials"});
        }

    }

}
