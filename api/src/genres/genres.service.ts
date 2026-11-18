import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class GenresService {
  constructor(private prisma: PrismaService) {}

  async create(data: { name: string }) {
    return this.prisma.genre.create({ data });
  }

  async findAll() {
    return this.prisma.genre.findMany();
  }

  async findOne(id: number) {
    const genre = await this.prisma.genre.findUnique({ where: { id } });
    if (!genre) throw new NotFoundException(`Genre with ID ${id} not found`);
    return genre;
  }

  async update(id: number, data: { name: string }) {
    await this.findOne(id); // Ensures it exists
    return this.prisma.genre.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findOne(id); // Ensures it exists
    return this.prisma.genre.delete({ where: { id } });
  }
}