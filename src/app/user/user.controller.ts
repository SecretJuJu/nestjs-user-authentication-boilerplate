import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('user')
export class UserController {
  @UseGuards(JwtAuthGuard)
  @Get('/me')
  getProfile(@Request() req) {
    return req.user;
  }
}
