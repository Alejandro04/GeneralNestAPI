import { Injectable, HttpException } from '@nestjs/common';
import { RegisterAuthDto} from './dto/register-auth.dto';
import { hash, compare } from "bcrypt";
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/users/schema/user.schema';
import { Model } from 'mongoose';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel:Model<UserDocument>, 
  private jwtAuthService: JwtService
  ) {}

  async register(userObject: RegisterAuthDto) {
    const { password } = userObject;
    const plainToHash = await hash(password, 10);
    userObject = {...userObject, password:plainToHash };
    return this.userModel.create(userObject);
  }

  async login(UserObjectLogin: LoginAuthDto){
    const { email, password } = UserObjectLogin;
    const findUser = await this.userModel.findOne({ email });

    if(!findUser) throw new HttpException('USER_NOT_FOUND', 404);
    const checkPassword = await compare(password, findUser.password);
    console.log(password)
    console.log(findUser.password)
    console.log(checkPassword)

    if(!checkPassword) throw new HttpException('PASSWORD_INCORRECT', 401);

    const payload = { id: findUser._id, name: findUser.name }
    const token = this.jwtAuthService.sign(payload)

    const data = {
      user: findUser,
      token
    };

    return data;
  }
}
