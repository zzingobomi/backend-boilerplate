import { Injectable } from '@nestjs/common';
import { LogdatasRepository } from './logdatas.repository';

@Injectable()
export class LogdatasService {
  constructor(private readonly logdatasRepository: LogdatasRepository) {}

  logdb1() {
    return this.logdatasRepository.logdb1();
  }

  logdb2() {
    return this.logdatasRepository.logdb2();
  }

  logdb3() {
    return this.logdatasRepository.logdb3();
  }
}
