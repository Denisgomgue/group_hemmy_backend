import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { User } from '../users/entities/user.entity';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) { }

    async validateUser(email: string, password: string): Promise<any> {
        // Buscar usuario por email en person
        const user = await this.userRepository
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.actor', 'actor')
            .leftJoinAndSelect('actor.person', 'person')
            .where('person.email = :email', { email })
            .andWhere('user.isActive = :isActive', { isActive: true })
            .getOne();

        if (!user) {
            throw new UnauthorizedException('Credenciales inválidas');
        }

        // Verificar contraseña
        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Credenciales inválidas');
        }

        // Retornar datos del usuario sin la contraseña
        const { passwordHash, ...result } = user;
        return result;
    }

    async login(user: any) {
        const payload = {
            sub: user.id,
            email: user.actor?.person?.email,
            actorId: user.actor?.id
        };

        const accessToken = this.jwtService.sign(payload);
        const refreshToken = this.jwtService.sign(payload, {
            secret: this.configService.get<string>('JWT_REFRESH_SECRET') || 'refresh_secret_key',
            expiresIn: '30d',
        });

        return {
            access_token: accessToken,
            refresh_token: refreshToken,
            user: {
                id: user.id,
                email: user.actor?.person?.email,
                actorId: user.actor?.id,
            },
        };
    }

    async refreshToken(refreshToken: string) {
        try {
            const payload = this.jwtService.verify(refreshToken, {
                secret: this.configService.get<string>('JWT_REFRESH_SECRET') || 'refresh_secret_key',
            });

            const user = await this.userRepository.findOne({
                where: { id: payload.sub },
                relations: [ 'actor', 'actor.person' ],
            });

            if (!user || !user.isActive) {
                throw new UnauthorizedException('Usuario inactivo');
            }

            const newPayload = {
                sub: user.id,
                email: user.actor?.person?.email,
                actorId: user.actor?.id
            };

            const newAccessToken = this.jwtService.sign(newPayload);

            return {
                access_token: newAccessToken,
            };
        } catch (error) {
            throw new UnauthorizedException('Token inválido');
        }
    }

    async validateToken(token: string): Promise<any> {
        try {
            return this.jwtService.verify(token);
        } catch (error) {
            throw new UnauthorizedException('Token inválido');
        }
    }
}

