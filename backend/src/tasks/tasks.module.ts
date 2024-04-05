import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { TaskList } from 'src/task-list/entities/task-list.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    TypeOrmModule.forFeature([TaskList]),
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
