import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';

@Controller('api/person')
export class PersonController {
  constructor(private readonly personService: PersonService) { }

  // 2. query
  // api/person/find?xxx
  // 注意书写顺序，要放在1的前面
  @Get('find')
  query(@Query('name') name: string, @Query('age') age: number) {
    return `received: name=${name}, age=${age}`
  }

  // 1. url param
  // api/person/xxx
  @Get(':id')
  urlParam(@Param('id') id: string) {
    return `received: id:${id}`
  }  
}
