"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cookieParser = require("cookie-parser");
const common_1 = require("@nestjs/common");
const path_1 = require("path");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    if (process.env.NODE_ENV !== 'production') {
        try {
            console.log('🔄 Verificando seeders de base de datos...');
            const { runSeeders } = await Promise.resolve().then(() => require('./database/seeders/run-seeders'));
            await runSeeders(app);
        }
        catch (error) {
            console.error('⚠️  Error ejecutando seeders (continuando):', error);
        }
    }
    app.enableCors({
        origin: process.env.FRONTEND_URL || 'http://localhost:3001',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    });
    app.use(cookieParser());
    app.useStaticAssets((0, path_1.join)(process.cwd(), 'uploads'), {
        prefix: '/uploads/',
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    await app.listen(process.env.PORT ?? 3000);
    console.log(`🚀 Servidor corriendo en puerto ${process.env.PORT ?? 3000}`);
}
bootstrap();
//# sourceMappingURL=main.js.map