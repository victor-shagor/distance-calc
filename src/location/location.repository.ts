import { ConflictException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateDto } from './Dto/createDto';
import { UpdateDto } from './Dto/updateDto';
import { Locations } from './location.entity';

@EntityRepository(Locations)
export class LocationRepository extends Repository<Locations> {
  async createLocation(createDto: CreateDto): Promise<{ data: Locations }> {
    const {
      name,
      description,
      website,
      phone,
      contactPerson,
      coordinates,
    } = createDto;
    const exist = Locations.findOne({ where: { name } });

    if (exist) {
      throw new ConflictException('Name already exists');
    }

    const location = new Locations();
    location.id = name;
    location.name = name;
    location.description = description;
    location.website = website;
    location.phone = phone;
    location.contactPerson = contactPerson;
    location.coordinates = coordinates;

    await location.save();

    return { data: location };
  }

  async updateLocation(
    id: string,
    updateObj: Partial<UpdateDto>,
  ): Promise<{ data: Locations }> {
    const query = this.createQueryBuilder('locations');
    const updatedLocation = await query
      .update('locations')
      .set(updateObj)
      .where('id = :id', { id })
      .returning('*')
      .execute();

    return { data: updatedLocation.raw[0] };
  }

  async getAllLocations(
    skip = 0,
    take = 10,
  ): Promise<{ data: Locations[]; count: number }> {
    const [result, total] = await Locations.findAndCount({ skip, take });
    return {
      data: result,
      count: total,
    };
  }
}
