import { Notification } from './../entities/notification';
import { NotificationNotFound } from './errors/notificationNotFound.error';
import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../repositories/notificationRepository';

interface getRecipientNotificationRequest {
  recipientId: string;
}

interface getRecipientNotificationResponse {
  notifications: Notification[] | null;
}

@Injectable()
export class GetRecipientNotification {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(
    request: getRecipientNotificationRequest,
  ): Promise<getRecipientNotificationResponse> {
    const { recipientId } = request;

    const notifications =
      await this.notificationRepository.findManyByRecipientId(recipientId);

    return { notifications };
  }
}
