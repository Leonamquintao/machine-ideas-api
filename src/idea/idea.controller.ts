import { Get, Post, Put, Delete, Param, Body, Controller, UseGuards } from '@nestjs/common';
import { IdeaService } from './idea.service';
import { IdeaDTO } from './idea.dto';
import { AuthGuard } from '../shared/http/auth.guard';

@Controller('ideas')
export class IdeaController {

  constructor(private ideaService: IdeaService) {}

  @Get()
  @UseGuards(new AuthGuard())
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
