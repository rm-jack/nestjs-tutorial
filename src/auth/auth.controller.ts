import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  //Can't set cookies in http:localhost
  // more info: https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies
  //   @UseGuards(LocalAuthGuard)
  //   @Post('login')
  //   async login(@Body() body, @Res({ passthrough: true }) res: Response) {
  //     const payload = { useremail: body.email };
  //     const user = this.authService.validateUser(body.email, body.password);

  //     if (user) {
  //       const { access_token } = await this.authService.login(payload);
  //       res.cookie('Authorization', access_token, {
  //         maxAge: 6000,
  //         path: '/',
  //       });
  //       return user;
  //     }
  //     return res.status(HttpStatus.NOT_FOUND).json({
  //       message: 'User Not Found',
  //     });
  //   }

  //   @UseGuards(JwtAuthGuard)
  //   @Post('logout')
  //   logout(@Req() req: Request, @Res() res: Response): any {
  //     res.cookie('Authorization', '', {
  //       maxAge: 0,
  //     });
  //     return res.send({
  //       message: 'success',
  //     });
  //   }
  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Body() body, @Res({ passthrough: true }) res: Response) {
    const payload = { useremail: body.email };
    const user = await this.authService.validateUser(body.email, body.password);
    if (user) {
      const { access_token } = await this.authService.login(payload);

      return { ...user, access_token: access_token };
    }
    return res.status(HttpStatus.NOT_FOUND).json({
      message: 'User Not Found',
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout(@Req() req: Request, @Res() res: Response): any {
    res.cookie('Authorization', '', {
      maxAge: 0,
    });
    return res.send({
      message: 'success',
    });
  }
}
