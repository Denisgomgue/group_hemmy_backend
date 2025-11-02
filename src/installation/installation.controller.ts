import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { InstallationService } from './installation.service';
import { CreateInstallationDto } from './dto/create-installation.dto';
import { UpdateInstallationDto } from './dto/update-installation.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { memoryStorage } from 'multer';
import { join } from 'path';
import * as fs from 'fs';
import * as sharp from 'sharp';

@Controller('installation')
export class InstallationController {
  constructor(private readonly installationService: InstallationService) { }

  @Post()
  create(@Body() createInstallationDto: CreateInstallationDto) {
    return this.installationService.create(createInstallationDto);
  }

  @Get()
  findAll() {
    return this.installationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.installationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInstallationDto: UpdateInstallationDto) {
    return this.installationService.update(+id, updateInstallationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.installationService.remove(+id);
  }

  @Post(':id/upload-image')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: memoryStorage(),
      limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/)) {
          return callback(new Error('Solo se permiten archivos de imagen'), false);
        }
        callback(null, true);
      },
    }),
  )
  async uploadImage(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    // Obtener la instalación actual para eliminar la imagen anterior si existe
    const currentInstallation = await this.installationService.findOne(+id);
    if (currentInstallation?.imagePath) {
      const oldImagePath = join(process.cwd(), currentInstallation.imagePath);
      // Eliminar la imagen anterior si existe
      if (fs.existsSync(oldImagePath)) {
        try {
          fs.unlinkSync(oldImagePath);
        } catch (error) {
          console.error('Error al eliminar imagen anterior:', error);
        }
      }
    }

    // Crear directorio si no existe
    const uploadDir = join(process.cwd(), 'uploads', 'installations');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Generar nombre único
    const filename = `${id}-${Date.now()}-${Math.round(Math.random() * 1E9)}.jpg`;
    const filepath = join(uploadDir, filename);

    // Optimizar y guardar imagen
    await sharp(file.buffer)
      .resize(1920, 1080, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 85 })
      .toFile(filepath);

    // Actualizar la instalación con la ruta de la imagen
    return await this.installationService.update(+id, {
      imagePath: `/uploads/installations/${filename}`,
    });
  }
}
