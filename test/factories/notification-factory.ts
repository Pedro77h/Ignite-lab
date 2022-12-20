import { Content } from "../../src/app/entities/content";
import { Notification  , NotificationProps} from "../../src/app/entities/notification";


type Override = Partial<NotificationProps>

export function makeNotification(override: Override = {}) {
  return new Notification({
    content: new Content('Nova Solicitação'),
    category: 'social',
    recipientId: 'recipient-1',
    ...override
  })
}