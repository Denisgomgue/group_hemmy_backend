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
const resource_module_1 = require("./resource/resource.module");
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
const company_module_1 = require("./company/company.module");
const notification_module_1 = require("./notification/notification.module");
const user_entity_1 = require("./users/entities/user.entity");
const company_entity_1 = require("./company/entities/company.entity");
const notification_entity_1 = require("./notification/entities/notification.entity");
const actor_entity_1 = require("./actor/entities/actor.entity");
const person_entity_1 = require("./person/entities/person.entity");
const employee_entity_1 = require("./employee/entities/employee.entity");
const organization_entity_1 = require("./organization/entities/organization.entity");
const client_entity_1 = require("./client/entities/client.entity");
const role_entity_1 = require("./role/entities/role.entity");
const permission_entity_1 = require("./permission/entities/permission.entity");
const role_permission_entity_1 = require("./role-permission/entities/role-permission.entity");
const resource_entity_1 = require("./resource/entities/resource.entity");
const user_role_entity_1 = require("./user-role/entities/user-role.entity");
const user_permission_entity_1 = require("./user-permission/entities/user-permission.entity");
const sector_entity_1 = require("./sector/entities/sector.entity");
const installation_entity_1 = require("./installation/entities/installation.entity");
const installation_equipment_entity_1 = require("./installation-equipment/entities/installation-equipment.entity");
const address_entity_1 = require("./address/entities/address.entity");
const service_entity_1 = require("./service/entities/service.entity");
const plan_entity_1 = require("./plan/entities/plan.entity");
const subscription_entity_1 = require("./subscription/entities/subscription.entity");
const ticket_entity_1 = require("./ticket/entities/ticket.entity");
const invoice_entity_1 = require("./invoice/entities/invoice.entity");
const invoice_item_entity_1 = require("./invoice-item/entities/invoice-item.entity");
const invoice_ledger_entity_1 = require("./invoice-ledger/entities/invoice-ledger.entity");
const payment_entity_1 = require("./payment/entities/payment.entity");
const payment_item_entity_1 = require("./payment-item/entities/payment-item.entity");
const payment_deferral_entity_1 = require("./payment-deferral/entities/payment-deferral.entity");
const equipment_entity_1 = require("./equipment/entities/equipment.entity");
const equipment_category_entity_1 = require("./equipment-categories/entities/equipment-category.entity");
const equipment_history_entity_1 = require("./equipment-history/entities/equipment-history.entity");
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
                entities: [
                    user_entity_1.User,
                    person_entity_1.Person,
                    actor_entity_1.Actor,
                    company_entity_1.Company,
                    organization_entity_1.Organization,
                    client_entity_1.Client,
                    employee_entity_1.Employee,
                    role_entity_1.Role,
                    permission_entity_1.Permission,
                    user_role_entity_1.UserRole,
                    role_permission_entity_1.RolePermission,
                    user_permission_entity_1.UserPermission,
                    resource_entity_1.Resource,
                    sector_entity_1.Sector,
                    installation_entity_1.Installation,
                    installation_equipment_entity_1.InstallationEquipment,
                    address_entity_1.Address,
                    service_entity_1.Service,
                    plan_entity_1.Plan,
                    subscription_entity_1.Subscription,
                    invoice_entity_1.Invoice,
                    invoice_item_entity_1.InvoiceItem,
                    invoice_ledger_entity_1.InvoiceLedger,
                    payment_entity_1.Payment,
                    payment_item_entity_1.PaymentItem,
                    payment_deferral_entity_1.PaymentDeferral,
                    equipment_entity_1.Equipment,
                    equipment_category_entity_1.EquipmentCategory,
                    equipment_history_entity_1.EquipmentHistory,
                    ticket_entity_1.Ticket,
                    notification_entity_1.Notification,
                ],
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
            resource_module_1.ResourceModule,
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
            database_seeder_module_1.DatabaseSeederModule,
            company_module_1.CompanyModule,
            notification_module_1.NotificationModule
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