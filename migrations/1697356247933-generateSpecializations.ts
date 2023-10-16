import { TABLES } from 'libs/common-lib';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class GenerateSpecializations1697356247933
  implements MigrationInterface
{
  specializations = [
    {
      name: 'Cardiologist',
      description:
        'A medical doctor specializing in the heart and cardiovascular system',
      focused_areas: ['Heart', 'Blood Vessels'],
    },
    {
      name: 'Pediatrician',
      description:
        'A doctor specializing in the health and well-being of children',
      focused_areas: ['Child Development', 'Pediatric Diseases'],
    },
    {
      name: 'Orthopedic Surgeon',
      description:
        'A surgeon specializing in the musculoskeletal system and bones',
      focused_areas: ['Bone Fractures', 'Joint Replacements'],
    },
    {
      name: 'Dermatologist',
      description:
        'A medical professional specializing in skin conditions and disorders',
      focused_areas: ['Skin Cancer', 'Acne Treatment'],
    },
    {
      name: 'Psychiatrist',
      description:
        'A medical doctor specializing in mental health and psychiatric disorders',
      focused_areas: ['Depression', 'Anxiety Disorders'],
    },
    {
      name: 'Ophthalmologist',
      description: 'A doctor specializing in eye care and vision problems',
      focused_areas: ['Cataracts', 'Refractive Surgery'],
    },
    {
      name: 'Gastroenterologist',
      description:
        'A medical professional specializing in digestive system disorders',
      focused_areas: ['IBD', 'Liver Diseases'],
    },
    {
      name: 'Obstetrician-Gynecologist',
      description:
        'A doctor specializing in womens reproductive health and pregnancy',
      focused_areas: ['Prenatal Care', 'Gynecological Surgery'],
    },
    {
      name: 'Neurologist',
      description:
        'A medical doctor specializing in disorders of the nervous system',
      focused_areas: ['Stroke', 'Neurodegenerative Diseases'],
    },
    {
      name: 'Endocrinologist',
      description: 'A medical professional specializing in hormonal disorders',
      focused_areas: ['Diabetes', 'Thyroid Disorders'],
    },
    {
      name: 'Urologist',
      description:
        'A doctor specializing in urinary tract and male reproductive system health',
      focused_areas: ['Kidney Stones', 'Prostate Health'],
    },
    {
      name: 'Allergist',
      description:
        'A medical professional specializing in allergies and immunological conditions',
      focused_areas: ['Allergic Reactions', 'Immunotherapy'],
    },
    {
      name: 'Pulmonologist',
      description:
        'A doctor specializing in respiratory system diseases and disorders',
      focused_areas: ['Asthma', 'COPD'],
    },
    {
      name: 'Rheumatologist',
      description:
        'A medical professional specializing in autoimmune and inflammatory conditions',
      focused_areas: ['Rheumatoid Arthritis', 'Lupus'],
    },
    {
      name: 'Oncologist',
      description:
        'A doctor specializing in the treatment of cancer and tumors',
      focused_areas: ['Breast Cancer', 'Chemotherapy'],
    },
    {
      name: 'ENT Specialist',
      description:
        'A medical professional specializing in ear, nose, and throat conditions',
      focused_areas: ['Sinusitis', 'Tonsillectomy'],
    },
    {
      name: 'Dental Surgeon',
      description: 'A surgeon specializing in dental and oral surgery',
      focused_areas: ['Tooth Extraction', 'Oral Cancer'],
    },
    {
      name: 'Psychologist',
      description:
        'A mental health professional specializing in therapy and counseling',
      focused_areas: ['Cognitive Behavioral Therapy', 'Child Psychology'],
    },
    {
      name: 'Radiologist',
      description:
        'A medical professional specializing in medical imaging and interpretation',
      focused_areas: ['X-rays', 'MRI'],
    },
    {
      name: 'Nephrologist',
      description:
        'A doctor specializing in kidney health and kidney-related diseases',
      focused_areas: ['Kidney Transplantation', 'Dialysis'],
    },
  ];

  public async up(queryRunner: QueryRunner): Promise<void> {
    for (let i = 0; i < this.specializations.length; i++) {
      const { description, focused_areas, name } = this.specializations[i];

      await queryRunner.query(`
          INSERT INTO ${
            TABLES.SPECIALIZATIONS_TABLE
          }(name, description, focused_areas)
          VALUES('${name}', '${description}', ARRAY[${focused_areas
            .map((area) => `'${area}'`)
            .join(', ')}])`);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    for (let i = 0; i < this.specializations.length; i++) {
      const { name } = this.specializations[i];
      await queryRunner.query(
        `
                       DELETE FROM ${TABLES.SPECIALIZATIONS_TABLE}
                       WHERE name = '${name}' 
                     `,
        [],
      );
    }
  }
}
