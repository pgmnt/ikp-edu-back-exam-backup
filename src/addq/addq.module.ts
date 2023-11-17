import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { AddqController } from './addq.controller';
import { AddqService } from './addq.service';
import { QuizResponseSchema } from './schemas/addq.schemas'; // Import the separated schema

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'QuizResponse', schema: QuizResponseSchema }]), // Use the separated schema
  ],
  controllers: [AddqController],
  providers: [AddqService],
})
export class AddqModule {}
