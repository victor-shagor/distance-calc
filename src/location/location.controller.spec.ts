import { Test } from '@nestjs/testing';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';

const mockLocationService = () => ({
  getAllLocations: jest.fn(),
  getLocationById: jest.fn(),
  createLocation: jest.fn(),
  deleteLocation: jest.fn(),
  updateLocation: jest.fn(),
});

const createDto = {
  name: 'name',
  description: 'description',
  phone: 'phone',
  website: 'website',
  contactPerson: 'person',
  coordinates: 'coordinates',
};

describe('LocationController', () => {
  let locationController: LocationController;
  let locationService: LocationService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [LocationController],
      providers: [
        { provide: LocationService, useFactory: mockLocationService },
      ],
    }).compile();

    locationService = await moduleRef.get<LocationService>(LocationService);
    locationController = moduleRef.get<LocationController>(LocationController);
  });

  describe('getAll', () => {
    it('should return an array of locations', async () => {
      const result = {
        data: [],
        count: 0,
      };

      jest
        .spyOn(locationService, 'getAllLocations')
        .mockImplementation(async () => result);

      expect(
        await locationController.getAllLocations({ skip: 0, take: 10 }),
      ).toBe(result);
      expect(locationService.getAllLocations).toHaveBeenCalled();
    });
  });

  describe('getByid', () => {
    it('should get one location if found', async () => {
      const result = { data: createDto };

      jest
        .spyOn(locationService, 'getLocationById')
        .mockImplementation(async () => result);

      expect(await locationController.getLocationById('1')).toBe(result);
      expect(locationService.getLocationById).toHaveBeenCalled();
    });
  });
  describe('createLocation', () => {
    it('should create location', async () => {
      const result = { data: createDto };

      jest
        .spyOn(locationService, 'createLocation')
        .mockImplementation(async () => result);

      expect(await locationController.createLocation(createDto)).toBe(result);
      expect(locationService.createLocation).toHaveBeenCalled();
    });
  });
  describe('deleteLocation', () => {
    it('should delete location', async () => {
      jest
        .spyOn(locationService, 'deleteLocation')
        .mockImplementation(async () => '');

      expect(await locationController.deleteLocation('1')).toBe('');
      expect(locationService.deleteLocation).toHaveBeenCalled();
    });
  });
  describe('updateLocation', () => {
    const result = { data: createDto };
    it('should update location', async () => {
      jest
        .spyOn(locationService, 'updateLocation')
        .mockImplementation(async () => result);

      expect(await locationController.updateLocation('1', createDto)).toBe(
        result,
      );
      expect(locationService.updateLocation).toHaveBeenCalled();
    });
  });
});
