import { Get, Post, Put, Delete, Param, Body, Controller } from '@nestjs/common';
import { IdeaService } from './idea.service';
import { IdeaDTO } from './idea.dto';

@Controller('ideas')
export class IdeaController {

  constructor(private ideaService: IdeaService) {}

  @Get()
  public getIdeas() {
    return this.ideaService.getIdeas();
  }

  @Get(':id')
  public getIdeaById(@Param('id') id: string) {
    return this.ideaService.getIdeaById(id);
  }

  @Get('/user/:id')
  public getIdeasByUser(@Param('id') id: string) {
    return this.ideaService.getIdeasByUserId(id);
  }

  @Post()
  public createIdea(@Body() data: Partial<IdeaDTO>) {
    return this.ideaService.createIdea(data);
  }

  @Put(':id')
  public updateIdea(@Param('id') id: string, @Body() data: Partial<IdeaDTO>) {
    return this.ideaService.updateIdea(id, data);
  }

  @Delete(':id')
  public deleteIdeaById(@Param('id') id: string) {
    return this.ideaService.deleteIdeaById(id);
  }
}
