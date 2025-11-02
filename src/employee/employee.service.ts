import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) { }

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const employeeData: any = {
      personId: createEmployeeDto.personId,
      status: createEmployeeDto.status,
      jobTitle: createEmployeeDto.jobTitle,
      hireDate: createEmployeeDto.hireDate ? new Date(createEmployeeDto.hireDate) : null,
    };

    const insertResult = await this.employeeRepository.insert(employeeData);
    const employeeId = insertResult.identifiers[ 0 ].id;

    const savedEmployee = await this.employeeRepository.findOne({
      where: { id: employeeId },
      relations: [ 'person' ],
    });

    if (!savedEmployee) {
      throw new Error('Error al crear el empleado');
    }

    return savedEmployee;
  }

  async findAll(): Promise<Employee[]> {
    return await this.employeeRepository.find({
      relations: [ 'person' ],
      order: { created_at: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Employee | null> {
    return await this.employeeRepository.findOne({
      where: { id },
      relations: [ 'person' ],
    });
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee | null> {
    const updateData: any = {};

    if (updateEmployeeDto.status !== undefined) updateData.status = updateEmployeeDto.status;
    if (updateEmployeeDto.jobTitle !== undefined) updateData.jobTitle = updateEmployeeDto.jobTitle;
    if (updateEmployeeDto.hireDate !== undefined) {
      updateData.hireDate = updateEmployeeDto.hireDate ? new Date(updateEmployeeDto.hireDate) : null;
    }

    await this.employeeRepository.update(id, updateData);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.employeeRepository.delete(id);
  }
}
