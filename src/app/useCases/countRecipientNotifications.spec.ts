import { InMemoryNotificationRepository } from './../../../test/in-memory-notification-repository';
import { CountRecipientNotification } from './countRecipientNotifications';
import { Notification } from '../entities/notification';
import { Content } from '../entities/content';
import { makeNotification } from '../../../test/factories/notification-factory';

describe('Count Recipient notification', () => {
  it('should be able to count recipient notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();

    const countRecipientNotification = new CountRecipientNotification(
      notificationRepository,
    );

    const recipient = 'recipient';

    await notificationRepository.create(
      new Notification({
        content: new Content('Nova Solicitação'),
        category: 'social',
        recipientId: recipient,
      }),
    );

    const notification = makeNotification({
      recipientId: recipient,
    });

    await notificationRepository.create(notification);

    const { count } = await countRecipientNotification.execute({
      recipientId: recipient,
    });
 

     expect(count).toEqual(2); 
  });
});
