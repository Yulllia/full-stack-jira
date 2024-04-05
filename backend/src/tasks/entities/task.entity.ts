import { TaskList } from 'src/task-list/entities/task-list.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'task' })
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'timestamp' })
  dueDate: Date;

  @Column({
    type: 'enum',
    enum: ['low', 'medium', 'high'],
    nullable: true,
  })
  priority: string;

  @Column({
    type: 'enum',
    enum: ['todo', 'planned', 'progress', 'closed'],
    nullable: true,
  })
  status: string;

  @ManyToOne(() => TaskList, (taskList) => taskList.tasks)
  taskList: TaskList;
}
