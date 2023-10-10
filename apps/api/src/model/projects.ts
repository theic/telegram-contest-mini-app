import { Project } from './project';

export interface Projects {
  save(user: Project): Promise<void>;
  findById(id: string): Promise<Project | null>;
}
