import { IUserRequest } from '../../../shared/interface/request.interface';
import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  public async createUser(dto: IUserRequest): Promise<void> {
    let newUser: User;
    newUser = this.create({
      email: dto.user.email,
      name: dto.user.name,
      profile_url: dto.user.profile_url,
    });
    await this.save(newUser);
  }

  public async findUserByEmail(email: string): Promise<User> {
    return await this.findOne({ email });
  }
}
