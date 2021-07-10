import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApplicantService } from './applicant.service';
import { GetApplicantResponseData } from './dto/get-applicant.dto';
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

  @UseGuards(AuthGuard('jwt'))
  @Get()
  public async getApplicants(): Promise<GetApplicantResponseData[]> {
    return await this.applicantService.getApplicants();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('post')
  public async getPostApplicants(): Promise<GetApplicantResponseData[]> {
    return await this.applicantService.getPostApplicants();
  }
}
