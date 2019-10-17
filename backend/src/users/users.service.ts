import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import {InjectModel} from "@nestjs/mongoose";
import {User} from "./models/user.model";

@Injectable()
export class UsersService {

    constructor(@InjectModel('User') private readonly user: Model<User>){}

    async findByUserName(userName:String): Promise<User> {
        return (await this.user.find({userName:userName}).exec())[0];
    }
}
