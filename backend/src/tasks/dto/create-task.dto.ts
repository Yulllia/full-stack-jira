import { Status } from 'src/enums/status.enum';
import { Priority } from 'src/enums/priority.enum';

export class CreateTaskDto {
  name: string;
  description: string;
  dueDate: Date;
  priority: Priority;
  status: Status;
}
