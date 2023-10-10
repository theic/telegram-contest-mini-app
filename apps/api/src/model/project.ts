import { Constants } from '../constants';
import { v4 as uuid } from 'uuid';

export interface ProjectData {
  link: string;
  mimeType: string;
  status?: string;
  outputVideoUrl?: string;
  outputAudioUrl?: string;
  name?: string;
  id?: string;
  createdAt?: Date;
}

export class Project {
  public readonly link: string;
  public readonly mimeType: string;
  public readonly status?: string;
  public readonly outputVideoUrl?: string;
  public readonly outputAudioUrl?: string;
  public readonly name?: string;
  public readonly id?: string;
  public readonly createdAt?: Date;

  constructor({
    link,
    mimeType,
    status,
    outputVideoUrl,
    outputAudioUrl,
    name,
    id = uuid(),
    createdAt = new Date(),
  }: ProjectData) {
    this.id = id;
    this.createdAt = createdAt;
    this.name = name;
    this.link = link;
    this.mimeType = mimeType;
    this.status = status;
    this.outputVideoUrl = outputVideoUrl;
    this.outputAudioUrl = outputAudioUrl;

    // this.assertUrl();
  }

  private assertUrl() {
    if (
      !this.link
      || !Constants.MIME_TYPES.includes(this.mimeType)
    ) {
      throw new Error('Invalid URL or MIME type not supported');
    }

    console.log(this.link);
  }
}
