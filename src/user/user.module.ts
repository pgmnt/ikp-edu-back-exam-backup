import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/auth/schemas/user.schema';
import { enrollSchema } from 'src/auth/schemas/enroll.schema';
import { OutlineSchema } from 'src/outline/schemas/outline.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';


@Module({

  imports: [MongooseModule.forFeature([
    { name: 'User', schema: UserSchema },
    { name : 'Enroll' , schema : enrollSchema},
    {name : 'Outline' , schema : OutlineSchema}
  ]),
  JwtModule.registerAsync({
    inject: [ConfigService],
    useFactory: (config: ConfigService) => {
      return {
        secret: config.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: config.get<string | number>('JWT_EXPIRES'),
        },
      };
    },
  }),
            ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
