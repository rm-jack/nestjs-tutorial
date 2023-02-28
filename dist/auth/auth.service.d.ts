import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
interface IPayload {
    useremail: string;
    userid: number;
}
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<any>;
    login(payload: IPayload): Promise<{
        access_token: string;
    }>;
}
export {};
