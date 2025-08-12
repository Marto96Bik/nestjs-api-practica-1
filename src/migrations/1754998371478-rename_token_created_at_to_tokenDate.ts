import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameTokenCreatedAtToTokenDate1754998371478 implements MigrationInterface {
    name = 'RenameTokenCreatedAtToTokenDate1754998371478'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`birthdate\` varchar(255) NOT NULL, \`status\` tinyint NOT NULL DEFAULT 1, \`isDeleted\` tinyint NOT NULL DEFAULT 0, \`token\` text NULL, \`token_created_at\` datetime NULL, UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`token\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`token_created_at\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`token\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`token_created_at\` datetime NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`token_created_at\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`token\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`token_created_at\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`token\` text NULL`);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
