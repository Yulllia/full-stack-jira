import { Controller, Get, Post, Body } from '@nestjs/common';
import { TaskListService } from './task-list.service';
import { CreateTaskListDto } from './dto/create-task-list.dto';
import { TaskList } from './entities/task-list.entity';

@Controller('taskLists')
export class TaskListController {
  constructor(private readonly taskListService: TaskListService) {}

  @Get()
  findAllTaskLists(): Promise<TaskList[]> {
    return this.taskListService.findAllTaskLists();
  }

  @Post()
  createTaskList(
    @Body() createTaskListDto: CreateTaskListDto,
  ): Promise<TaskList> {
    return this.taskListService.createTaskList(createTaskListDto);
  }
}
