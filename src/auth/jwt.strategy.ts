import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from './constants';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

// const fromAuthCookie = () => {
//   return function (request) {
//     let token = null;
//     if (request && request.cookies) {
//       token = request.cookies['Authorization'];
//     }
//     return token;
//   };
// };

interface IPayload {
  useremail: string;
  userid: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }
  //!! validate function is only called after successful validation of JWT.
  async validate(payLoad: IPayload) {
    console.log('I AM HERE');
    //실제 유저가 있는지 확인하는 작업.
    const { useremail } = payLoad;
    const user: User = await this.userRepo.findOne({
      where: { email: useremail },
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
