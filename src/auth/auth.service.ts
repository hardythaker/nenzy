import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { compare, hash } from 'bcrypt';
import { User } from 'src/user/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { Types } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { createHash } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validate(username: string, password: string) {
    const user = await this.userService.findByUsername(username);
    if (user && (await compare(password, user.password))) {
      const { password, ...result } = user.toJSON();
      return result;
    }
    return null;
  }

  async login(user: User) {
    const tokens = await this.getTokens(user._id, user.username);
    await this.updateRefreshToken(user._id, tokens.refreshToken);
    return tokens;
  }

  async signup(createUserDto: CreateUserDto) {
    // Check if user exists
    const userExists = await this.userService.findByUsername(
      createUserDto.username,
    );
    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    // Hash password
    const password = await this.hashData(createUserDto.password);
    const newUser = await this.userService.create({
      ...createUserDto,
      password,
    });

    const tokens = await this.getTokens(newUser.id, newUser.username);
    await this.updateRefreshToken(newUser.id, tokens.refreshToken);
    return tokens;
  }

  async logout(userId: string) {
    return this.userService.update(userId, { refreshToken: null });
  }

  hashData(data: string) {
    return hash(data, 10);
  }

  async updateRefreshToken(userId: Types.ObjectId, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    const id = userId.toString();

    await this.userService.update(id, {
      refreshToken: hashedRefreshToken,
    });
  }

  async getTokens(userId: Types.ObjectId, username: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: parseInt(
            this.configService.getOrThrow<string>(
              'ACCESS_TOKEN_VALIDITY_DURATION_IN_SEC',
            ),
          ),
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: parseInt(
            this.configService.getOrThrow<string>(
              'REFRESH_TOKEN_VALIDITY_DURATION_IN_SEC',
            ),
          ),
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.userService.findOneById(userId);
    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied');
    const refreshTokenMatches = await compare(refreshToken, user.refreshToken);
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
    const tokens = await this.getTokens(user.id, user.username);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  //Forgot password function
  async forgotPassword(email: string, serverUrl: string) {
    const user = await this.userService.findByUsername(email);
    if (!user) return;

    const timestamp = Date.now().toString();

    const encodedTimestamp = Buffer.from(timestamp).toString('base64url');
    const encodedIdent = Buffer.from(user.id).toString('base64url');

    const hash = this.generateSHA256Hash(
      timestamp,
      user.id,
      user.password,
      user.username,
    );

    const url = `${serverUrl}/reset-password/${encodedIdent}/${encodedTimestamp}-${hash}`;
    return url;
  }

  async resetPassword(
    password: string,
    encodedIdent: string,
    encodedTimestamp: string,
    hash: string,
  ) {
    //decode the timestamp and ident
    const timestamp = Buffer.from(encodedTimestamp, 'base64url').toString();
    const ident = Buffer.from(encodedIdent, 'base64url').toString();

    //Compare the decoded timestamp with the current timestamp and check if it lies within an hour.
    const currentDate = new Date();
    const timestampDate = new Date(+timestamp);
    const timeDiff = currentDate.getTime() - timestampDate.getTime();
    const diffHours = timeDiff / (1000 * 60 * 60);
    if (diffHours > 1) {
      throw new BadRequestException('Link has expired');
    }

    //find the user; fail if doesn't exists
    const user = await this.userService.findOneById(ident);
    if (!user) throw new BadRequestException('User not found');

    //Generate the hash again
    const newHash = this.generateSHA256Hash(
      timestamp,
      user.id,
      user.password,
      user.username,
    );

    //compare if both the hash are same; fail if not same
    if (newHash !== hash) throw new BadRequestException('Link is Invalid');

    //Update the password
    const hashedPassword = await this.hashData(password);
    await this.userService.update(user.id, { password: hashedPassword });

    //Set the response code success respponse or 200
    const response = {
      message: 'Password reset successful',
    };
    return response; //return the response;
  }

  generateSHA256Hash(
    timestamp: string,
    ident: string,
    password: string,
    username: string,
  ) {
    return createHash('sha256')
      .update(JSON.stringify({ timestamp, ident, password, username }))
      .digest('hex');
  }
}
