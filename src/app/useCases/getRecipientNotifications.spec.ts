import { GetRecipientNotification } from './getRecipientNotifications';
import { InMemoryNotificationRepository } from './../../../test/in-memory-notification-repository';
import { Notification } from '../entities/notification';
import { makeNotification } from '../../../test/factories/notification-factory';

describe('GetRecipient notification', () => {
  it('should be able to get recipient notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();

    const getRecipientNotification = new GetRecipientNotification(
      notificationRepository,
    );

    const recipientId = 'recipient';

    await notificationRepository.create(
      makeNotification({
        recipientId,
      }),
    );

    await notificationRepository.create(
      makeNotification({
        recipientId,
      }),
    );

    const { notifications } = await getRecipientNotification.execute({
      recipientId,
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId }),
        expect.objectContaining({ recipientId }),
      ]),
    );
  });
});
