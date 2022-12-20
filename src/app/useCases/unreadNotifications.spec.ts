import { ReadNotification } from './readNotification';
import { makeNotification } from '../../../test/factories/notification-factory';
import { NotificationNotFound } from './errors/notificationNotFound.error';
import { InMemoryNotificationRepository } from './../../../test/in-memory-notification-repository';
import { UnreadNotification } from './unreadNotification';


describe('Unread notification', () => {
  it('should be able to Unread notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const unreadNotification = new UnreadNotification(notificationRepository);

    const notification = makeNotification(
      {
        readAt: new Date()
     }
    )
    
    await notificationRepository.create(notification);

    await unreadNotification.execute({ notificationId: notification.id })
    

    expect(notificationRepository.notifications[0].props.readAt).toBeNull;
  });

  it('should not be able to Unread notification if notification is not found', async () => { 

    const notificationRepository = new InMemoryNotificationRepository();

    const unreadNotification = new UnreadNotification(notificationRepository);

    
    expect(() => {
      return unreadNotification.execute({
        notificationId: 'not-found',
      })
    }).rejects.toThrow(NotificationNotFound)
    
  })

});
