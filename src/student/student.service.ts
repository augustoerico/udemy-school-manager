import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';
import { v4 as uuid } from 'uuid';
import { CreateStudentInput } from './student.input';

@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(Student)
        private repository: Repository<Student>,
    ) {}

    async create(createStudentInput: CreateStudentInput) {
        const { firstName, lastName } = createStudentInput;
        const student = this.repository.create({
            id: uuid(),
            firstName,
            lastName,
        });

        this.repository.save(student);
        return student;
    }

    async readAll() {
        return this.repository.find();
    }

    async read(id: string) {
        const student = this.repository.findOne({ id });
        if (!student)
            throw new NotFoundException(
                `Student with id = ${id} was not found`,
            );
        return student;
    }

    async readMany(studentIds: string[]) {
        return this.repository.find({
            where: {
                id: {
                    $in: studentIds,
                },
            },
        });
    }
}
