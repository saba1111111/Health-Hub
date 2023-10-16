import { MigrationInterface, QueryRunner } from 'typeorm';
import { TABLES } from 'libs/common-lib';

export class GenerateCities1697053644414 implements MigrationInterface {
  private cities = [
    // Georgia
    {
      name: 'Tbilisi',
      longitude: 44.791545,
      latitude: 41.689579,
      countryId: 1,
    },
    {
      name: 'Kutaisi',
      longitude: 42.713223,
      latitude: 42.262591,
      countryId: 1,
    },
    {
      name: 'Batumi',
      longitude: 41.6356,
      latitude: 41.642739,
      countryId: 1,
    },
    {
      name: 'Rustavi',
      longitude: 45.010149,
      latitude: 41.565581,
      countryId: 1,
    },
    {
      name: 'Gori',
      longitude: 44.112038,
      latitude: 41.973137,
      countryId: 1,
    },
    // China
    {
      name: 'Beijing',
      longitude: 116.405285,
      latitude: 39.904211,
      countryId: 2,
    },
    {
      name: 'Shanghai',
      longitude: 121.473701,
      latitude: 31.230416,
      countryId: 2,
    },
    {
      name: 'Guangzhou',
      longitude: 113.264385,
      latitude: 23.12911,
      countryId: 2,
    },
    {
      name: 'Shenzhen',
      longitude: 114.057868,
      latitude: 22.543096,
      countryId: 2,
    },
    {
      name: 'Chengdu',
      longitude: 104.065735,
      latitude: 30.659462,
      countryId: 2,
    },
    // India
    {
      name: 'New Delhi',
      longitude: 77.209021,
      latitude: 28.613939,
      countryId: 3,
    },
    {
      name: 'Mumbai',
      longitude: 72.877655,
      latitude: 19.075983,
      countryId: 3,
    },
    {
      name: 'Bangalore',
      longitude: 77.594566,
      latitude: 12.971599,
      countryId: 3,
    },
    {
      name: 'Kolkata',
      longitude: 88.363895,
      latitude: 22.572645,
      countryId: 3,
    },
    {
      name: 'Chennai',
      longitude: 80.278471,
      latitude: 13.08268,
      countryId: 3,
    },
    // United States
    {
      name: 'New York',
      longitude: -74.006,
      latitude: 40.7128,
      countryId: 4,
    },
    {
      name: 'Los Angeles',
      longitude: -118.243683,
      latitude: 34.052235,
      countryId: 4,
    },
    {
      name: 'Chicago',
      longitude: -87.629799,
      latitude: 41.878113,
      countryId: 4,
    },
    {
      name: 'Houston',
      longitude: -95.369804,
      latitude: 29.760427,
      countryId: 4,
    },
    {
      name: 'Miami',
      longitude: -80.19179,
      latitude: 25.76168,
      countryId: 4,
    },
    // Indonesia
    {
      name: 'Jakarta',
      longitude: 106.845599,
      latitude: -6.208763,
      countryId: 5,
    },
    {
      name: 'Surabaya',
      longitude: 112.750833,
      latitude: -7.257471,
      countryId: 5,
    },
    {
      name: 'Bandung',
      longitude: 107.60981,
      latitude: -6.917464,
      countryId: 5,
    },
    {
      name: 'Medan',
      longitude: 98.681187,
      latitude: 3.595195,
      countryId: 5,
    },
    {
      name: 'Semarang',
      longitude: 110.422682,
      latitude: -6.993207,
      countryId: 5,
    },
    {
      name: 'Hyderabad',
      longitude: 78.474444,
      latitude: 17.385044,
      countryId: 3,
    },
    {
      name: 'Pune',
      longitude: 73.856255,
      latitude: 18.52043,
      countryId: 3,
    },
    // United States
    {
      name: 'San Francisco',
      longitude: -122.419416,
      latitude: 37.774929,
      countryId: 4,
    },
    {
      name: 'Seattle',
      longitude: -122.332071,
      latitude: 47.606209,
      countryId: 4,
    },
    // Indonesia
    {
      name: 'Denpasar',
      longitude: 115.212631,
      latitude: -8.652933,
      countryId: 5,
    },
    {
      name: 'Yogyakarta',
      longitude: 110.425369,
      latitude: -7.79558,
      countryId: 5,
    },
    // China
    {
      name: 'Chongqing',
      longitude: 106.551556,
      latitude: 29.56301,
      countryId: 2,
    },
    {
      name: 'Xi an',
      longitude: 108.939843,
      latitude: 34.341568,
      countryId: 2,
    },
    // United States
    {
      name: 'Boston',
      longitude: -71.05888,
      latitude: 42.360082,
      countryId: 4,
    },
    {
      name: 'Dallas',
      longitude: -96.796988,
      latitude: 32.776664,
      countryId: 4,
    },
    // Indonesia
    {
      name: 'Makassar',
      longitude: 119.41243,
      latitude: -5.147665,
      countryId: 5,
    },
    {
      name: 'Palembang',
      longitude: 104.74582,
      latitude: -2.990934,
      countryId: 5,
    },
    // China
    {
      name: 'Guilin',
      longitude: 110.290195,
      latitude: 25.273566,
      countryId: 2,
    },
    {
      name: 'Harbin',
      longitude: 126.633887,
      latitude: 45.756967,
      countryId: 2,
    },
    // India
    {
      name: 'Chandigarh',
      longitude: 76.768066,
      latitude: 30.733315,
      countryId: 3,
    },
    {
      name: 'Jaipur',
      longitude: 75.78727,
      latitude: 26.912434,
      countryId: 3,
    },
  ];

  public async up(queryRunner: QueryRunner): Promise<void> {
    for (let i = 0; i < this.cities.length; i++) {
      const { name, longitude, latitude, countryId } = this.cities[i];
      await queryRunner.query(`
        INSERT INTO ${TABLES.CITIES_TABLE}(name, longitude, latitude, country_id)
        VALUES('${name}', ${longitude}, ${latitude}, ${countryId})
    `);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    for (let i = 0; i < this.cities.length; i++) {
      const { name, countryId } = this.cities[i];
      await queryRunner.query(
        `
                     DELETE FROM ${TABLES.CITIES_TABLE}
                     WHERE name = '${name}' AND country_id = ${countryId}
                   `,
        [],
      );
    }
  }
}
