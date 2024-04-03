import { Request as ExpressRequest } from 'express';
import {
  DefaultHttpExceptionSchema,
} from 'src/common/dto/default-http-exception.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { LocalAuthGuard } from '../common/guards/local-auth.guard';
import { Public } from '../common/guards/public.guard';
import { RefreshTokenGuard } from '../common/guards/refresh-token.guard';
import { AuthService } from './auth.service';
import { login } from './dto/login.dto';
import { LoginResponse } from './dto/LoginResponse.dto';
import { Password } from './dto/password.dto';
import { SignUpResponse } from './dto/sign-up-response.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: login })
  @ApiOkResponse({
    description: 'User logged in',
    type: LoginResponse,
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid credentials',
    type: DefaultHttpExceptionSchema,
  })
  async login(@Request() req): Promise<LoginResponse> {
    return this.authService.login(req.user);
  }

  @Public()
  @ApiCreatedResponse({
    description: 'Account created',
    type: SignUpResponse,
  })
  @ApiBadRequestResponse({
    description: 'User already Exists',
    type: DefaultHttpExceptionSchema,
  })
  @Post('signup')
  async signup(@Body() user: CreateUserDto): Promise<SignUpResponse> {
    return this.authService.signup(user);
  }

  @Get('logout')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'User logged out' })
  async logout(@Request() req): Promise<void> {
    this.authService.logout(req.user?.['sub']);
    return;
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  @ApiOkResponse({
    description: 'Refreshed tokens',
    type: LoginResponse,
    status: HttpStatus.OK,
  })
  @ApiForbiddenResponse({
    description: 'Invalid refresh token',
    type: DefaultHttpExceptionSchema,
    status: HttpStatus.FORBIDDEN,
  })
  refreshTokens(@Request() req): Promise<LoginResponse | ForbiddenException> {
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
  ): Promise<void> {
    const serverUrl = `${req.protocol}://${req.get('Host')}`;
    this.authService.forgotPassword(email, serverUrl);
    return;
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('reset-password/:encodedIdent/:encodedTimestamp-:hash')
  @ApiResponse({
    status: 200,
    description: 'Password Successfully changed',
    schema: { type: 'string', example: 'Password successfully changed' },
  })
  @ApiBadRequestResponse({
    description: 'Invalid Link | Link Expired',
    type: DefaultHttpExceptionSchema,
  })
  async resetPassword(
    @Body() passwordDto: Password,
    @Param('encodedIdent') encodedIdent: string,
    @Param('encodedTimestamp') encodedTimestamp: string,
    @Param('hash') hash: string,
  ): Promise<{ message: string }> {
    return this.authService.resetPassword(
      passwordDto.password,
      encodedIdent,
      encodedTimestamp,
      hash,
    );
  }
}
