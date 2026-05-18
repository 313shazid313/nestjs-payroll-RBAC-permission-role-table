import { Controller, Post, Body } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiConflictResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/userLogin.dto';
import { RegisterUserDto } from './dtos/userRegister.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  //! User login endpoint
  @Post('login')
  @ApiOperation({
    summary: 'User login',
    description: 'Authenticates user and returns JWT token',
  })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    schema: {
      example: {
        accessToken: 'jwt.token.here',
        user: {
          id: 1,
          email: 'user@example.com',
          roles: ['admin', 'employee'],
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  //! Register new user endpoint
  @Post('register')
  @ApiOperation({
    summary: 'Register a new user',
    description:
      'Creates a new user account with optional role assignments. Email must be unique and password will be hashed.',
  })
  @ApiBadRequestResponse({
    description:
      'Invalid input data (e.g., invalid email format, password too short/long, invalid role IDs).',
  })
  @ApiConflictResponse({
    description: 'User with this email already exists.',
  })
  async registerUser(@Body() userDto: RegisterUserDto) {
    return this.authService.registerUser(userDto);
  }
}
