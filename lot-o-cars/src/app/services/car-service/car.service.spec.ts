import {inject, TestBed} from '@angular/core/testing';

import { CarService } from './car.service';

describe('CarsearchService', () => {
  let service: CarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have getMakes function', inject([CarService], (service: CarService) => {
    expect(service.getMakes).toBeTruthy();
  }));

  it('should have getColors function', inject([CarService], (service: CarService) => {
    expect(service.getColors).toBeTruthy();
  }));

  it('should have getTransmissions function', inject([CarService], (service: CarService) => {
    expect(service.getTransmissions).toBeTruthy();
  }));

  it('should have getFuelTypes function', inject([CarService], (service: CarService) => {
    expect(service.getFuelTypes).toBeTruthy();
  }));

  it('should have getCarBody function', inject([CarService], (service: CarService) => {
    expect(service.getCarBody).toBeTruthy();
  }));

  it('should have getAll function', inject([CarService], (service: CarService) => {
    expect(service.getAll).toBeTruthy();
  }));

  it('should have find function', inject([CarService], (service: CarService) => {
    expect(service.find).toBeTruthy();
  }));

  it('should have getParamString function', inject([CarService], (service: CarService) => {
    expect(service.getParamString).toBeTruthy();
  }));

  it('should have findByNumberPlate function', inject([CarService], (service: CarService) => {
    expect(service.findByNumberPlate).toBeTruthy();
  }));

  it('should have getBlockedDates function', inject([CarService], (service: CarService) => {
    expect(service.getBlockedDates).toBeTruthy();
  }));

  it('should have getCarImageIds function', inject([CarService], (service: CarService) => {
    expect(service.getCarImageIds).toBeTruthy();
  }));

  it('should have getCarImageUrl function', inject([CarService], (service: CarService) => {
    expect(service.getCarImageUrl).toBeTruthy();
  }));

  it('should have deleteCarImage function', inject([CarService], (service: CarService) => {
    expect(service.deleteCarImage).toBeTruthy();
  }));

  it('should have createNewCar function', inject([CarService], (service: CarService) => {
    expect(service.createNewCar).toBeTruthy();
  }));

  it('should have addImageFileToCar function', inject([CarService], (service: CarService) => {
    expect(service.addImageFileToCar).toBeTruthy();
  }));

  it('should have getOwn function', inject([CarService], (service: CarService) => {
    expect(service.getOwn).toBeTruthy();
  }));

  it('should have editCar function', inject([CarService], (service: CarService) => {
    expect(service.editCar).toBeTruthy();
  }));

  it('should have addImagesToCar function', inject([CarService], (service: CarService) => {
    expect(service.addImagesToCar).toBeTruthy();
  }));
});
