import { CreateNotificationsBody } from './infra/createNotificationBody';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { PrismaService } from './infra/prisma.service';
import { randomUUID } from 'node:crypto';

@Controller('notifications')
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  getHello() {
    return this.prisma.notifications.findMany();
  }

  @Post('create')
  async createNotification(@Body() body: CreateNotificationsBody) {
    const { recipientId, content, category } = body;

    return await this.prisma.notifications.create({
      data: {
        id: randomUUID(),
        content,
        category,
        recipientId,
      },
    });
  }
}
