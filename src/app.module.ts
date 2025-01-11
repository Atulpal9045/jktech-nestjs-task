import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'nestjs_user_docs',
      entities: [User, Document],
      synchronize: true, // Not recommended for production
    }),
    AuthModule,
    // UsersModule,
    // DocumentsModule,
    // IngestionModule,
  ],
})
export class AppModule {}
