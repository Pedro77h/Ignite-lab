import { makeNotification } from '../../../test/factories/notification-factory';
import { NotificationNotFound } from './errors/notificationNotFound.error';
import { InMemoryNotificationRepository } from './../../../test/in-memory-notification-repository';
import { CancelNotification } from './cancelNotification';

describe('Cancel notification', () => {
  it('should be able to cancel notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();

    const cancelNotification = new CancelNotification(notificationRepository);

    const notification = makeNotification()
    

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
