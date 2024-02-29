import { Injectable } from '@nestjs/common';
import { GamelogService } from 'src/gamelog/gamelog.service';

@Injectable()
export class LogdatasRepository {
  constructor(private readonly gamelogService: GamelogService) {}

  async logdb1() {
    const res = await this.gamelogService.query({
      rawQuery: `SELECT * FROM log`,
      database: 'logdb1',
    });

    return res;
  }

  async logdb2() {
    const res = await this.gamelogService.query({
      rawQuery: `SELECT * FROM log`,
      database: 'logdb2',
    });

    return res;
  }

  async logdb3() {
    const res = await this.gamelogService.query({
      rawQuery: `SELECT * FROM log`,
      database: 'logdb3',
    });

    return res;
  }
}
