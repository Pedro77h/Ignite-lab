import { NotificationViewModel } from './viewModels/notification-view-model';
import { SendNotification } from './../../../app/useCases/sendNotification';
import { CreateNotificationsBody } from '../dtos/createNotificationBody';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('notifications')
export class NotificationsController {
  constructor(private sendNotification: SendNotification) {}

  @Post('create')
  async createNotification(@Body() body: CreateNotificationsBody) {
    const { recipientId, content, category } = body;

    const { notification} = await this.sendNotification.execute({
      recipientId,
      content,
      category
    })

    return {
      notification: NotificationViewModel.toHTTP(notification)
    }
  }
}
