import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { LocationService } from '../src/location/location.service';
import { AppModule } from './../src/app.module';

describe('Location', () => {
  let app: INestApplication;
  const createDto = {
    name: 'name',
    description: 'description',
    phone: 'phone',
    website: 'website',
    contactPerson: 'person',
    coordinates: 'coordinates',
  };
  const locationService = {
    getAllLocations: () => ['test'],
    createLocation: (createDto) => createDto,
    getLocationById: () => createDto,
    deleteLocation: () => 'Location deleted successfully',
    updateLocation: () => createDto,
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(LocationService)
      .useValue(locationService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET location`, () => {
    return request(app.getHttpServer())
      .get('/location')
      .expect(200)
      .expect(locationService.getAllLocations());
  });

  it(`/GET location by id`, () => {
    return request(app.getHttpServer())
      .get('/location/name')
      .expect(200)
      .expect(locationService.getLocationById());
  });

  it(`/CREATE location`, () => {
    request(app.getHttpServer())
      .post('/location')
      .send(createDto)
      .expect(201)
      .expect(locationService.createLocation(createDto));
  });

  it(`/CREATE should not create if some value are not provided`, async () => {
    const res = request(app.getHttpServer())
      .post('/location')
      .send({ name: 'name' })
      .expect(404);

    expect(res).rejects.toThrow();
  });

  it(`/DELETE location by id`, () => {
    request(app.getHttpServer())
      .delete('/location/name')
      .expect(200)
      .expect(locationService.deleteLocation());
  });

  it(`/UPDATE location by id`, () => {
    request(app.getHttpServer())
      .patch('/location/name')
      .expect(200)
      .expect(locationService.updateLocation());
  });

  afterAll(async () => {
    await app.close();
  });
});
