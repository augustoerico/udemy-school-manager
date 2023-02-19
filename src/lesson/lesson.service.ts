import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './lesson.entity';
import { v4 as uuid } from 'uuid';
import { CreateLessonInput } from './lesson.input';

@Injectable()
export class LessonService {
    constructor(
        @InjectRepository(Lesson)
        private repository: Repository<Lesson>,
    ) {}

    async create(createLessonInput: CreateLessonInput): Promise<Lesson> {
        const { name, startDate, endDate, students } = createLessonInput;
        const lesson = this.repository.create({
            id: uuid(),
            name,
            startDate,
            endDate,
            students,
        });

        return this.repository.save(lesson);
    }

    async read(id: string): Promise<Lesson> {
        const lesson = this.repository.findOne({ id });
        if (!lesson)
            throw new NotFoundException(`Lesson with id = ${id} not found`);
        return lesson;
    }

    async readAll(): Promise<Lesson[]> {
        return this.repository.find();
    }

    async assignStudentsToLesson(lessonId: string, studentsIds: string[]) {
        const lesson = await this.read(lessonId);
        lesson.students = [...lesson.students, ...studentsIds];
        return this.repository.save(lesson);
    }
}
