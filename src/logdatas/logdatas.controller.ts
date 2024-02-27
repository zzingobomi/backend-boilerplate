import { Controller, Get, UseGuards } from '@nestjs/common';
import { LogdatasService } from './logdatas.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/roles/roles.guard';
import { ACGuard, UseRoles } from 'nest-access-control';
import { ResourceEnum } from 'src/app.resources';

@UseGuards(RolesGuard, ACGuard)
@UseRoles({
  resource: ResourceEnum.logdata,
  action: 'read',
  possession: 'any',
})
@ApiBearerAuth()
@ApiTags('Logdatas')
@Controller({
  path: 'logdatas',
  version: '1',
})
export class LogdatasController {
  constructor(private readonly logdatasService: LogdatasService) {}

  @Get('data1')
  getData1() {
    return this.logdatasService.data1();
  }

  @Get('data2')
  getData2() {
    return this.logdatasService.data2();
  }

  @Get('data3')
  getData3() {
    return this.logdatasService.data3();
  }

  @Get('data4')
  getData4() {
    return this.logdatasService.data4();
  }

  @Get('data5')
  getData5() {
    return this.logdatasService.data5();
  }
}
