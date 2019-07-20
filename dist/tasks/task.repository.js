"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const task_entity_1 = require("./task.entity");
const task_status_enum_1 = require("./task-status.enum");
let TaskRepository = class TaskRepository extends typeorm_1.Repository {
    createTask(createTaskDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, description } = createTaskDto;
            const task = new task_entity_1.Task();
            task.title = title;
            task.description = description;
            task.status = task_status_enum_1.TaskStatus.OPEN;
            yield task.save();
            return task;
        });
    }
    deleteTask(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.delete(id);
        });
    }
    getTasks(filterDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { status, search } = filterDto;
            const query = this.createQueryBuilder('task');
            if (status) {
                query.andWhere('task.status = :status', { status });
            }
            if (search) {
                query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', { search: `%${search}%` });
            }
            const tasks = yield query.getMany();
            return tasks;
        });
    }
};
TaskRepository = __decorate([
    typeorm_1.EntityRepository(task_entity_1.Task)
], TaskRepository);
exports.TaskRepository = TaskRepository;
//# sourceMappingURL=task.repository.js.map