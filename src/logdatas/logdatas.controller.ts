import { Controller, Get, UseGuards } from '@nestjs/common';
import { LogdatasService } from './logdatas.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/roles/roles.guard';
import { ACGuard, UseRoles } from 'nest-access-control';
import { ResourceEnum } from 'src/app.resources';

// TODO: 컨트롤러 수준에서 왜 안되는지 살펴보기
// @UseGuards(RolesGuard, ACGuard)
// @UseRoles({
//   resource: ResourceEnum.logdata,
//   action: 'read',
//   possession: 'any',
// })
// @ApiBearerAuth()
@ApiTags('Logdatas')
@Controller({
  path: 'logdatas',
  version: '1',
})
export class LogdatasController {
  constructor(private readonly logdatasService: LogdatasService) {}

  @Get('logdb1')
  getLogdb1() {
    return this.logdatasService.logdb1();
  }

  @Get('logdb2')
  getLogdb2() {
    return this.logdatasService.logdb2();
  }

  @Get('logdb3')
  getLogdb3() {
    return this.logdatasService.logdb3();
  }
}
