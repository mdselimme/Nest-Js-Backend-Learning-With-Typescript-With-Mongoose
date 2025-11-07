/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentModule } from './student/student.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { LibraryModule } from './library/library.module';
import { ProjectModule } from './project/project.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }), MongooseModule.forRoot(`${process.env.MONGO_URI!}`), StudentModule, UserModule, ProductModule, LibraryModule, ProjectModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
