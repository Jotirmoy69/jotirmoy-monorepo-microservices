import { Controller } from '@nestjs/common'; 
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class AppController {
  @GrpcMethod('InventoryService', 'checkStock')
  checkStock( data: {productId:string}) {
    const items: Record<string, number> = {
      '123': 10,
      '456': 5,
      '789': 0,
    };
    const quantity = items[data.productId] || 0;
    return { inStock: quantity > 0, availableQuantity: quantity };
  }
}
