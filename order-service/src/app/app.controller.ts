// import { Controller, Get, Inject, Param } from '@nestjs/common'; 
// import { ClientProxy } from '@nestjs/microservices';
// import { firstValueFrom } from 'rxjs';

// @Controller('orders')
// export class AppController {
//   constructor(@Inject('AUTH_SERVICE') private readonly authClient: ClientProxy){}

//   @Get(':userId')
//   async createOrder(@Param("userId") userId:string){
//     const pattern = {cmd: 'validate_user'};
//     const payload = {userId:Number(userId)}
//     const authRes = await firstValueFrom(this.authClient.send(pattern,payload))
//     if(authRes.status === 'success'){
//       return {message: 'Order created successfully',user:authRes.user}
//     }
//     return {message: 'Order creation failed',error:authRes.message}
//   }
// }
import { Controller , Inject, OnModuleInit  ,Get, Query  } from '@nestjs/common';   
import { lastValueFrom, Observable } from 'rxjs';


interface InventoryService{
  checkStock(data:{productId:string}):Observable<any>
}
@Controller('orders')
export class AppController implements OnModuleInit{
  private inventoryService!:InventoryService

  constructor(@Inject('INVENTORY_PACKAGE') private client:ClientGrpc){}

  onModuleInit() {
    this.inventoryService = this.client.getService<InventoryService>('InventoryService')
  }

  @Get('check-item')
  async checkItem(@Query('pid') pid:string){
    const stockStatus = await lastValueFrom(this.inventoryService.checkStock({productId:pid}))

    if(stockStatus.inStock){
      return {
        status:"available",
        quantity:stockStatus.availableQuantity
      }
    } 
    return {status:'out of Stock'}
  }


}