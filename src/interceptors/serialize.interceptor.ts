import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass, plainToClassFromExist } from 'class-transformer';
// import {UserDto} from "../users/dtos/user.dto";

interface ClassConstructor {
  new (...args: any[]): {};
}

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}
  intercept(
    context: ExecutionContext,
    handler: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    //run before the handler
    // console.log("Running before the handler");
    // console.log(context);

    return handler.handle().pipe(
      map((data: any) => {
        return plainToClass(this.dto, data, {
          excludeExtraneousValues: true,
        });
        // return plainToClassFromExist(new this.dto(),data,{
        //     excludeExtraneousValues:true,
        // })

        // //run after the req handler
        // console.log("Running after the handler");
        // console.log(data);
      }),
    );
  }
}
