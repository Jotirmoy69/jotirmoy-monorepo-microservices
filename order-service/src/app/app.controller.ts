import { Controller, Get, Inject, Param } from '@nestjs/common'; 
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('orders')
export class AppController {
  constructor(@Inject('AUTH_SERVICE') private readonly authClient: ClientProxy){}

  @Get(':userId')
  async createOrder(@Param("userId") userId:string){
    const pattern = {cmd: 'validate_user'};
    const payload = {userId:Number(userId)}
    const authRes = await firstValueFrom(this.authClient.send(pattern,payload))
    if(authRes.status === 'success'){
      return {message: 'Order created successfully',user:authRes.user}
    }
    return {message: 'Order creation failed',error:authRes.message}
  }
}
