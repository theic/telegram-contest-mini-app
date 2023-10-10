import { v4 as uuid } from 'uuid';

export interface ChunkData {
  projectId: string;
  start: number;
  end: number;
  transcription: string;
  position: number;
  id?: string;
  createdAt?: Date;
}

export class Chunk {
  public readonly projectId: string;
  public readonly start: number;
  public readonly end: number;
  public readonly transcription: string;
  public readonly position: number;
  public readonly id?: string;
  public readonly createdAt?: Date;

  constructor({
    projectId,
    start,
    end,
    transcription,
    position,
    id = uuid(),
    createdAt = new Date(),
  }: ChunkData) {
    this.id = id;
    this.createdAt = createdAt;
    this.projectId = projectId;
    this.start = start;
    this.end = end;
    this.transcription = transcription;
    this.position = position;
  }
}
