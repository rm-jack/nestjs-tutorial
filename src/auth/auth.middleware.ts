import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { NestMiddleware, HttpStatus, Injectable } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { jwtConstants } from './constants';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeaders = req.headers.authorization;
    // console.log(authHeaders);
    if (authHeaders && (authHeaders as string).split(' ')[1]) {
      const token = (authHeaders as string).split(' ')[1];
      try {
        const decoded: any = this.jwtService.decode(token);
        if (decoded !== null) {
          //   console.log('This is from middleware');
          //   console.log(decoded);
          //   console.log(decoded.userid);
          const user = await this.userService.findOneById(decoded.userid);
          //   console.log(user);
          req.body.id = user.id;
          next();
          if (!user) {
            throw new HttpException('User not found.', HttpStatus.UNAUTHORIZED);
          }
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      throw new HttpException('Not authorized.', HttpStatus.UNAUTHORIZED);
    }
  }
}
