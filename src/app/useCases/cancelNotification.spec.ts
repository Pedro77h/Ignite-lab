import { NotificationNotFound } from './errors/notificationNotFound.error';
import { InMemoryNotificationRepository } from './../../../test/in-memory-notification-repository';
import { Notification } from '../entities/notification';
import { SendNotification } from './sendNotification';
import { CancelNotification } from './cancelNotification';
import { Content } from '../entities/content';

describe('Cancel notification', () => {
  it('should be able to cancel notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();

    const cancelNotification = new CancelNotification(notificationRepository);

    const notification = new Notification({
      content: new Content('Nova Solicitação'),
      category: 'social',
      recipientId: 'example-recipient-Id',
    });

    await notificationRepository.create(notification);

    await cancelNotification.execute({ notificationId: notification.id })
    

    expect(notificationRepository.notifications[0].props.canceledAt).toEqual(expect.any(Date));
  });

  it('should not be able to cancel notification if notification is not found', async () => { 

    const notificationRepository = new InMemoryNotificationRepository();

    const cancelNotification = new CancelNotification(notificationRepository);

    
    expect(() => {
      return cancelNotification.execute({
        notificationId: 'not-found',
      })
    }).rejects.toThrow(NotificationNotFound)
    
  })

});
