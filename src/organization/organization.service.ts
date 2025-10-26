import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { Organization } from './entities/organization.entity';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private organizationRepository: Repository<Organization>,
  ) { }

  async create(createOrganizationDto: CreateOrganizationDto): Promise<Organization> {
    const organization = this.organizationRepository.create(createOrganizationDto);
    return await this.organizationRepository.save(organization);
  }

  async findAll(): Promise<Organization[]> {
    return await this.organizationRepository.find({
      relations: [ 'representativePerson' ],
      order: { created_at: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Organization | null> {
    return await this.organizationRepository.findOne({
      where: { id },
      relations: [ 'representativePerson' ],
    });
  }

  async update(id: number, updateOrganizationDto: UpdateOrganizationDto): Promise<Organization | null> {
    await this.organizationRepository.update(id, updateOrganizationDto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.organizationRepository.delete(id);
  }
}
