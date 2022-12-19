import { NotificationNotFound } from './../src/app/useCases/errors/notificationNotFound.error';
import { Notification } from 'src/app/entities/notification';
import { NotificationRepository } from 'src/app/repositories/notificationRepository';

export class InMemoryNotificationRepository implements NotificationRepository {
 
  public notifications: Notification[] = [];

  async create(notification: Notification) {
    this.notifications.push(notification);
  }

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = this.notifications.find(
      (item) => item.id === notificationId,
    );

    if (!notification) {
      throw new NotificationNotFound();
    }
    
    return notification;
  }
  async save(notification: Notification): Promise<void> {

    const notificationIndex = this.notifications.findIndex(
      item => item.id === notification.id
    )

    if (notificationIndex >= 0) {
        this.notifications[notificationIndex] = notification;
      }

  }

  async countManyByRecipientId(): Promise<number> {
    throw new Error('Method not implemented.');
  }

}
