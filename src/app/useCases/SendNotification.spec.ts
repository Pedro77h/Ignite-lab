import { InMemoryNotificationRepository } from './../../../test/in-memory-notification-repository';
import { Notification } from '../entities/notification';
import { SendNotification } from './sendNotification';


describe('Send notification', () => {
  it('should be able to send a notification', async () => {

    const notificationRepository= new InMemoryNotificationRepository()

    const sendNotification = new SendNotification(notificationRepository);

    const { notification } = await sendNotification.execute({
      content: 'This is a notification',
      category: 'social',
      recipientId: 'example-recipient-Id',
    });


    expect(notificationRepository.notifications).toHaveLength(1)
    expect(notificationRepository.notifications[0]).toEqual(notification)

  });
});
