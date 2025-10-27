import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private configService: ConfigService,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request) => {
                    return request?.cookies?.access_token;
                },
            ]),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET') || 'tu_secret_key_muy_segura_aqui',
        });
    }

    async validate(payload: any) {
        const user = await this.userRepository.findOne({
            where: { id: payload.sub },
            relations: [
                'actor',
                'actor.person',
                'actor.organization',
            ],
        });

        if (!user || !user.isActive) {
            throw new UnauthorizedException('Usuario inactivo o no encontrado');
        }

        return user;
    }
}

