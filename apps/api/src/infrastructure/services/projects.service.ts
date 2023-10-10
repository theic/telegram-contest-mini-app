import { Inject, Injectable } from '@nestjs/common';
import { UpdateProjectDto } from '../../app/dto/Project/update-project.dto';
import { ProjectEntity } from '../entities';
import { Project } from '@app/model';
import { EntityManager } from '@mikro-orm/postgresql';
import { ProjectMapper } from '../mappers';

@Injectable()
export class ProjectsService {

  constructor(
    private readonly em: EntityManager,
    @Inject(ProjectMapper)
    private readonly projectMapper: ProjectMapper,
  ) {}

  public async create(project: Project): Promise<Project> {
  
    const entity = this.projectMapper.from(project);

    this.em.persistAndFlush(entity);

    return this.projectMapper.to(entity);
  }

  public async get(id: string) {
    const project = await this.em.findOne(ProjectEntity, id);

    return this.projectMapper.to(project);
  }

  public async update(id: string, updateProjectDto: UpdateProjectDto) {
    const project = await this.em.findOne(ProjectEntity, id);

    if (updateProjectDto.link) {
      project.link = updateProjectDto.link;
    }

    if (updateProjectDto.name) {
      project.name = updateProjectDto.name;
    }

    await this.em.persistAndFlush(project);
  }
}
