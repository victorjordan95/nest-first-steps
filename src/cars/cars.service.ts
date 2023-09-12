import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';
import { CreateCarDTO, UpdateCarDTO } from './dto';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    {
      id: uuid(),
      brand: 'Audi',
      model: 'A4',
    },
    {
      id: uuid(),
      brand: 'BMW',
      model: 'X5',
    },
    {
      id: uuid(),
      brand: 'Fiat',
      model: '500',
    },
  ];

  getAllCars() {
    return this.cars;
  }

  getCarById(id: string) {
    const car = this.cars.find((car) => car.id === id);

    if (!car) throw new NotFoundException(`Car with id ${id} not found`);

    return car;
  }

  createCar(createCarDTO: CreateCarDTO) {
    const newCar: Car = {
      id: uuid(),
      ...createCarDTO,
    };

    this.cars.push(newCar);

    return newCar;
  }

  updateCar(id: string, updateCarDto: UpdateCarDTO) {
    const car = this.getCarById(id);

    if (updateCarDto.id && updateCarDto.id !== car.id) {
      throw new BadRequestException('Car id is not allowed to change');
    }

    const updatedCar = {
      ...car,
      ...updateCarDto,
    };

    this.cars = this.cars.map((car) => (car.id === id ? updatedCar : car));

    return updatedCar;
  }

  deleteCar(id: string) {
    this.getCarById(id);
    this.cars = this.cars.filter((car) => car.id !== id);

    return `Car with id ${id} deleted`;
  }
}
