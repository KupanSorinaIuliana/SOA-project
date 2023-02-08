import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Idea } from './interfaces/idea.interface';
import { CreateIdeaDto } from './dto/create-idea.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class IdeaTrackerService {
private client: AxiosInstance;
  constructor(@InjectModel('Idea') private readonly ideaModel: Model<Idea>, private readonly httpService: HttpService,) {
  this.client = axios.create({
              baseURL: 'https://samples.openweathermap.org/data/2.5/',
              params: {
                  APPID: '503b0490d82953ffb25703d599ba44f3'
              }
            });
  }

async ofCity(city: string): Promise<object> {
    const response = await this.client.get('weather', {
      params: { q: city },
    });
    return response.data;
  }

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