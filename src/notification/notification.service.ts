import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Notification } from './entities/notification.entity';

@Injectable()
export class NotificationService {
    constructor(
        @InjectRepository(Notification)
        private notificationRepository: Repository<Notification>,
    ) { }

    async create(createNotificationDto: CreateNotificationDto, userId: number): Promise<Notification> {
        const notification = this.notificationRepository.create({
            ...createNotificationDto,
            userId,
        });

        return this.notificationRepository.save(notification);
    }

    async findAll(userId: number): Promise<Notification[]> {
        return this.notificationRepository.find({
            where: { userId },
            order: { created_at: 'DESC' },
        });
    }

    async findUnread(userId: number): Promise<Notification[]> {
        return this.notificationRepository.find({
            where: { userId, isRead: false },
            order: { created_at: 'DESC' },
        });
    }

    async findOne(id: number, userId: number): Promise<Notification> {
        const notification = await this.notificationRepository.findOne({
            where: { id, userId },
        });

        if (!notification) {
            throw new NotFoundException(`Notificación con ID ${id} no encontrada`);
        }

        return notification;
    }

    async markAsRead(id: number, userId: number): Promise<Notification> {
        const notification = await this.findOne(id, userId);

        notification.isRead = true;
        notification.readAt = new Date();

        return this.notificationRepository.save(notification);
    }

    async markAllAsRead(userId: number): Promise<void> {
        await this.notificationRepository.update(
            { userId, isRead: false },
            { isRead: true, readAt: new Date() }
        );
    }

    async update(id: number, updateNotificationDto: UpdateNotificationDto, userId: number): Promise<Notification> {
        const notification = await this.findOne(id, userId);

        Object.assign(notification, updateNotificationDto);

        return this.notificationRepository.save(notification);
    }

    async remove(id: number, userId: number): Promise<void> {
        const notification = await this.findOne(id, userId);
        await this.notificationRepository.remove(notification);
    }

    async getUnreadCount(userId: number): Promise<number> {
        return this.notificationRepository.count({
            where: { userId, isRead: false },
        });
    }
}

