/**
 * Archivo de configuración de recursos y permisos para seeders
 * Define los datos iniciales que se cargarán en la base de datos
 */

export const SEEDER_CONFIG = {
    // Recursos del sistema (módulos/entidades)
    resources: [
        { routeCode: 'users', name: 'Usuarios', description: 'Gestión de usuarios del sistema', isActive: true, orderIndex: 1 },
        { routeCode: 'roles', name: 'Roles', description: 'Gestión de roles del sistema', isActive: true, orderIndex: 2 },
        { routeCode: 'permissions', name: 'Permisos', description: 'Gestión de permisos del sistema', isActive: true, orderIndex: 3 },
        { routeCode: 'equipment', name: 'Equipos', description: 'Gestión de equipos e inventario', isActive: true, orderIndex: 4 },
        { routeCode: 'installations', name: 'Instalaciones', description: 'Gestión de instalaciones de clientes', isActive: true, orderIndex: 5 },
        { routeCode: 'clients', name: 'Clientes', description: 'Gestión de clientes', isActive: true, orderIndex: 6 },
        { routeCode: 'payments', name: 'Pagos', description: 'Gestión de pagos y facturación', isActive: true, orderIndex: 7 },
        { routeCode: 'tickets', name: 'Tickets', description: 'Gestión de tickets y soporte', isActive: true, orderIndex: 8 },
        { routeCode: 'reports', name: 'Reportes', description: 'Visualización de reportes', isActive: true, orderIndex: 9 },
        { routeCode: 'config', name: 'Configuración', description: 'Configuración del sistema', isActive: true, orderIndex: 10 },
    ],

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
            isSystem: false,
        },
        {
            code: 'TECNICO',
            name: 'Técnico',
            description: 'Técnico de campo para instalaciones y mantenimiento',
            isSystem: false,
        },
        {
            code: 'SECRETARIA',
            name: 'Secretaria',
            description: 'Secretaria administrativa para gestiones básicas',
            isSystem: false,
        },
    ],

    // Permisos por defecto - Ahora vinculados a recursos
    // Los permisos se generan automáticamente por recurso con formato: resourceCode:action
    permissions: [
        // Permisos de Usuarios (vinculados al recurso 'users')
        { code: 'users:read', name: 'Ver Usuarios', description: 'Permiso para ver usuarios', resourceRouteCode: 'users' },
        { code: 'users:create', name: 'Crear Usuarios', description: 'Permiso para crear usuarios', resourceRouteCode: 'users' },
        { code: 'users:update', name: 'Actualizar Usuarios', description: 'Permiso para actualizar usuarios', resourceRouteCode: 'users' },
        { code: 'users:delete', name: 'Eliminar Usuarios', description: 'Permiso para eliminar usuarios', resourceRouteCode: 'users' },

        // Permisos de Roles (vinculados al recurso 'roles')
        { code: 'roles:read', name: 'Ver Roles', description: 'Permiso para ver roles', resourceRouteCode: 'roles' },
        { code: 'roles:create', name: 'Crear Roles', description: 'Permiso para crear roles', resourceRouteCode: 'roles' },
        { code: 'roles:update', name: 'Actualizar Roles', description: 'Permiso para actualizar roles', resourceRouteCode: 'roles' },
        { code: 'roles:delete', name: 'Eliminar Roles', description: 'Permiso para eliminar roles', resourceRouteCode: 'roles' },
        { code: 'roles:manage', name: 'Gestionar Roles y Permisos', description: 'Permiso para crear, modificar y eliminar roles y permisos. Solo para superadministradores.', resourceRouteCode: 'roles' },

        // Permisos de Permisos (vinculados al recurso 'permissions')
        { code: 'permissions:read', name: 'Ver Permisos', description: 'Permiso para ver permisos', resourceRouteCode: 'permissions' },
        { code: 'permissions:create', name: 'Crear Permisos', description: 'Permiso para crear permisos', resourceRouteCode: 'permissions' },
        { code: 'permissions:update', name: 'Actualizar Permisos', description: 'Permiso para actualizar permisos', resourceRouteCode: 'permissions' },
        { code: 'permissions:delete', name: 'Eliminar Permisos', description: 'Permiso para eliminar permisos', resourceRouteCode: 'permissions' },

        // Permisos de Equipos (vinculados al recurso 'equipment')
        { code: 'equipment:read', name: 'Ver Equipos', description: 'Permiso para ver equipos', resourceRouteCode: 'equipment' },
        { code: 'equipment:create', name: 'Crear Equipos', description: 'Permiso para crear equipos', resourceRouteCode: 'equipment' },
        { code: 'equipment:update', name: 'Actualizar Equipos', description: 'Permiso para actualizar equipos', resourceRouteCode: 'equipment' },
        { code: 'equipment:delete', name: 'Eliminar Equipos', description: 'Permiso para eliminar equipos', resourceRouteCode: 'equipment' },

        // Permisos de Instalaciones (vinculados al recurso 'installations')
        { code: 'installations:read', name: 'Ver Instalaciones', description: 'Permiso para ver instalaciones', resourceRouteCode: 'installations' },
        { code: 'installations:create', name: 'Crear Instalaciones', description: 'Permiso para crear instalaciones', resourceRouteCode: 'installations' },
        { code: 'installations:update', name: 'Actualizar Instalaciones', description: 'Permiso para actualizar instalaciones', resourceRouteCode: 'installations' },
        { code: 'installations:delete', name: 'Eliminar Instalaciones', description: 'Permiso para eliminar instalaciones', resourceRouteCode: 'installations' },

        // Permisos de Clientes (vinculados al recurso 'clients')
        { code: 'clients:read', name: 'Ver Clientes', description: 'Permiso para ver clientes', resourceRouteCode: 'clients' },
        { code: 'clients:create', name: 'Crear Clientes', description: 'Permiso para crear clientes', resourceRouteCode: 'clients' },
        { code: 'clients:update', name: 'Actualizar Clientes', description: 'Permiso para actualizar clientes', resourceRouteCode: 'clients' },

        // Permisos de Pagos (vinculados al recurso 'payments')
        { code: 'payments:read', name: 'Ver Pagos', description: 'Permiso para ver pagos', resourceRouteCode: 'payments' },
        { code: 'payments:create', name: 'Crear Pagos', description: 'Permiso para crear pagos', resourceRouteCode: 'payments' },
        { code: 'payments:update', name: 'Actualizar Pagos', description: 'Permiso para actualizar pagos', resourceRouteCode: 'payments' },

        // Permisos de Tickets (vinculados al recurso 'tickets')
        { code: 'tickets:read', name: 'Ver Tickets', description: 'Permiso para ver tickets', resourceRouteCode: 'tickets' },
        { code: 'tickets:create', name: 'Crear Tickets', description: 'Permiso para crear tickets', resourceRouteCode: 'tickets' },
        { code: 'tickets:update', name: 'Actualizar Tickets', description: 'Permiso para actualizar tickets', resourceRouteCode: 'tickets' },

        // Permisos de Reportes (vinculados al recurso 'reports')
        { code: 'reports:read', name: 'Ver Reportes', description: 'Permiso para ver reportes', resourceRouteCode: 'reports' },

        // Permisos de Configuración (vinculados al recurso 'config')
        { code: 'config:read', name: 'Ver Configuración', description: 'Permiso para ver configuración', resourceRouteCode: 'config' },
        { code: 'config:update', name: 'Actualizar Configuración', description: 'Permiso para actualizar configuración', resourceRouteCode: 'config' },

        // Permiso Wildcard (NO vinculado a ningún recurso, es especial)
        { code: '*', name: 'Todos los Permisos', description: 'Permiso wildcard que otorga acceso total al sistema. Solo para SUPERADMIN.', resourceRouteCode: null },
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
