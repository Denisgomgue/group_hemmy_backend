import { Controller, Post, Body, Request, Response, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Public } from './decorators/public.decorator';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(
        @Body() loginDto: LoginDto,
        @Request() req,
        @Response() res,
    ) {
        const result = await this.authService.login(req.user);

        // Configurar cookies HTTP-only para mayor seguridad
        res.cookie('access_token', result.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días
            path: '/',
        });

        res.cookie('refresh_token', result.refresh_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 días
            path: '/',
        });

        return res.json({
            message: 'Inicio de sesión exitoso',
            user: result.user,
        });
    }

    @Public()
    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    async refresh(@Request() req, @Response() res) {
        const refreshToken = req.cookies?.refresh_token;

        if (!refreshToken) {
            return res.status(HttpStatus.UNAUTHORIZED).json({
                message: 'Token de actualización no proporcionado',
            });
        }

        const result = await this.authService.refreshToken(refreshToken);

        res.cookie('access_token', result.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: '/',
        });

        return res.json({
            message: 'Token actualizado exitosamente',
        });
    }

    @UseGuards(JwtAuthGuard)
    @Post('logout')
    @HttpCode(HttpStatus.OK)
    async logout(@Response() res) {
        // Eliminar cookies
        res.clearCookie('access_token');
        res.clearCookie('refresh_token');

        return res.json({
            message: 'Cierre de sesión exitoso',
        });
    }

    @UseGuards(JwtAuthGuard)
    @Post('profile')
    @HttpCode(HttpStatus.OK)
    async getProfile(@Request() req) {
        return req.user;
    }
}

