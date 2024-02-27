import { Injectable } from '@nestjs/common';
import { LogdatasRepository } from './logdatas.repository';

@Injectable()
export class LogdatasService {
  constructor(private readonly logdatasRepository: LogdatasRepository) {}

  data1() {
    return this.logdatasRepository.data1();
  }

  data2() {
    return this.logdatasRepository.data2();
  }

  data3() {
    return this.logdatasRepository.data3();
  }

  data4() {
    return this.logdatasRepository.data4();
  }

  data5() {
    return this.logdatasRepository.data5();
  }
}
