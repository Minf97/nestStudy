import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

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

  // 3. form urlencoded 4. json
  @Post()
  body(@Body() createPersonDto: CreatePersonDto) {
    return `received: ${JSON.stringify(createPersonDto)}`
  }

  // 5. form data
  @Post('file')
  @UseInterceptors(AnyFilesInterceptor({
    dest: 'uploads/'
  }))
  body2(@Body() createPersonDto: CreatePersonDto, @UploadedFiles() files: Array<Express.Multer.File>) {
    console.log(files);
    return `received: ${JSON.stringify(createPersonDto)}`
  }
}
