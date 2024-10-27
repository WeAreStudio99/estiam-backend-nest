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
import { UsersService } from './users.service';
import { CreateUserDTO, createUserSchema } from './dto/create-user.dto';
import { ZodValidationPipe } from 'src/utils/zod-validation';
import { UpdateUserDTO, updateUserSchema } from './dto/update-user.dto';
import { RolesGuard } from 'src/utils/roles/roles.guard';
import { Roles } from 'src/utils/roles/roles.decorator';
import { Role } from 'src/utils/roles/roles.enum';
import { JwtAuthenticatedRequest } from 'src/utils/types';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createUserSchema))
  create(@Body() createUserDto: CreateUserDTO) {
    return this.usersService.create(createUserDto);
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
    @Body() updateUserDto: UpdateUserDTO,
    @Req() req: JwtAuthenticatedRequest,
  ) {
    return this.usersService.update(id, updateUserDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: JwtAuthenticatedRequest) {
    return this.usersService.remove(id, req.user);
  }
}
