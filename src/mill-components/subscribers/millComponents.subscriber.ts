import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { MillComponentsEntity } from '../entities/millComponents.entity';
import { TemplatesEntity } from '../../templates/entities/templates.entity';

@EventSubscriber()
export class MillComponentsSubscriber
  implements EntitySubscriberInterface<MillComponentsEntity>
{
  listenTo() {
    return MillComponentsEntity;
  }

  async afterInsert(event: InsertEvent<MillComponentsEntity>) {
    const { manager, entity } = event;

    await manager.update(TemplatesEntity, entity.templateId, {
      status: 'complete',
    });
  }
}
