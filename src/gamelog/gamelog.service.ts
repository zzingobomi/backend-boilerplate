import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  Pool,
  createPool,
  OkPacket,
  ResultSetHeader,
  RowDataPacket,
  ProcedureCallPacket,
} from 'mysql2/promise';
import { IConnectionInfo } from './types/connection-info';

// TODO: InjectConnection 데코레이터에 이름을 넣어서 사용할 수는 없을까?
// Ex) https://github.com/Tony133/nestjs-mysql

const GLOBAL_DB_NAME = 'globaldb';

export interface QueryOptions {
  rawQuery: string;
  database?: string;
  params?: any[];
}

@Injectable()
export class GamelogService implements OnModuleInit {
  public globalDb: Pool;
  public pools = new Map<string, Pool>();

  constructor() {
    this.globalDb = createPool({
      host: process.env.GAMELOG_HOST as string,
      port: parseInt(process.env.GAMELOG_PORT as string) ?? 3306,
      user: process.env.GAMELOG_USER as string,
      password: process.env.GAMELOG_PASSWORD as string,
      database: process.env.GAMELOG_DATABASE as string,
      connectionLimit:
        parseInt(process.env.GAMELOG_CONNECTION_LIMIT as string) ?? 50,
    });

    this.pools.set(GLOBAL_DB_NAME, this.globalDb);

    console.log(`✅ GlobalDB Connection Completed`);
  }

  async onModuleInit() {
    const [rows] = await this.globalDb.query<
      IConnectionInfo[] & RowDataPacket[]
    >(`SELECT * FROM shard_info;`);

    for (const row of rows) {
      const pool = createPool({
        host: row.host,
        port: row.port,
        user: row.user,
        password: row.password,
        database: row.database,
        connectionLimit:
          parseInt(process.env.GAMELOG_CONNECTION_LIMIT as string) ?? 50,
      });

      this.pools.set(row.name, pool);
    }

    console.log('✅ Gamelog Connection Completed');
  }

  async query(
    options: QueryOptions,
  ): Promise<
    | OkPacket
    | RowDataPacket[]
    | ResultSetHeader[]
    | RowDataPacket[][]
    | OkPacket[]
    | ProcedureCallPacket
  > {
    const { database = GLOBAL_DB_NAME, rawQuery, params } = options;

    const pool = this.pools.get(database);
    if (!pool) {
      // TODO: Custom Exception 만들어서 리턴하기
      throw 'Cannot found database pool';
    }

    const [results, fields] = await pool.query(rawQuery, params);
    return results;
  }
}
