import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { User } from '../users/entities/user.entity';

@Module({
    imports: [
        UsersModule,
        PassportModule,
        TypeOrmModule.forFeature([ User ]),
        JwtModule.registerAsync({
            imports: [ ConfigModule ],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET') || 'tu_secret_key_muy_segura_aqui',
                signOptions: {
                    expiresIn: '7d'
                },
            }),
            inject: [ ConfigService ],
        }),
    ],
    controllers: [ AuthController ],
    providers: [ AuthService, JwtStrategy, LocalStrategy ],
    exports: [ AuthService ],
})
export class AuthModule { }