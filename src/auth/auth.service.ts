import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
interface IPayload {
  useremail: string;
  userid: number;
}
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    // console.log(user);
    if (user && user.password === password) {
      const { password, ...result } = user;
      // console.log(result);
      return result;
    }
    return null;
  }

  async login(payload: IPayload) {
    const payLoad = { useremail: payload.useremail, userid: payload.userid };
    return {
      access_token: this.jwtService.sign(payLoad, {
        algorithm: 'HS256',
      }),
    };
  }

  // public getCookieWithJwtToken(payload: Payload) {
  //   const token = this.jwtService.sign(payload);
  //   return `Authorization=${token}; httpOnly=true; Path=/; Max-Age=6000;`;
  // }
}
