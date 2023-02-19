import { Injectable } from '@nestjs/common';
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
}
