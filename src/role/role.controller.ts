import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dtos/createRole.dto';
import { Role } from './role.entity'; // Assuming you have a Role entity

@ApiTags('roles') // Groups endpoints under "roles" in Swagger UI
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new role',
    description:
      'Creates a role with optional permission IDs. The role name must be unique.',
  })
  @ApiCreatedResponse({
    description: 'Role successfully created.',
    type: Role, // Replace with your actual response DTO or entity
  })
  @ApiBadRequestResponse({
    description:
      'Invalid input data (e.g., missing name, duplicate permission IDs, non-existent permission IDs).',
  })
  async createRole(@Body() createRoleDto: CreateRoleDto) {
    return await this.roleService.createRole(createRoleDto);
  }
}
