import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { NoticesService } from './notices.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { Notice } from './domain/notice';

@ApiTags('Notices')
@Controller({ path: 'notices', version: '1' })
export class NoticesController {
  constructor(private readonly noticesService: NoticesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createNoticeDto: CreateNoticeDto): Promise<Notice> {
    //return this.advertisementsService.create(createProfileDto);
  }
}
