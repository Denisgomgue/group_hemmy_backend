"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_auth_guard_1 = require("./auth/guards/jwt-auth.guard");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const person_module_1 = require("./person/person.module");
const equipment_module_1 = require("./equipment/equipment.module");
const equipment_history_module_1 = require("./equipment-history/equipment-history.module");
const equipment_categories_module_1 = require("./equipment-categories/equipment-categories.module");
const actor_module_1 = require("./actor/actor.module");
const employee_module_1 = require("./employee/employee.module");
const organization_module_1 = require("./organization/organization.module");
const client_module_1 = require("./client/client.module");
const users_module_1 = require("./users/users.module");
const role_module_1 = require("./role/role.module");
const permission_module_1 = require("./permission/permission.module");
const role_permission_module_1 = require("./role-permission/role-permission.module");
const user_role_module_1 = require("./user-role/user-role.module");
const user_permission_module_1 = require("./user-permission/user-permission.module");
const sector_module_1 = require("./sector/sector.module");
const installation_module_1 = require("./installation/installation.module");
const address_module_1 = require("./address/address.module");
const service_module_1 = require("./service/service.module");
const plan_module_1 = require("./plan/plan.module");
const subscription_module_1 = require("./subscription/subscription.module");
const ticket_module_1 = require("./ticket/ticket.module");
const invoice_item_module_1 = require("./invoice-item/invoice-item.module");
const invoice_module_1 = require("./invoice/invoice.module");
const invoice_ledger_module_1 = require("./invoice-ledger/invoice-ledger.module");
const payment_module_1 = require("./payment/payment.module");
const payment_item_module_1 = require("./payment-item/payment-item.module");
const payment_deferral_module_1 = require("./payment-deferral/payment-deferral.module");
const installation_equipment_module_1 = require("./installation-equipment/installation-equipment.module");
const auth_module_1 = require("./auth/auth.module");
const database_seeder_module_1 = require("./database/seeders/database-seeder.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: process.env.DB_HOST,
                port: parseInt(process.env.DB_PORT || '3306'),
                username: process.env.DB_USER,
                password: process.env.DB_PASSWORD || '',
                database: process.env.DB_NAME,
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                synchronize: true,
                timezone: 'Z',
                logging: ['error', 'warn'],
            }),
            person_module_1.PersonModule,
            equipment_module_1.EquipmentModule,
            equipment_history_module_1.EquipmentHistoryModule,
            equipment_categories_module_1.EquipmentCategoriesModule,
            actor_module_1.ActorModule,
            employee_module_1.EmployeeModule,
            organization_module_1.OrganizationModule,
            client_module_1.ClientModule,
            users_module_1.UsersModule,
            role_module_1.RoleModule,
            permission_module_1.PermissionModule,
            role_permission_module_1.RolePermissionModule,
            user_role_module_1.UserRoleModule,
            user_permission_module_1.UserPermissionModule,
            sector_module_1.SectorModule,
            installation_module_1.InstallationModule,
            address_module_1.AddressModule,
            service_module_1.ServiceModule,
            plan_module_1.PlanModule,
            subscription_module_1.SubscriptionModule,
            ticket_module_1.TicketModule,
            invoice_item_module_1.InvoiceItemModule,
            invoice_module_1.InvoiceModule,
            invoice_ledger_module_1.InvoiceLedgerModule,
            payment_module_1.PaymentModule,
            payment_item_module_1.PaymentItemModule,
            payment_deferral_module_1.PaymentDeferralModule,
            installation_equipment_module_1.InstallationEquipmentModule,
            auth_module_1.AuthModule,
            database_seeder_module_1.DatabaseSeederModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_GUARD,
                useClass: jwt_auth_guard_1.JwtAuthGuard,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map