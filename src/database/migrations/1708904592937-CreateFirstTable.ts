import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateFirstTable1708904592937 implements MigrationInterface {
  name = 'CreateFirstTable1708904592937';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_9bd2fe7a8e694dedc4ec2f666f\` ON \`user\``,
    );
    await queryRunner.query(
      `CREATE TABLE \`notice\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`content\` text NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, INDEX \`IDX_74c73beb0929f4b3dd1c416593\` (\`title\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`socialId\``);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`socialId\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_74c73beb0929f4b3dd1c416593\` ON \`notice\``,
    );
    await queryRunner.query(`DROP TABLE \`notice\``);
    await queryRunner.query(
      `CREATE INDEX \`IDX_9bd2fe7a8e694dedc4ec2f666f\` ON \`user\` (\`socialId\`)`,
    );
  }
}
