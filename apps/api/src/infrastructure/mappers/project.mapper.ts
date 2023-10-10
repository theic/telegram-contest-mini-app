import { Injectable } from '@nestjs/common';
import { ProjectEntity } from '../entities';
import { Project } from '@app/model';

@Injectable()
export class ProjectMapper {
  public from(model: Project, entity?: ProjectEntity | null): ProjectEntity {
    if (!entity) {
      entity = new ProjectEntity();
    }

    entity.id = model.id;
    entity.name = model.name;
    entity.link = model.link;
    entity.createdAt = model.createdAt;
    entity.mimeType = model.mimeType;

    return entity;
  }

  public to(entity: ProjectEntity): Project {
    return new Project(entity);
  }
}
