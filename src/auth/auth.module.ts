import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/schema/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstanst } from 'src/jwt.constanst';
import { JwtStrategy } from './jwt.strategy';
@Module({
  imports: [
    MongooseModule.forFeature([
    {
      name: User.name,
      schema: UserSchema
    }
  ]),
  JwtModule.register({
    secret: jwtConstanst.secret,
    signOptions: { expiresIn: '20h' },
  }),
],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule {}
