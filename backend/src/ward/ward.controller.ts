import { Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe, UsePipes, ValidationPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { WardService } from './ward.service';
import { Ward } from './ward.entity';
import { CreateWardDto } from './dto/create-ward.dto';
import { UpdateWardDto } from './dto/update-ward.dto';

@Controller('wards')
@UsePipes(new ValidationPipe())
export class WardController {
  constructor(private readonly wardService: WardService) {}

  @Get()
  async findAll(): Promise<Ward[]> {
    return this.wardService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Ward> {
    return this.wardService.findOne(id);
  }

  @Post()
  async create(@Body() createWardDto: CreateWardDto): Promise<Ward> {
    return this.wardService.create(createWardDto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateWardDto: UpdateWardDto,
  ): Promise<Ward> {
    return this.wardService.update(id, updateWardDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    return this.wardService.delete(id);
  }
}