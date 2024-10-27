import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  UseGuards,
  Req,
} from '@nestjs/common';

import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';

import { Roles } from '@utils/roles/roles.decorator';
import { Role } from '@utils/roles/roles.enum';
import { RolesGuard } from '@utils/roles/roles.guard';
import { JwtAuthenticatedRequest } from '@utils/types/auth-types';
import { ZodValidationPipe } from '@utils/validation/zod-validation.pipe';

import { CreateUserDTO, createUserSchema } from './dto/create-user.dto';
import { UpdateUserDTO, updateUserSchema } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createUserSchema))
  create(@Body() createUserDTO: CreateUserDTO) {
    return this.usersService.create(createUserDTO);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: JwtAuthenticatedRequest) {
    return this.usersService.findOne(id, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @UsePipes(new ZodValidationPipe(updateUserSchema))
  update(
    @Param('id') id: string,
    @Body() updateUserDTO: UpdateUserDTO,
    @Req() req: JwtAuthenticatedRequest,
  ) {
    return this.usersService.update(id, updateUserDTO, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: JwtAuthenticatedRequest) {
    return this.usersService.remove(id, req.user);
  }
}
