import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddFilesAds1708386265895 implements MigrationInterface {
  name = 'AddFilesAds1708386265895';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`file\` ADD \`advertisementId\` int NULL`,
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_1cfd10c73a13d3940eb33f0dca\` ON \`advertisement\` (\`name\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`file\` ADD CONSTRAINT \`FK_e182be92793460b986778387164\` FOREIGN KEY (\`advertisementId\`) REFERENCES \`advertisement\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`file\` DROP FOREIGN KEY \`FK_e182be92793460b986778387164\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_1cfd10c73a13d3940eb33f0dca\` ON \`advertisement\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`file\` DROP COLUMN \`advertisementId\``,
    );
  }
}
