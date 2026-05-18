import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  IsArray,
  IsOptional,
  ArrayUnique,
  IsInt,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
  @ApiProperty({
    description: 'Array of role IDs to assign to the user (optional)',
    example: [1, 3],
    type: [Number],
    required: false,
    isArray: true,
  })
  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsInt({ each: true })
  roles?: number[];

  @ApiProperty({
    description: 'User email address (must be unique)',
    example: 'user@example.com',
    maxLength: 100,
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(100, { message: 'email max length is 100' })
  email!: string;

  @ApiProperty({
    description: 'Account password (hashed later in service layer)',
    example: 'StrongP@ssw0rd123',
    maxLength: 100,
    minLength: 6,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'password must be at least 6 characters' })
  @MaxLength(100, { message: 'password max length is 100' })
  password!: string;
}
