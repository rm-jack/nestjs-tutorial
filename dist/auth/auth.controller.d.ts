import { Response } from 'express';
import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(body: any, res: Response): Promise<any>;
    logout(req: Request, res: Response): any;
}
