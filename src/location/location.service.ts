import {
  // BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDto } from './Dto/createDto';
import { UpdateDto } from './Dto/updateDto';
import { Locations } from './location.entity';
import { LocationRepository } from './location.repository';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(LocationRepository)
    private locationRepository: LocationRepository,
  ) {}
  async getLocationById(id: string): Promise<{ data: Partial<Locations> }> {
    const location = await this.locationRepository.findOne(id);
    if (!location) {
      throw new NotFoundException(`Location with ${id} not found`);
    }
    return { data: location };
  }

  async createLocation(
    createDto: CreateDto,
  ): Promise<{ data: Partial<Locations> }> {
    return this.locationRepository.createLocation(createDto);
  }

  async deleteLocation(id: string): Promise<string> {
    const result = await this.locationRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Location with ${id} not found`);
    }
    return 'Location deleted successfully';
  }

  async getAllLocations(
    skip?: number,
    take?: number,
  ): Promise<{ data: Locations[]; count: number }> {
    return await this.locationRepository.getAllLocations(skip, take);
  }

  async updateLocation(
    id: string,
    updateDto: UpdateDto,
  ): Promise<{ data: Partial<Locations> }> {
    const location = await this.getLocationById(id);
    if (location) {
      return await this.locationRepository.updateLocation(id, updateDto);
    }
  }

  toRad(Value: number) {
    return (Value * Math.PI) / 180;
  }
  getDistance(from: string, to: string) {
    const fromLatLong = from.split(',');
    const toLatLong = to.split(',');

    const R = 6371; //km;
    const dLat = this.toRad(Number(toLatLong[0]) - Number(fromLatLong[0]));
    const dLon = this.toRad(Number(toLatLong[1]) - Number(fromLatLong[1]));
    const lat1 = this.toRad(Number(fromLatLong[0]));
    const lat2 = this.toRad(Number(toLatLong[0]));

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return `Distance between ${from} and ${to} is ${distance.toFixed(1)}km`;
  }
}

// function calcCrow(lat1, lon1, lat2, lon2) {
//   const R = 6371; // km
//   const dLat = toRad(lat2 - lat1);
//   const dLon = toRad(lon2 - lon1);
//   var lat1 = toRad(lat1);
//   var lat2 = toRad(lat2);

//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   const d = R * c;
//   return d;
// }

// // Converts numeric degrees to radians
// function toRad(Value) {
//   return (Value * Math.PI) / 180;
// }
