import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { RedisModule, RedisService } from 'nestjs-redis';
import { UserEntity } from '../user/user.entity';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async () => ({
                secret: process.env.JWT_SECRET,
                signOptions: {
                    expiresIn: process.env.JWT_EXPIRATION_TIME,
                },
            }),
            inject: [ConfigService],
        }),
        TypeOrmModule.forFeature([UserEntity]),
        UserModule,
        // RedisModule.register({
        //     url: 'redis://localhost:6379',
        // }),
    ],
    controllers: [AuthController],
    providers: [AuthService, UserService, JwtStrategy],
})
export class AuthModule {}
