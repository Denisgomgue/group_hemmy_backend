import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, HttpCode, HttpStatus } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Public } from '../auth/decorators/public.decorator';

@Controller('notification')
@UseGuards(JwtAuthGuard)
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) { }

    @Post()
    @Public() // Permitir crear notificaciones sin autenticación (para eventos del sistema)
    create(@Body() createNotificationDto: CreateNotificationDto, @Request() req) {
        const userId = req.user?.id || createNotificationDto[ 'userId' ];
        if (!userId) {
            throw new Error('Usuario no especificado');
        }
        return this.notificationService.create(createNotificationDto, userId);
    }

    @Get()
    findAll(@Request() req) {
        return this.notificationService.findAll(req.user.id);
    }

    @Get('unread')
    findUnread(@Request() req) {
        return this.notificationService.findUnread(req.user.id);
    }

    @Get('count')
    getUnreadCount(@Request() req) {
        return this.notificationService.getUnreadCount(req.user.id);
    }

    @Get(':id')
    findOne(@Param('id') id: string, @Request() req) {
        return this.notificationService.findOne(+id, req.user.id);
    }

    @Patch(':id/read')
    @HttpCode(HttpStatus.OK)
    markAsRead(@Param('id') id: string, @Request() req) {
        return this.notificationService.markAsRead(+id, req.user.id);
    }

    @Patch('read-all')
    @HttpCode(HttpStatus.OK)
    markAllAsRead(@Request() req) {
        return this.notificationService.markAllAsRead(req.user.id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateNotificationDto: UpdateNotificationDto, @Request() req) {
        return this.notificationService.update(+id, updateNotificationDto, req.user.id);
    }

    @Delete(':id')
    remove(@Param('id') id: string, @Request() req) {
        return this.notificationService.remove(+id, req.user.id);
    }
}

