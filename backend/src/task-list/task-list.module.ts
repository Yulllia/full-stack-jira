import { Module } from '@nestjs/common';
import { TaskListService } from './task-list.service';
import { TaskListController } from './task-list.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskList } from './entities/task-list.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskList])],
  controllers: [TaskListController],
  providers: [TaskListService],
})
export class TaskListModule {}
