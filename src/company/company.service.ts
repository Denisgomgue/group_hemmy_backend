import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './entities/company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { LogoType } from './dto/upload-logo.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) { }

  async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    // Verificar si ya existe una empresa con el mismo RUC
    const existingCompany = await this.companyRepository.findOne({
      where: { ruc: createCompanyDto.ruc }
    });

    if (existingCompany) {
      throw new ConflictException('Ya existe una empresa con este RUC');
    }

    const company = this.companyRepository.create(createCompanyDto);
    return await this.companyRepository.save(company);
  }

  async findAll(): Promise<Company[]> {
    return await this.companyRepository.find({
      where: { isActive: true },
      order: { created_at: 'DESC' }
    });
  }

  async findOne(id: number): Promise<Company> {
    const company = await this.companyRepository.findOne({
      where: { id, isActive: true }
    });

    if (!company) {
      throw new NotFoundException(`Empresa con ID ${id} no encontrada`);
    }

    return company;
  }

  async findActive(): Promise<Company | null> {
    return await this.companyRepository.findOne({
      where: { isActive: true },
      order: { created_at: 'DESC' }
    });
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto): Promise<Company> {
    const company = await this.findOne(id);

    // Si se está actualizando el RUC, verificar que no exista otro
    if (updateCompanyDto.ruc && updateCompanyDto.ruc !== company.ruc) {
      const existingCompany = await this.companyRepository.findOne({
        where: { ruc: updateCompanyDto.ruc }
      });

      if (existingCompany) {
        throw new ConflictException('Ya existe una empresa con este RUC');
      }
    }

    // Filtrar solo los campos que tienen valores definidos (no undefined, null, vacíos o espacios en blanco)
    const fieldsToUpdate = Object.entries(updateCompanyDto).reduce((acc, [ key, value ]) => {
      // Solo incluir campos con valores reales
      if (value !== undefined && value !== null && value !== '' && value !== ' ' && value !== '  ') {
        // Para strings, solo si no están vacíos después de quitar espacios
        if (typeof value === 'string' && value.trim() !== '') {
          acc[ key ] = value.trim();
        } else if (typeof value !== 'string') {
          // Para otros tipos (number, boolean, etc.)
          acc[ key ] = value;
        }
      }
      return acc;
    }, {} as any);



    Object.assign(company, fieldsToUpdate);
    const updatedCompany = await this.companyRepository.save(company);


    return updatedCompany;
  }

  async remove(id: number): Promise<void> {
    const company = await this.findOne(id);
    company.isActive = false;
    await this.companyRepository.save(company);
  }

  async uploadLogo(id: number, logoType: LogoType, file: Express.Multer.File): Promise<Company> {
    const company = await this.findOne(id);

    // Validar tipo de archivo
    const allowedTypes = [ 'image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml', 'image/webp' ];
    if (!allowedTypes.includes(file.mimetype)) {
      throw new BadRequestException('Tipo de archivo no válido. Solo se permiten imágenes (JPEG, PNG, SVG, WebP)');
    }

    // Validar tamaño del archivo (5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      throw new BadRequestException('El archivo es demasiado grande. Máximo 5MB');
    }

    // Guardar el archivo
    const uploadsDir = path.join(process.cwd(), 'uploads', 'company-logos', id.toString());
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const ext = path.extname(file.originalname);
    const filename = `${logoType}${ext}`;
    const filepath = path.join(uploadsDir, filename);

    fs.writeFileSync(filepath, file.buffer);

    // Crear la ruta relativa para almacenar en la BD
    const logoPath = `/uploads/company-logos/${id}/${filename}`;

    // Actualizar el campo correspondiente en la empresa
    switch (logoType) {
      case LogoType.NORMAL:
        company.logoNormal = logoPath;
        break;
      case LogoType.HORIZONTAL:
        company.logoHorizontal = logoPath;
        break;
      case LogoType.REDUCED:
        company.logoReduced = logoPath;
        break;
      case LogoType.NEGATIVE:
        company.logoNegative = logoPath;
        break;
      default:
        throw new BadRequestException('Tipo de logo no válido');
    }

    return await this.companyRepository.save(company);
  }

  async getCompanyInfo(): Promise<any> {
    const company = await this.findActive();

    if (!company) {
      throw new NotFoundException('No hay información de empresa configurada');
    }

    return {
      id: company.id,
      name: company.name,
      businessName: company.businessName,
      ruc: company.ruc,
      address: company.address,
      district: company.district,
      city: company.city,
      province: company.province,
      country: company.country,
      phone: company.phone,
      email: company.email,
      website: company.website,
      description: company.description,
      logos: {
        normal: company.logoNormal,
        horizontal: company.logoHorizontal,
        reduced: company.logoReduced,
        negative: company.logoNegative
      },
      slogan: company.slogan,
      mission: company.mission,
      vision: company.vision,
      socialMedia: company.socialMedia ? JSON.parse(company.socialMedia) : null,
      businessHours: company.businessHours,
      taxCategory: company.taxCategory,
      economicActivity: company.economicActivity
    };
  }
} 