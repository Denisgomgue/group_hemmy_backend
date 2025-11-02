import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonModule } from './person/person.module';
import { EquipmentModule } from './equipment/equipment.module';
import { EquipmentHistoryModule } from './equipment-history/equipment-history.module';
import { EquipmentCategoriesModule } from './equipment-categories/equipment-categories.module';
import { ActorModule } from './actor/actor.module';
import { EmployeeModule } from './employee/employee.module';
import { OrganizationModule } from './organization/organization.module';
import { ClientModule } from './client/client.module';
import { UsersModule } from './users/users.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { RolePermissionModule } from './role-permission/role-permission.module';
import { UserRoleModule } from './user-role/user-role.module';
import { UserPermissionModule } from './user-permission/user-permission.module';
import { SectorModule } from './sector/sector.module';
import { InstallationModule } from './installation/installation.module';
import { AddressModule } from './address/address.module';
import { ServiceModule } from './service/service.module';
import { PlanModule } from './plan/plan.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { TicketModule } from './ticket/ticket.module';
import { InvoiceItemModule } from './invoice-item/invoice-item.module';
import { InvoiceModule } from './invoice/invoice.module';
import { InvoiceLedgerModule } from './invoice-ledger/invoice-ledger.module';
import { PaymentModule } from './payment/payment.module';
import { PaymentItemModule } from './payment-item/payment-item.module';
import { PaymentDeferralModule } from './payment-deferral/payment-deferral.module';
import { InstallationEquipmentModule } from './installation-equipment/installation-equipment.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseSeederModule } from './database/seeders/database-seeder.module';
import { CompanyModule } from './company/company.module';
import { NotificationModule } from './notification/notification.module';
import { User } from './users/entities/user.entity';
import { Company } from './company/entities/company.entity';
import { Notification } from './notification/entities/notification.entity';
import { Actor } from './actor/entities/actor.entity';
import { Person } from './person/entities/person.entity';
import { Employee } from './employee/entities/employee.entity';
import { Organization } from './organization/entities/organization.entity';
import { Client } from './client/entities/client.entity';
import { Role } from './role/entities/role.entity';
import { Permission } from './permission/entities/permission.entity';
import { RolePermission } from './role-permission/entities/role-permission.entity';
import { UserRole } from './user-role/entities/user-role.entity';
import { UserPermission } from './user-permission/entities/user-permission.entity';
import { Sector } from './sector/entities/sector.entity';
import { Installation } from './installation/entities/installation.entity';
import { InstallationEquipment } from './installation-equipment/entities/installation-equipment.entity';
import { Address } from './address/entities/address.entity';
import { Service } from './service/entities/service.entity';
import { Plan } from './plan/entities/plan.entity';
import { Subscription } from './subscription/entities/subscription.entity';
import { Ticket } from './ticket/entities/ticket.entity';
import { Invoice } from './invoice/entities/invoice.entity';
import { InvoiceItem } from './invoice-item/entities/invoice-item.entity';
import { InvoiceLedger } from './invoice-ledger/entities/invoice-ledger.entity';
import { Payment } from './payment/entities/payment.entity';
import { PaymentItem } from './payment-item/entities/payment-item.entity';
import { PaymentDeferral } from './payment-deferral/entities/payment-deferral.entity';
import { Equipment } from './equipment/entities/equipment.entity';
import { EquipmentCategory } from './equipment-categories/entities/equipment-category.entity';
import { EquipmentHistory } from './equipment-history/entities/equipment-history.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '3306'),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME,
      entities: [
        // Core Entities
        User,
        Person,
        Actor,
        Company,
        Organization,

        // Client & Employee Entities
        Client,
        Employee,

        // Role & Permission Entities
        Role,
        Permission,
        UserRole,
        RolePermission,
        UserPermission,

        // Sector & Installation Entities
        Sector,
        Installation,
        InstallationEquipment,

        // Service & Subscription Entities
        Address,
        Service,
        Plan,
        Subscription,

        // Invoice & Payment Entities
        Invoice,
        InvoiceItem,
        InvoiceLedger,
        Payment,
        PaymentItem,
        PaymentDeferral,

        // Equipment Entities
        Equipment,
        EquipmentCategory,
        EquipmentHistory,

        // Ticket Entity
        Ticket,

        // Notification Entity
        Notification,
      ],
      synchronize: true,
      timezone: 'Z',
      logging: [ 'error', 'warn' ], // Temporal: para verificar si el pool se destruye/recicla
    }),
    PersonModule,
    EquipmentModule,
    EquipmentHistoryModule,
    EquipmentCategoriesModule,
    ActorModule,
    EmployeeModule,
    OrganizationModule,
    ClientModule,
    UsersModule,
    RoleModule,
    PermissionModule,
    RolePermissionModule,
    UserRoleModule,
    UserPermissionModule,
    SectorModule,
    InstallationModule,
    AddressModule,
    ServiceModule,
    PlanModule,
    SubscriptionModule,
    TicketModule,
    InvoiceItemModule,
    InvoiceModule,
    InvoiceLedgerModule,
    PaymentModule,
    PaymentItemModule,
    PaymentDeferralModule,
    InstallationEquipmentModule,
    AuthModule,
    DatabaseSeederModule,
    CompanyModule,
    NotificationModule
  ],
  controllers: [ AppController ],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule { }
