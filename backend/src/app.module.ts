import {Module} from '@nestjs/common';
import {AuthModule} from './auth/auth.module';
import {UsersModule} from './users/users.module';
import {MongooseModule} from "@nestjs/mongoose";

@Module({
    imports: [
        AuthModule,
        UsersModule,
        MongooseModule.forRoot('mongodb://localhost/googleAuthTest')
    ]
})
export class AppModule {
}
