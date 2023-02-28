import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
// interface Payload {
//   useremail: string;
// }
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

  async login(user: any) {
    const payload = { useremail: user.email };
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '6000' }),
    };
  }

  // public getCookieWithJwtToken(payload: Payload) {
  //   const token = this.jwtService.sign(payload);
  //   return `Authorization=${token}; httpOnly=true; Path=/; Max-Age=6000;`;
  // }
}
