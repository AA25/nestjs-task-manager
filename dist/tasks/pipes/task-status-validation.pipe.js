"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const task_status_enum_1 = require("../task-status.enum");
class TaskStatusVlidationPipe {
    constructor() {
        this.allowedStatuses = [
            task_status_enum_1.TaskStatus.OPEN,
            task_status_enum_1.TaskStatus.IN_PROGRESS,
            task_status_enum_1.TaskStatus.DONE,
        ];
    }
    transform(value, metadata) {
        value = value.toUpperCase();
        if (this.isStatusValid(value)) {
            return value;
        }
        throw new common_1.BadRequestException(`"${value}" is an invalid status`);
    }
    isStatusValid(status) {
        const index = this.allowedStatuses.indexOf(status);
        return index !== -1;
    }
}
exports.TaskStatusVlidationPipe = TaskStatusVlidationPipe;
//# sourceMappingURL=task-status-validation.pipe.js.map