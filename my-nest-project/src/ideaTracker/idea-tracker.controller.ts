import { Controller, Get, Res, HttpStatus, Param, NotFoundException, Post, Body, Put, Query, Delete } from '@nestjs/common';
import { IdeaTrackerService } from './idea-tracker.service';
import { CreateIdeaDto } from './dto/create-idea.dto';
import { ValidateObjectId } from './shared/pipes/validate-object-id.pipes';

@Controller('tracker')
export class IdeaTrackerController {
constructor(private ideaTrackerService: IdeaTrackerService) { }

    @Get('/weather')
  async getWeather(@Res() res) {
    const ideas = await this.ideaTrackerService.ofCity('London');
    return res.status(HttpStatus.OK).json(ideas);
  }

  // Create an idea
  @Post('/idea')
  async addIdea(@Res() res, @Body() createIdeaDTO: CreateIdeaDto) {
    const newIdea = await this.ideaTrackerService.addIdea(createIdeaDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Idea has been created successfully!',
      post: newIdea,
    });
  }

  @Put('/edit')
    async editIdea(
      @Res() res,
      @Query('ideaID', new ValidateObjectId()) ideaID,
      @Body() createIdeaDTO: CreateIdeaDto,
    ) {
      const editedIdea = await this.ideaTrackerService.editIdea(ideaID, createIdeaDTO);
      if (!editedIdea) {
          throw new NotFoundException('Idea does not exist!');
      }
      return res.status(HttpStatus.OK).json({
        message: 'Idea has been successfully updated',
        post: editedIdea,
      });
    }

    // Delete a idea using ID
      @Delete('/delete')
      async deleteIdea(@Res() res, @Query('ideaID', new ValidateObjectId()) ideaID) {
        const deletedIdea = await this.ideaTrackerService.deleteIdea(ideaID);
        if (!deletedIdea) {
            throw new NotFoundException('Idea does not exist!');
        }
        return res.status(HttpStatus.OK).json({
          message: 'Idea has been deleted!',
          post: deletedIdea,
        });
      }

  // Fetch a particular idea using ID
  @Get('idea')
  async getIdea(@Res() res, @Query('ideaID', new ValidateObjectId()) ideaID) {
    const idea = await this.ideaTrackerService.getIdea(ideaID);
    if (!idea) {
        throw new NotFoundException('Idea does not exist!');
    }
    return res.status(HttpStatus.OK).json(idea);
  }

  // Fetch all ideas
  @Get('ideas')
  async getIdeas(@Res() res) {
    const ideas = await this.ideaTrackerService.getIdeas();
    return res.status(HttpStatus.OK).json(ideas);
  }
}
