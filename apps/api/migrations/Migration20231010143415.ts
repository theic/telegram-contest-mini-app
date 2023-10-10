import { Migration } from '@mikro-orm/migrations';

export class Migration20231010143415 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "chunks" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "start" int not null, "end" int not null, "project_id" varchar(255) not null, "position" int not null, "transcription" varchar(500) not null, constraint "chunks_pkey" primary key ("id"));');

    this.addSql('create table "projects" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "link" varchar(255) not null, "mime_type" varchar(255) not null, "name" varchar(255) null, constraint "projects_pkey" primary key ("id"));');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "chunks" cascade;');

    this.addSql('drop table if exists "projects" cascade;');
  }

}
