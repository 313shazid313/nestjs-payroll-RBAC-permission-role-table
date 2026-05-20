import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { UpdateUserDto } from './dtos/updateUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async gatAllUsers() {
    return await this.usersRepository.find({ relations: ['roles'] });
  }

  async updateUsers(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOne({
      where: { id: id },
    });

    if (!user) {
      throw new ConflictException(`User: ${updateUserDto.email} Not found`);
    }

    const updateUser = await this.usersRepository.preload({
      id: user.id,
      ...updateUserDto,
      roles: updateUserDto.roles?.map((id) => ({ id })) ?? [],
    });
    // console.log(updateRole);

    if (!updateUser) {
      throw new ConflictException(`Role preload failed`);
    }

    return await this.usersRepository.save(updateUser);
  }

  // async singleUser(id: number) {
  //   await
  // }
}
