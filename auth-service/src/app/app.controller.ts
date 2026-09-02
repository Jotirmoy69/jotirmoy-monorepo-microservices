import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {MessagePattern,Payload} from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'validate_user' })
  handleUserValidation(@Payload() data:any){
    console.log("auth service received data:",data);
    if(data.id === 1 ){
      return {status:"success",message:"User is valid"};
    }

    return {status:"error",message:"User is not valid"};
  }
   
}
