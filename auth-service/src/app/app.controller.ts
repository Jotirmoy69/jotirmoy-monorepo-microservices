import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import {MessagePattern,Payload} from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'validate_user' })
  handleUserValidation(@Payload() data:any){
    console.log("auth service received data:",data);
    if(data.userId === 1 ){
      return {status:"success",message:"User is valid",user:{id:data.userId,name:"John Doe"}};
    }

    return {status:"error",message:"User is not valid"};
  }
   
}
