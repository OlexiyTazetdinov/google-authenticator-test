import {Body, Controller, Post, Res} from '@nestjs/common';
import {AuthRequest} from "./models/auth-request.model";
import {AuthService} from "./auth.service";
import {Response} from "express";

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {
    }

    @Post()
    async authenticateUser(@Body() authRequest: AuthRequest, @Res() res: Response) {
        const response = await this.authService.validateUser(authRequest.userName, authRequest.password, authRequest.token);
        res.status(response.status).json({message: response.message});
    }
}
