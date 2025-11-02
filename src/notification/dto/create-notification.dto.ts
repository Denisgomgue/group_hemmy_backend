import { IsEnum, IsString, IsOptional, IsUrl, MinLength, MaxLength } from 'class-validator';
import { NotificationType, NotificationCategory } from '../entities/notification.entity';

export class CreateNotificationDto {
    @IsEnum(NotificationType)
    type: NotificationType;

    @IsEnum(NotificationCategory)
    category: NotificationCategory;

    @IsString()
    @MinLength(3)
    @MaxLength(100)
    title: string;

    @IsString()
    @MinLength(5)
    message: string;

    @IsString()
    @IsOptional()
    details?: string;

    @IsUrl()
    @IsOptional()
    actionUrl?: string;

    @IsOptional()
    relatedEntityId?: number;

    @IsString()
    @IsOptional()
    relatedEntityType?: string;
}

