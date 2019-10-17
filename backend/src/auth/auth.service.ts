import {HttpStatus, Injectable} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {User} from "../users/models/user.model";
import {AuthResponseModel} from "./models/auth-response.model";

const speakeasy = require('speakeasy');

@Injectable()
export class AuthService {

    private RESPONSE_ON_SUCCESS:AuthResponseModel = {
        message:"Logged in successfully",
        status: HttpStatus.OK};
    private RESPONSE_ON_WRONG_USER_PASSWORD:AuthResponseModel = {
        message: "Wrong username or password",
        status: HttpStatus.UNAUTHORIZED};
    private RESPONSE_ON_WRONG_CODE:AuthResponseModel = {
        message:"2FA CODE IS WRONG",
        status: HttpStatus.UNAUTHORIZED};

    constructor(private readonly usersService: UsersService) {
    }

    async validateUser(username: String, password: String, token: String): Promise<AuthResponseModel> {
        const user: User = await this.usersService.findByUserName(username);
        if (user && user.password === password) {
            if (this.verifyToken(user, token)) {
                return this.RESPONSE_ON_SUCCESS;
            }
            else {
                return this.RESPONSE_ON_WRONG_CODE;
            }
        }
        else {
            return this.RESPONSE_ON_WRONG_USER_PASSWORD;
        }
    }

    private verifyToken(user: User, token: String): boolean {
        return speakeasy.totp.verify({
            secret: user.authCode,
            encoding: 'base32',
            token: token,
        })
    }
}
