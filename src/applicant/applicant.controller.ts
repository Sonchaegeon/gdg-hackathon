import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApplicantService } from './applicant.service';
import { DeleteApplicantDto } from './dto/delete-applicant.dto';
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

  @UseGuards(AuthGuard('jwt'))
  @Delete(':post_id')
  public async deleteApplicant(
    @Param('post_id') post_id: number,
    @Body() dto: DeleteApplicantDto,
  ): Promise<{ message: string }> {
    await this.applicantService.deleteApplicant(post_id, dto.user_email);
    return { message: 'success' };
  }
}
