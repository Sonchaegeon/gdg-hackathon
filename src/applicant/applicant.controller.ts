import { Controller, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApplicantService } from './applicant.service';
import { Applicant } from './entity/applicant.entity';

@Controller('applicant')
export class ApplicantController {
  constructor(private readonly applicantService: ApplicantService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post(':post_id')
  public async createApplicant(
    @Param('post_id') post_id: number,
  ): Promise<Applicant> {
    return await this.applicantService.createApplicant(post_id);
  }
}
