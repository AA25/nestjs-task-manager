import { Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TaskRepository } from './task.repository';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';

// tasks service takes a repo as an injectable so this will be mocked
const mockTaskRepository = () => ({
  getTasks: jest.fn(),
});

const mockUser = {
  username: 'testUser',
};

describe('Testing of tasks services', () => {
  let tasksService;
  let taskRepository;

  beforeEach(async () => {
    // Create a testable module that will act at the task module containing the
    // task service provider
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TaskRepository, useFactory: mockTaskRepository }, // Allows for the mocking of the repo
      ],
    }).compile(); // This is why we're awaiting

    tasksService = await module.get<TasksService>(TasksService);
    taskRepository = await module.get<TaskRepository>(TaskRepository);
  });

  describe('Testing of getTasks', () => {
    it('Get all tasks from the repository', async () => {
      taskRepository.getTasks.mockResolvedValue('someValue');

      const filters: GetTasksFilterDto = {
        status: TaskStatus.IN_PROGRESS,
        search: 'Search query test',
      };
      const result = await tasksService.getTasks(filters, mockUser);

      expect(taskRepository.getTasks).toHaveBeenCalled();
      expect(result).toEqual('someValue');
    });
  });
});
