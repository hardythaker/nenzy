import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from '../common/guards/local-auth.guard';
import { Public } from '../common/guards/public.guard';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RefreshTokenGuard } from '../common/guards/refresh-token.guard';
import { login } from './dto/login.dto';
import { Request as ExpressRequest } from 'express';
import { Password } from './dto/password.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @Public()
  @ApiBody({ type: login })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Public()
  @Post('signup')
  async signup(@Body() user: CreateUserDto) {
    return this.authService.signup(user);
  }

  @Get('logout')
  logout(@Request() req) {
    this.authService.logout(req.user['sub']);
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@Request() req) {
    const userId = req.user['sub'];
    const refreshToken = req.user['refreshToken'];
    return this.authService.refreshTokens(userId, refreshToken);
  }

  //Forgot password functionality for users who forgot their password.
  //Set the response to 200 ok.
  @Public()
  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  @ApiBody({
    schema: { type: 'object', properties: { email: { type: 'string' } } },
  })
  @ApiResponse({ status: 200, description: 'Email sent' })
  async forgotPassword(
    @Body('email') email: string,
    @Request() req: ExpressRequest,
  ) {
    const serverUrl = `${req.protocol}://${req.get('Host')}`;
    return this.authService.forgotPassword(email, serverUrl);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('reset-password/:encodedIdent/:encodedTimestamp-:hash')
  @ApiResponse({ status: 200, description: 'Password Successfully changed' })
  async resetPassword(
    @Body() passwordDto: Password,
    @Param('encodedIdent') encodedIdent: string,
    @Param('encodedTimestamp') encodedTimestamp: string,
    @Param('hash') hash: string,
  ) {
    return this.authService.resetPassword(
      passwordDto.password,
      encodedIdent,
      encodedTimestamp,
      hash,
    );
  }
}
