import { Injectable } from '@nestjs/common';
import { CreateTaskListDto } from './dto/create-task-list.dto';
import { UpdateTaskListDto } from './dto/update-task-list.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskList } from './entities/task-list.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaskListService {
  constructor(
    @InjectRepository(TaskList)
    private readonly taskListRepository: Repository<TaskList>,
  ) {}

  async findAllTaskLists(): Promise<TaskList[]> {
    return this.taskListRepository
      .createQueryBuilder('taskList')
      .leftJoinAndSelect('taskList.tasks', 'tasks')
      .getMany();
  }

  async createTaskList(
    createTaskListDto: CreateTaskListDto,
  ): Promise<TaskList> {
    const { title } = createTaskListDto;

    const taskList = this.taskListRepository.create({ title, tasks: [] });
    return this.taskListRepository.save(taskList);
  }
}
