import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { TaskStatus } from '../task-status.enum';
export declare class TaskStatusVlidationPipe implements PipeTransform {
    readonly allowedStatuses: TaskStatus[];
    transform(value: any, metadata: ArgumentMetadata): any;
    private isStatusValid;
}
