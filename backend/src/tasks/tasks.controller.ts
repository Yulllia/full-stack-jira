import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { DeleteResult } from 'typeorm';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getAllTasks(): Promise<Task[]> {
    return this.tasksService.findAllTask();
  }

  @Get(':id')
  findTasksById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.findTasksById(id);
  }

  @Post(':taskListId')
  create(
    @Body() createTaskDto: CreateTaskDto,
    @Param('taskListId') taskListId: number,
  ): Promise<Task> {
    return this.tasksService.create(createTaskDto, taskListId);
  }

  @Patch(':id')
  updateTask(
    @Param('id') id: string,
    @Body() updatedTask: UpdateTaskDto,
  ): Promise<Task> {
    return this.tasksService.updateTask(+id, updatedTask);
  }

  @Put(':id')
  updateTaskAllFields(
    @Param('id') id: string,
    @Body() updatedTask: UpdateTaskDto,
  ): Promise<Task> {
    return this.tasksService.updateTask(+id, updatedTask);
  }

  @Delete(':id')
  removeTask(@Param('id') id: string): Promise<DeleteResult> {
    return this.tasksService.removeTask(+id);
  }
  @Delete('allTask/:status/:taskId')
  removeAllTask(
    @Param('status') status: string,
    @Param('taskId') taskId: string,
  ): Promise<DeleteResult> {
    return this.tasksService.removeAllTask(status, taskId);
  }
}
