import { Injectable } from '@nestjs/common';
import { RegisterAuthDto} from './dto/register-auth.dto';
import { hash } from "bcrypt";
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/users/schema/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel:Model<UserDocument>
  ) {}

  async register(userObject: RegisterAuthDto) {
    const { password } = userObject;
    const plainToHash = await hash(password, 10);
    userObject = {...userObject, password:plainToHash };
    return this.userModel.create(userObject);
  }
}
