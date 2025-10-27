import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../../users/users.service';
import { PersonService } from '../../person/person.service';
import { ActorService } from '../../actor/actor.service';
import { SEEDER_CONFIG } from './resource.seeder';
import { DocumentType, Person } from '../../person/entities/person.entity';
import { ActorKind, Actor } from '../../actor/entities/actor.entity';
import { User } from '../../users/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserSeederService {
    constructor(
        @InjectRepository(Person)
        private personRepository: Repository<Person>,
        @InjectRepository(Actor)
        private actorRepository: Repository<Actor>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async seedAdminUser() {
        console.log('👤 Seeding usuario administrador...');

        try {
            // Verificar si ya existe un usuario admin buscando en la base de datos
            let adminExists = false;
            try {
                const existingUsers = await this.userRepository.find({ take: 1 });
                adminExists = existingUsers.length > 0;
            } catch (error) {
                // Si no hay usuarios, continuamos
            }

            if (adminExists) {
                console.log('  ⏭️  Usuario administrador ya existe');
                return;
            }

            // Datos de la persona desde configuración
            const personData = {
                documentType: DocumentType.DNI,
                documentNumber: '00000000',
                firstName: SEEDER_CONFIG.adminUser.firstName,
                lastName: SEEDER_CONFIG.adminUser.lastName,
                email: SEEDER_CONFIG.adminUser.email,
                phone: SEEDER_CONFIG.adminUser.phone,
                birthdate: new Date(SEEDER_CONFIG.adminUser.birthdate),
            };

            // 1️⃣ Crear Persona directamente en la BD
            const person = this.personRepository.create(personData);
            const savedPerson = await this.personRepository.save(person);
            console.log(`  ✅ Persona creada: ${savedPerson.firstName} ${savedPerson.lastName} (ID: ${savedPerson.id})`);

            // 2️⃣ Crear Actor vinculado a la Persona
            const actorData = {
                kind: ActorKind.PERSON,
                displayName: `${SEEDER_CONFIG.adminUser.firstName} ${SEEDER_CONFIG.adminUser.lastName}`,
                person: savedPerson,
            };
            const actor = this.actorRepository.create(actorData);
            const savedActor = await this.actorRepository.save(actor);
            console.log(`  ✅ Actor creado: ${savedActor.displayName} (ID: ${savedActor.id})`);

            // 3️⃣ Crear Usuario vinculado al Actor
            const passwordHash = await bcrypt.hash(SEEDER_CONFIG.adminUser.password, 10);
            const userData = {
                actor: savedActor,
                passwordHash: passwordHash,
                isActive: true,
            };
            const user = this.userRepository.create(userData);
            const savedUser = await this.userRepository.save(user);
            console.log(`  ✅ Usuario administrador creado (ID: ${savedUser.id})`);
            console.log(`  📧 Email: ${SEEDER_CONFIG.adminUser.email}`);
            console.log(`  🔑 Password: ${SEEDER_CONFIG.adminUser.password}`);
            console.log(`  🔗 Persona → Actor → Usuario vinculados correctamente`);
        } catch (error) {
            console.error(
                '  ❌ Error creando usuario administrador:',
                error.message,
            );
        }
    }
}

