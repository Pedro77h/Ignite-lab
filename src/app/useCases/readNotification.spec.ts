import { ReadNotification } from './readNotification';
import { makeNotification } from '../../../test/factories/notification-factory';
import { NotificationNotFound } from './errors/notificationNotFound.error';
import { InMemoryNotificationRepository } from './../../../test/in-memory-notification-repository';


describe('Read notification', () => {
  it('should be able to Read notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();

    const readNotification = new ReadNotification(notificationRepository);

    const notification = makeNotification()
    

    await notificationRepository.create(notification);

    await readNotification.execute({ notificationId: notification.id })
    

    expect(notificationRepository.notifications[0].props.readAt).toEqual(expect.any(Date));
  });

  it('should not be able to Read notification if notification is not found', async () => { 

    const notificationRepository = new InMemoryNotificationRepository();

    const readNotification = new ReadNotification(notificationRepository);

    
    expect(() => {
      return readNotification.execute({
        notificationId: 'not-found',
      })
    }).rejects.toThrow(NotificationNotFound)
    
  })

});
