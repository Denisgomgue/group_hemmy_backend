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

    // Usuario administrador por defecto
    adminUser: {
        firstName: 'Administrador',
        lastName: 'Sistema',
        email: 'admin@hemmy.com',
        phone: '0000000000',
        birthdate: '1990-01-01',
        password: 'admin123',
    },

    // Roles por defecto (para futura expansión)
    roles: [
        // Agregar roles aquí cuando se necesiten
    ],

    // Permisos por defecto (para futura expansión)
    permissions: [
        // Agregar permisos aquí cuando se necesiten
    ],
};

