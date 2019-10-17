import {Body, Controller, Post} from '@nestjs/common';
import {AuthRequest} from "./models/auth-request.model";
import {AuthService} from "./auth.service";

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {
    }

    @Post()
    async authenticateUser(@Body() authRequest: AuthRequest) {
        console.log(authRequest.userName);
        return await this.authService.validateUser(authRequest.userName, authRequest.password, authRequest.token);
    }
}
