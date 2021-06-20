import { BaseEntity, Entity, PrimaryColumn, Column, Unique } from 'typeorm';

@Entity()
@Unique(['name'])
export class Locations extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column({ unique: true })
  @Unique('Duplicate name', ['name'])
  name: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  website: string;

  @Column()
  phone: string;

  @Column()
  contactPerson: string;

  @Column()
  coordinates: string;
}
