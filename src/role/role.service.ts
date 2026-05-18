import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './role.entity';
import { CreateRoleDto } from './dtos/createRole.dto';
import { Permission } from 'src/permission/permission.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,

    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {}

  async createRole(createRoleDto: CreateRoleDto) {
    const role = this.roleRepository.create({
      name: createRoleDto.name,
      permissions: createRoleDto.permissionIds?.map((id) => ({ id })) ?? [],
    });

    return this.roleRepository.save(role);
  }
}
