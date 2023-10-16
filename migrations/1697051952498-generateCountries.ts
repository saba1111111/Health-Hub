import { MigrationInterface, QueryRunner } from 'typeorm';
import { TABLES } from 'libs/common-lib';

export class GenerateCountries1697051952498 implements MigrationInterface {
  private countries = [
    { name: 'Georgia' },
    { name: 'China' },
    { name: 'India' },
    { name: 'United States' },
    { name: 'Indonesia' },
    { name: 'Pakistan' },
    { name: 'Brazil' },
    { name: 'Nigeria' },
    { name: 'Bangladesh' },
    { name: 'Mexico' },
    { name: 'Japan' },
    { name: 'Philippines' },
    { name: 'Vietnam' },
    { name: 'Ethiopia' },
    { name: 'Egypt' },
    { name: 'Germany' },
    { name: 'Iran' },
    { name: 'Turkey' },
    { name: 'Democratic Republic of the Congo' },
    { name: 'France' },
    { name: 'Thailand' },
    { name: 'United Kingdom' },
    { name: 'Italy' },
    { name: 'South Africa' },
    { name: 'Myanmar' },
    { name: 'South Korea' },
    { name: 'Colombia' },
    { name: 'Spain' },
    { name: 'Ukraine' },
    { name: 'Tanzania' },
    { name: 'Argentina' },
    { name: 'Kenya' },
    { name: 'Poland' },
    { name: 'Algeria' },
    { name: 'Canada' },
    { name: 'Uganda' },
    { name: 'Morocco' },
    { name: 'Iraq' },
    { name: 'Sudan' },
    { name: 'Malaysia' },
    { name: 'Uzbekistan' },
  ];

  public async up(queryRunner: QueryRunner): Promise<void> {
    for (let i = 0; i < this.countries.length; i++) {
      await queryRunner.query(`
               INSERT INTO ${TABLES.COUNTRIES_TABLE}(name)
               VALUES('${this.countries[i].name}')
             `);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    for (let i = 0; i < this.countries.length; i++) {
      await queryRunner.query(`
                 DELETE FROM ${TABLES.COUNTRIES_TABLE}
                 WHERE name = '${this.countries[i].name}'
               `);
    }
  }
}
