import { EntityRepository, Repository } from 'typeorm';
import { Applicant } from './applicant.entity';

@EntityRepository(Applicant)
export class ApplicantRepository extends Repository<Applicant> {
  public async createApplicant(
    user_id: number,
    post_id: number,
    room_secret: string,
  ): Promise<Applicant> {
    let newApplicant: Applicant;
    newApplicant = this.create({
      user_id,
      post_id,
      room_secret,
    });
    return this.save(newApplicant);
  }
}
