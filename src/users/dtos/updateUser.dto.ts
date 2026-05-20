import { PartialType } from '@nestjs/swagger';
import { RegisterUserDto } from 'src/auth/dtos/userRegister.dto';

export class UpdateUserDto extends PartialType(RegisterUserDto) {}
