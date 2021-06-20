import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateDto } from './Dto/createDto';
import { UpdateDto } from './Dto/updateDto';
import { DistanceDto } from './Dto/distanceDto';
import { Locations } from './location.entity';
import { LocationService } from './location.service';

@Controller('location')
export class LocationController {
  constructor(private locationService: LocationService) {}

  @Get('/distance')
  @UsePipes(ValidationPipe)
  getDistance(
    @Body()
    distanceDto: DistanceDto,
  ) {
    return this.locationService.getDistance(distanceDto.from, distanceDto.to);
  }

  @Get('/:id')
  getLocationById(
    @Param('id') id: string,
  ): Promise<{ data: Partial<Locations> }> {
    return this.locationService.getLocationById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createLocation(
    @Body() createDto: CreateDto,
  ): Promise<{ data: Partial<Locations> }> {
    return this.locationService.createLocation(createDto);
  }

  @Get()
  getAllLocations(
    @Query() getObj: { skip: number; take: number },
  ): Promise<{ data: Locations[]; count: number }> {
    return this.locationService.getAllLocations(getObj.skip, getObj.take);
  }

  @Delete('/:id')
  deleteLocation(@Param('id') id: string): Promise<string> {
    return this.locationService.deleteLocation(id);
  }

  @Patch('/:id')
  updateLocation(
    @Param('id') id: string,
    @Body() updatDto: UpdateDto,
  ): Promise<{ data: Partial<Locations> }> {
    return this.locationService.updateLocation(id, updatDto);
  }
}
