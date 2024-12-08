import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User as UserEntity } from 'src/typeorm';
import { SerializedUsers, UserType } from 'src/users/controllers/types/user';
import { encodePassword } from 'src/utils/bcrypt';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDetails: UserType) {
    // Check if user exists
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDetails.email },
    });

    // If user exists, throw a conflict exception
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // encrpt password
    const password = await encodePassword(createUserDetails.password);

    // Create and save the new user
    const newUser = this.userRepository.create({
      ...createUserDetails,
      password,
    });
    const savedUser = await this.userRepository.save(newUser);

    return new SerializedUsers(savedUser);
  }

  findByUsername(username: string) {
    return this.userRepository.findOne({
      where: { username },
    });
  }
  findByUserID(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }
}
