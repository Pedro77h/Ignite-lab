import { NotificationNotFound } from './errors/notificationNotFound.error';
import { Injectable } from '@nestjs/common';
import { Content } from '../entities/content';
import { Notification } from '../entities/notification';
import { NotificationRepository } from '../repositories/notificationRepository';

interface CountRecipientNotificationRequest {
  recipientId: string;
}

interface CountRecipientNotificationResponse {
  count: number;
}

@Injectable()
export class CountRecipientNotification {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(
    request: CountRecipientNotificationRequest,
  ): Promise<CountRecipientNotificationResponse> {
    const { recipientId } = request;

    const count= await this.notificationRepository.countManyByRecipientId(
      recipientId,
    );

    return { count };
  }
}
