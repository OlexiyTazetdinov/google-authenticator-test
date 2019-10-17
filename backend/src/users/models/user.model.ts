import {Document} from "mongoose";

export interface User extends Document {
    readonly userName: String;
    readonly password: String;
    readonly authCode: String;
}

export const UserSchema = {
    userName: String,
    password: String,
    authCode: String
};