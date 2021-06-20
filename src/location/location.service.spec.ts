import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { LocationRepository } from './location.repository';
import { LocationService } from './location.service';

const mockLocationRepository = () => ({
  getAllLocations: jest.fn(),
  findOne: jest.fn(),
  createLocation: jest.fn(),
  delete: jest.fn(),
  updateLocation: jest.fn(),
});

describe('LocationService', () => {
  let locationService;
  let locationRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        LocationService,
        { provide: LocationRepository, useFactory: mockLocationRepository },
      ],
    }).compile();

    locationService = await module.get<LocationService>(LocationService);
    locationRepository = module.get<LocationRepository>(LocationRepository);
  });

  describe('findAll', () => {
    it('should get all locations', async () => {
      const someValue = {
        dat: [],
        count: 0,
      };
      locationRepository.getAllLocations.mockResolvedValue(someValue);

      expect(locationRepository.getAllLocations).not.toHaveBeenCalled();
      const result = await locationService.getAllLocations();
      expect(result).toEqual(someValue);
      expect(locationRepository.getAllLocations).toHaveBeenCalled();
    });
  });

  describe('getLocationById', () => {
    it('should get location by id', async () => {
      const someValue = { id: 1, description: 'test description' };
      locationRepository.findOne.mockResolvedValue(someValue);

      const result = await locationService.getLocationById(1);
      expect(result).toEqual({ data: someValue });
      expect(locationRepository.findOne).toHaveBeenCalledWith(1);
    });
    it('should throw error if location not found', async () => {
      locationRepository.findOne.mockResolvedValue(null);

      expect(locationService.getLocationById(1)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('Create location', () => {
    it('should create locations', async () => {
      const createDto = {
        id: 'name',
        description: 'description',
        website: 'website',
        contactPerson: 'person',
        coordinates: 'coordinates',
      };
      locationRepository.createLocation.mockResolvedValue(createDto);

      expect(locationRepository.createLocation).not.toHaveBeenCalled();
      const result = await locationService.createLocation(createDto);
      expect(result).toEqual(createDto);
      expect(locationRepository.createLocation).toHaveBeenCalledWith(createDto);
    });
  });

  describe('deleteLocation', () => {
    it('should delete location', async () => {
      locationRepository.delete.mockResolvedValue({ affected: 1 });

      expect(locationRepository.delete).not.toHaveBeenCalled();
      const result = await locationService.deleteLocation(1);
      expect(result).toEqual('Location deleted successfully');
      expect(locationRepository.delete).toHaveBeenCalledWith(1);
    });
    it('should throw error if location not found', async () => {
      locationRepository.delete.mockResolvedValue({ affected: 0 });

      expect(locationService.deleteLocation(1)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('updateLocation', () => {
    const updateDto = {
      description: 'description',
      website: 'website',
    };
    it('should update location', async () => {
      locationRepository.findOne.mockResolvedValue({ id: 'name' });
      locationRepository.updateLocation.mockResolvedValue({ id: 'name' });

      expect(locationRepository.findOne).not.toHaveBeenCalled();
      const result = await locationService.updateLocation('1', updateDto);
      expect(result).toEqual({ id: 'name' });
      expect(locationRepository.updateLocation).toHaveBeenCalledWith(
        '1',
        updateDto,
      );
      expect(locationRepository.findOne).toHaveBeenCalled();
    });
  });

  describe('updateLocation', () => {
    const updateDto = {
      description: 'description',
      website: 'website',
    };
    it('should update location', async () => {
      locationRepository.findOne.mockResolvedValue({ id: 'name' });
      locationRepository.updateLocation.mockResolvedValue({ id: 'name' });

      expect(locationRepository.findOne).not.toHaveBeenCalled();
      const result = await locationService.updateLocation('1', updateDto);
      expect(result).toEqual({ id: 'name' });
      expect(locationRepository.updateLocation).toHaveBeenCalledWith(
        '1',
        updateDto,
      );
      expect(locationRepository.findOne).toHaveBeenCalled();
    });
  });
});
