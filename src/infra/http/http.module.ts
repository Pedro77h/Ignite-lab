import { UnreadNotification } from './../../app/useCases/unreadNotification';
import { ReadNotification } from './../../app/useCases/readNotification';
import { GetRecipientNotification } from './../../app/useCases/getRecipientNotifications';
import { CountRecipientNotification } from './../../app/useCases/countRecipientNotifications';
import { CancelNotification } from './../../app/useCases/cancelNotification';
import { DatabaseModule } from './../database/database.module';
import { SendNotification } from './../../app/useCases/sendNotification';
import { NotificationsController } from './controllers/notifications.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotification,
    CancelNotification,
    CountRecipientNotification,
    GetRecipientNotification,
    ReadNotification,
    UnreadNotification
  ]
})
export class HttpModule {}
