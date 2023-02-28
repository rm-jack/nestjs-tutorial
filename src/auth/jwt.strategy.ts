import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';
import { AuthService } from './auth.service';
import { Request as RequestType } from 'express';

// const fromAuthCookie = () => {
//   return function (request) {
//     let token = null;
//     if (request && request.cookies) {
//       token = request.cookies['Authorization'];
//     }
//     return token;
//   };
// };

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: RequestType) => {
          return request?.cookies?.Authorization;
        },
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }
  //!! validate function is only called after successful validation of JWT.
  async validate(payload: any) {
    console.log('I AM HERE');
    return { id: payload.sub, email: payload.email };
  }
}
