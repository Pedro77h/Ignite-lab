import { PrismaNotificationMapper } from './../mappers/prisma-notification-mapper';
import { PrismaService } from './../prisma.service';
import { Notification } from 'src/app/entities/notification';
import { NotificationRepository } from 'src/app/repositories/notificationRepository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaNotificationsRepository implements NotificationRepository {
  constructor(private prismaService: PrismaService) {}

  async create(notification: Notification) {
    const raw = PrismaNotificationMapper.toPrisma(notification);

    await this.prismaService.notifications.create({
      data: raw,
    });
  }

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = await this.prismaService.notifications.findUnique({
      where: {
        id: notificationId,
      },
    });

    if (!notification) return null;

    return PrismaNotificationMapper.toDomain(notification);
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[] | null> {

    const notifications = await this.prismaService.notifications.findMany({
      where: {
        recipientId
      }
    })

    return notifications.map(notification => PrismaNotificationMapper.toDomain(notification));

  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    const count = await this.prismaService.notifications.count({
      where: {
        recipientId,
      },
    });

    return count;
  }

  async save(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);


    await this.prismaService.notifications.update({
      where: {
        id: raw.id 
      },
      data:raw
    })

  } 
}
