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
    throw new Error('Method not implemented.');
  }
 async save(notification: Notification): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
