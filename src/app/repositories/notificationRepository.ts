import { Notification } from "../entities/notification";

export abstract class NotificationRepository {
  abstract create(nnotification: Notification): Promise<void>
}
