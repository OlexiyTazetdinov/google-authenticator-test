import {Injectable} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {User} from "../users/models/user.model";

const speakeasy = require('speakeasy');

@Injectable()
export class AuthService {

    private MESSAGE_ON_SUCCESS = "Logged in successfully";
    private MESSAGE_ON_WRONG_USER_PASSWORD = "Wrong username or password";
    private MESSAGE_ON_WRONG_CODE = "2FA CODE IS WRONG";

    constructor(private readonly usersService: UsersService) {
    }

    async validateUser(username: String, password: String, token: String): Promise<String> {
        const user: User = await this.usersService.findByUserName(username);
        console.log(user);
        if (user && user.password === password) {
            if (this.verifyToken(user, token)) {
                return this.MESSAGE_ON_SUCCESS;
            }
            else {
                return this.MESSAGE_ON_WRONG_CODE;
            }
        }
        else {
            return this.MESSAGE_ON_WRONG_USER_PASSWORD;
        }
    }

    private verifyToken(user: User, token: String): boolean {
        // console.log("token:", token);
        // var secret = speakeasy.generateSecret();
        // // var anotherToken = speakeasy.totp({
        // //     secret: secret32,
        // //     encoding: 'ascii'
        // // });
        // console.log("SECRET:", secret);
        // // console.log("SPEAKEASY: ", speakeasy.totp.verifyDelta({
        // //     secret: user.authCode,
        // //     encoding: 'ascii',
        // //     token: token,
        // //     window: 2,
        // //     step: 60
        // // }));
        // // console.log("SPEAKEASY: ", speakeasy);
        // console.log("USER AUTH CODE: ", user.authCode);
        // console.log(speakeasy.totp.verify({
        //     secret: user.authCode,
        //     encoding: 'base32',
        //     token: token,
        // }));
        return speakeasy.totp.verify({
            secret: user.authCode,
            encoding: 'base32',
            token: token,
        })
    }
}
