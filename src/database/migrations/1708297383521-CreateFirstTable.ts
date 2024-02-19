import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateFirstTable1708297383521 implements MigrationInterface {
  name = 'CreateFirstTable1708297383521';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`role\` (\`id\` int NOT NULL, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`file\` (\`id\` varchar(36) NOT NULL, \`path\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NULL, \`password\` varchar(255) NULL, \`provider\` varchar(255) NOT NULL DEFAULT 'email', \`socialId\` varchar(255) NULL, \`userName\` varchar(255) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`photoId\` varchar(36) NULL, \`roleId\` int NULL, INDEX \`IDX_9bd2fe7a8e694dedc4ec2f666f\` (\`socialId\`), INDEX \`IDX_da5934070b5f2726ebfd3122c8\` (\`userName\`), UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`session\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`userId\` int NULL, INDEX \`IDX_3d2f174ef04fb312fdebd0ddc5\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD CONSTRAINT \`FK_75e2be4ce11d447ef43be0e374f\` FOREIGN KEY (\`photoId\`) REFERENCES \`file\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD CONSTRAINT \`FK_c28e52f758e7bbc53828db92194\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`session\` ADD CONSTRAINT \`FK_3d2f174ef04fb312fdebd0ddc53\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`session\` DROP FOREIGN KEY \`FK_3d2f174ef04fb312fdebd0ddc53\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_c28e52f758e7bbc53828db92194\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_75e2be4ce11d447ef43be0e374f\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_3d2f174ef04fb312fdebd0ddc5\` ON \`session\``,
    );
    await queryRunner.query(`DROP TABLE \`session\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_da5934070b5f2726ebfd3122c8\` ON \`user\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_9bd2fe7a8e694dedc4ec2f666f\` ON \`user\``,
    );
    await queryRunner.query(`DROP TABLE \`user\``);
    await queryRunner.query(`DROP TABLE \`file\``);
    await queryRunner.query(`DROP TABLE \`role\``);
  }
}
