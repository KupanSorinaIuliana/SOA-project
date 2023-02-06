import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Idea } from './interfaces/idea.interface';
import { CreateIdeaDto } from './dto/create-idea.dto';

@Injectable()
export class IdeaTrackerService {
  constructor(@InjectModel('Idea') private readonly ideaModel: Model<Idea>) { }

  async addIdea(createIdeaDTO: CreateIdeaDto): Promise<Idea> {
    const newIdea = await new this.ideaModel(createIdeaDTO);
    return newIdea.save();
  }

  async getIdea(ideaID): Promise<Idea> {
    const idea = await this.ideaModel
      .findById(ideaID)
      .exec();
    return idea;
  }

  async getIdeas(): Promise<Idea[]> {
    const ideas = await this.ideaModel.find().exec();
    return ideas;
  }

  async editIdea(ideaID, createIdeaDTO: CreateIdeaDto): Promise<Idea> {
      const editedIdea = await this.ideaModel
        .findByIdAndUpdate(ideaID, createIdeaDTO, { new: true });
      return editedIdea;
    }
    async deleteIdea(ideaID): Promise<any> {
      const deletedIdea = await this.ideaModel
        .findByIdAndRemove(ideaID);
      return deletedIdea;
    }
}