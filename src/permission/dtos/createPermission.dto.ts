import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePermissionDto {
  @ApiProperty({
    description:
      'The action that the permission grants (e.g., "create", "read", "update", "delete")',
    example: 'create',
    type: String,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  action!: string;

  @ApiProperty({
    description:
      'The subject (resource) that the permission applies to (e.g., "user", "post", "role")',
    example: 'user',
    type: String,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  subject!: string;
}
