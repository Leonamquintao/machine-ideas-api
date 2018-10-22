import 'dotenv/config';
import  * as jwt from "jsonwebtoken";
import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {

  async canActivate(context: ExecutionContext): Promise <boolean> {
    const request = context.switchToHttp().getRequest();
    if (!request.headers.authorization) {
      return false;
    }

    request.user = await this.validateToknen(request.headers.authorization);

    return true;
  }

  private async validateToknen(auth: string) {
    if (!auth) {
      throw new HttpException('Invalid or not provided token', HttpStatus.FORBIDDEN);
    }

    try {
      const decoded = await jwt.verify(auth, process.env.SECRET);
      return decoded;
    } catch (err) {
      const message = 'Token error: ' + (err.message || err.name);
      throw new HttpException(message, HttpStatus.FORBIDDEN);
    }
  }
}
