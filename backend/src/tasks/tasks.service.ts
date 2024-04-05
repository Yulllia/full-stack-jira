import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { DeleteResult, Repository } from 'typeorm';
import { TaskList } from 'src/task-list/entities/task-list.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
    @InjectRepository(TaskList)
    private readonly taskListRepository: Repository<TaskList>,
  ) {}

  async create(
    createTaskDto: CreateTaskDto,
    taskListId: number,
  ): Promise<Task> {
    const taskList = await this.taskListRepository.findOne({
      where: { id: taskListId },
    });
    const task = this.tasksRepository.create({ ...createTaskDto, taskList });
    return await this.tasksRepository.save(task);
  }

  async findAllTask(): Promise<Task[]> {
    return await this.tasksRepository.find();
  }

  async findTasksById(id: string): Promise<Task> {
    const task = await this.tasksRepository.findOne({
      where: { id: +id },
    });
    if (!task) {
      throw new NotFoundException();
    }
    return task;
  }

  async findOneTask(id: number): Promise<Task> {
    return await this.tasksRepository.findOne({ where: { id } });
  }

  async updateTask(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.findOneTask(id);
    if (!task) {
      throw new NotFoundException();
    }
    Object.assign(task, updateTaskDto);
    return await this.tasksRepository.save(task);
  }
  async updateTaskAllFields(
    id: number,
    updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    const task = await this.findOneTask(id);
    if (!task) {
      throw new NotFoundException();
    }
    await this.tasksRepository.update(id, updateTaskDto);
    return await this.findOneTask(id);
  }

  async removeTask(id: number): Promise<DeleteResult> {
    const task = await this.tasksRepository.delete(id);
    if (task.affected === 0) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `task with id:${id} not found`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return task;
  }
  async removeAllTask(status: string, taskId: string): Promise<DeleteResult> {
    const taskList = await this.taskListRepository.findOne({
      where: { id: +taskId },
    });
    const deletionResult = await this.tasksRepository.delete({
      status,
      taskList,
    });
    if (deletionResult.affected === 0) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Tasks with status:${status} in the task list with ID:${taskId} not found`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return deletionResult;
  }
}
