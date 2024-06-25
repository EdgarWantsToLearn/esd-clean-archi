import { Order } from 'packages/backend/src/order/domain/entity/order.entity';

export class OrderCreatedEvent {
  public readonly payload: Order;

  constructor(order: Order) {
    this.payload = order;
  }
}
