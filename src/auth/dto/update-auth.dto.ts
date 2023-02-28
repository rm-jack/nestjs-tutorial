import { PartialType } from '@nestjs/swagger';
import { UserAuthDto } from './user-auth.dto';

export class UpdateAuthDto extends PartialType(UserAuthDto) {}
