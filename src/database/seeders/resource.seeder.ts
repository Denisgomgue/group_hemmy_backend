/**
 * Archivo de configuración de recursos para seeders
 * Define los datos iniciales que se cargarán en la base de datos
 */

export const SEEDER_CONFIG = {
    // Categorías de equipamiento
    equipmentCategories: [
        { code: 'ROUTER', name: 'Router WiFi', description: 'Router inalámbrico para conexión WiFi' },
        { code: 'ONT', name: 'ONT Fibra', description: 'Terminal óptico de red para fibra óptica' },
        { code: 'STB', name: 'Decodificador', description: 'Decodificador para servicios de TV' },
        { code: 'ANTENNA', name: 'Antena Cliente', description: 'Antena para recepción de señal' },
        { code: 'RADIO_CPE', name: 'Radio CPE', description: 'Radio CPE punto a punto' },
        { code: 'SWITCH', name: 'Switch', description: 'Conmutador de red' },
        { code: 'UPS', name: 'UPS', description: 'Sistema de energía ininterrumpida' },
        { code: 'CABLE', name: 'Cable', description: 'Cable de red o conexión' },
    ],

    // Usuarios por defecto
    users: [
        {
            firstName: 'Juan Carlos',
            lastName: 'Administrador',
            email: 'superadmin@hemmy.com',
            phone: '999888777',
            birthdate: '1985-01-15',
            password: 'superadmin123',
            role: 'SUPERADMIN',
            displayName: 'Super Administrador',
        },
        {
            firstName: 'Carlos',
            lastName: 'Tecnico',
            email: 'tecnico@hemmy.com',
            phone: '999888666',
            birthdate: '1990-05-20',
            password: 'tecnico123',
            role: 'TECNICO',
            displayName: 'Técnico de Campo',
        },
        {
            firstName: 'María',
            lastName: 'Secretaria',
            email: 'secretaria@hemmy.com',
            phone: '999888555',
            birthdate: '1992-08-10',
            password: 'secretaria123',
            role: 'SECRETARIA',
            displayName: 'Secretaria Administrativa',
        },
        {
            firstName: 'Ana',
            lastName: 'Administradora',
            email: 'administradora@hemmy.com',
            phone: '999888444',
            birthdate: '1988-12-05',
            password: 'admin123',
            role: 'ADMINISTRADOR',
            displayName: 'Administradora de Sistema',
        },
    ],

    // Roles por defecto
    roles: [
        {
            code: 'SUPERADMIN',
            name: 'Super Administrador',
            description: 'Usuario con acceso total al sistema',
            isSystem: true,
        },
        {
            code: 'ADMINISTRADOR',
            name: 'Administrador',
            description: 'Administrador del sistema con permisos amplios',
            isSystem: false, // Puede ser editado/eliminado
        },
        {
            code: 'TECNICO',
            name: 'Técnico',
            description: 'Técnico de campo para instalaciones y mantenimiento',
            isSystem: false, // Puede ser editado/eliminado
        },
        {
            code: 'SECRETARIA',
            name: 'Secretaria',
            description: 'Secretaria administrativa para gestiones básicas',
            isSystem: false, // Puede ser editado/eliminado
        },
    ],

    // Permisos por defecto
    permissions: [
        // Usuarios
        { code: 'users:read', name: 'Ver Usuarios', description: 'Permiso para ver usuarios' },
        { code: 'users:create', name: 'Crear Usuarios', description: 'Permiso para crear usuarios' },
        { code: 'users:update', name: 'Actualizar Usuarios', description: 'Permiso para actualizar usuarios' },
        { code: 'users:delete', name: 'Eliminar Usuarios', description: 'Permiso para eliminar usuarios' },

        // Roles
        { code: 'roles:read', name: 'Ver Roles', description: 'Permiso para ver roles' },
        { code: 'roles:create', name: 'Crear Roles', description: 'Permiso para crear roles' },
        { code: 'roles:update', name: 'Actualizar Roles', description: 'Permiso para actualizar roles' },
        { code: 'roles:delete', name: 'Eliminar Roles', description: 'Permiso para eliminar roles' },

        // Equipos
        { code: 'equipment:read', name: 'Ver Equipos', description: 'Permiso para ver equipos' },
        { code: 'equipment:create', name: 'Crear Equipos', description: 'Permiso para crear equipos' },
        { code: 'equipment:update', name: 'Actualizar Equipos', description: 'Permiso para actualizar equipos' },
        { code: 'equipment:delete', name: 'Eliminar Equipos', description: 'Permiso para eliminar equipos' },

        // Instalaciones
        { code: 'installations:read', name: 'Ver Instalaciones', description: 'Permiso para ver instalaciones' },
        { code: 'installations:create', name: 'Crear Instalaciones', description: 'Permiso para crear instalaciones' },
        { code: 'installations:update', name: 'Actualizar Instalaciones', description: 'Permiso para actualizar instalaciones' },
        { code: 'installations:delete', name: 'Eliminar Instalaciones', description: 'Permiso para eliminar instalaciones' },

        // Pagos
        { code: 'payments:read', name: 'Ver Pagos', description: 'Permiso para ver pagos' },
        { code: 'payments:create', name: 'Crear Pagos', description: 'Permiso para crear pagos' },
        { code: 'payments:update', name: 'Actualizar Pagos', description: 'Permiso para actualizar pagos' },

        // Tickets
        { code: 'tickets:read', name: 'Ver Tickets', description: 'Permiso para ver tickets' },
        { code: 'tickets:create', name: 'Crear Tickets', description: 'Permiso para crear tickets' },
        { code: 'tickets:update', name: 'Actualizar Tickets', description: 'Permiso para actualizar tickets' },

        // Clientes
        { code: 'clients:read', name: 'Ver Clientes', description: 'Permiso para ver clientes' },
        { code: 'clients:create', name: 'Crear Clientes', description: 'Permiso para crear clientes' },
        { code: 'clients:update', name: 'Actualizar Clientes', description: 'Permiso para actualizar clientes' },

        // Reportes
        { code: 'reports:read', name: 'Ver Reportes', description: 'Permiso para ver reportes' },

        // Configuración
        { code: 'config:read', name: 'Ver Configuración', description: 'Permiso para ver configuración' },
        { code: 'config:update', name: 'Actualizar Configuración', description: 'Permiso para actualizar configuración' },

        // Gestión de Roles y Permisos (SOLO SUPERADMIN)
        { code: 'roles:manage', name: 'Gestionar Roles y Permisos', description: 'Permiso para crear, modificar y eliminar roles y permisos. Solo para superadministradores.' },

        // Permiso Wildcard (SOLO SUPERADMIN)
        { code: '*', name: 'Todos los Permisos', description: 'Permiso wildcard que otorga acceso total al sistema. Solo para SUPERADMIN.' },
    ],

    // Asignación de permisos a roles
    rolePermissions: [
        // SUPERADMIN: permiso wildcard (que incluye todos los permisos) + roles:manage
        { roleCode: 'SUPERADMIN', permissions: [ '*' ] },

        // ADMINISTRADOR: casi todos los permisos excepto algunos críticos
        {
            roleCode: 'ADMINISTRADOR', permissions: [
                'users:read', 'users:create', 'users:update',
                'roles:read',
                'equipment:read', 'equipment:create', 'equipment:update', 'equipment:delete',
                'installations:read', 'installations:create', 'installations:update', 'installations:delete',
                'payments:read', 'payments:create', 'payments:update',
                'clients:read', 'clients:create', 'clients:update',
                'tickets:read', 'tickets:create', 'tickets:update',
                'reports:read',
            ]
        },

        // TECNICO: permisos de instalaciones y equipos
        {
            roleCode: 'TECNICO', permissions: [
                'equipment:read', 'equipment:update',
                'installations:read', 'installations:update',
                'tickets:read', 'tickets:create', 'tickets:update',
                'clients:read',
            ]
        },

        // SECRETARIA: permisos de lectura y gestión básica
        {
            roleCode: 'SECRETARIA', permissions: [
                'clients:read', 'clients:create', 'clients:update',
                'payments:read', 'payments:create',
                'tickets:read', 'tickets:create',
                'installations:read',
            ]
        },
    ],
};

