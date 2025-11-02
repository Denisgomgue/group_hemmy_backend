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
import { Role } from '../../role/entities/role.entity';
import { Permission } from '../../permission/entities/permission.entity';
import { RolePermission } from '../../role-permission/entities/role-permission.entity';
import { UserRole } from '../../user-role/entities/user-role.entity';
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
        @InjectRepository(Role)
        private roleRepository: Repository<Role>,
        @InjectRepository(Permission)
        private permissionRepository: Repository<Permission>,
        @InjectRepository(RolePermission)
        private rolePermissionRepository: Repository<RolePermission>,
        @InjectRepository(UserRole)
        private userRoleRepository: Repository<UserRole>,
    ) { }

    async seedAdminUser() {
        console.log('👤 Seeding usuarios con roles y permisos...');

        try {
            // Verificar si ya existen usuarios
            const existingUsers = await this.userRepository.count();
            if (existingUsers > 0) {
                console.log('  ⏭️  Ya existen usuarios en la base de datos');
                return;
            }

            // Primero crear los roles
            console.log('\n📋 Creando roles...');
            const rolesMap = new Map<string, Role>();
            for (const roleData of SEEDER_CONFIG.roles) {
                const role = this.roleRepository.create(roleData);
                const savedRole = await this.roleRepository.save(role);
                rolesMap.set(roleData.code, savedRole);
                console.log(`  ✅ Rol creado: ${savedRole.name} (${savedRole.code})`);
            }

            // Crear los permisos
            console.log('\n🔐 Creando permisos...');
            const permissionsMap = new Map<string, Permission>();
            for (const permData of SEEDER_CONFIG.permissions) {
                const perm = this.permissionRepository.create(permData);
                const savedPerm = await this.permissionRepository.save(perm);
                permissionsMap.set(permData.code, savedPerm);
            }
            console.log(`  ✅ ${permissionsMap.size} permisos creados`);

            // Asignar permisos a roles
            console.log('\n🔗 Asignando permisos a roles...');
            for (const rolePermData of SEEDER_CONFIG.rolePermissions) {
                const role = rolesMap.get(rolePermData.roleCode);
                if (!role) continue;

                for (const permCode of rolePermData.permissions) {
                    if (permCode === '*') {
                        // Para el permiso wildcard, asignamos todos los permisos
                        for (const perm of permissionsMap.values()) {
                            const rolePerm = this.rolePermissionRepository.create({ role, permission: perm });
                            await this.rolePermissionRepository.save(rolePerm);
                        }
                        console.log(`  ✅ Todos los permisos asignados al rol ${role.name}`);
                    } else {
                        const perm = permissionsMap.get(permCode);
                        if (perm) {
                            const rolePerm = this.rolePermissionRepository.create({ role, permission: perm });
                            await this.rolePermissionRepository.save(rolePerm);
                        }
                    }
                }
            }

            // Crear los usuarios
            console.log('\n👥 Creando usuarios...');
            for (const userConfig of SEEDER_CONFIG.users) {
                // 1️⃣ Crear Persona
                const person = this.personRepository.create({
                    documentType: DocumentType.DNI,
                    documentNumber: `9999999${Math.floor(Math.random() * 9)}`,
                    firstName: userConfig.firstName,
                    lastName: userConfig.lastName,
                    email: userConfig.email,
                    phone: userConfig.phone,
                    birthdate: new Date(userConfig.birthdate),
                });
                const savedPerson = await this.personRepository.save(person);

                // 2️⃣ Crear Actor
                const actor = this.actorRepository.create({
                    kind: ActorKind.PERSON,
                    displayName: userConfig.displayName,
                    person: savedPerson,
                });
                const savedActor = await this.actorRepository.save(actor);

                // 3️⃣ Crear Usuario
                const passwordHash = await bcrypt.hash(userConfig.password, 10);
                const user = this.userRepository.create({
                    actor: savedActor,
                    passwordHash,
                    isActive: true,
                });
                const savedUser = await this.userRepository.save(user);

                // 4️⃣ Asignar Rol al Usuario
                const role = rolesMap.get(userConfig.role);
                if (role) {
                    const userRole = this.userRoleRepository.create({
                        user: savedUser,
                        role,
                        assignedAt: new Date(),
                    });
                    await this.userRoleRepository.save(userRole);
                }

                console.log(`  ✅ Usuario: ${userConfig.email} (${userConfig.role})`);
            }

            console.log('\n✅ Todos los usuarios creados exitosamente con sus roles y permisos!');
        } catch (error) {
            console.error('  ❌ Error creando usuarios:', error.message);
            console.error(error.stack);
        }
    }
}

