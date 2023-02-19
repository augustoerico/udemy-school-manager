import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateStudentInput } from './student.input';
import { StudentService } from './student.service';
import { StudentType } from './student.type';

@Resolver((of) => StudentType)
export class StudentResolver {
    constructor(private studentService: StudentService) {}

    @Query((returns) => StudentType)
    student() {
        return {
            id: 'some-student-id',
            firstName: 'Wile',
            lastName: 'Coyote',
        };
    }

    @Mutation((returns) => StudentType)
    createStudent(
        @Args('createStudentInput') createStudentInput: CreateStudentInput,
    ) {
        return this.studentService.create(createStudentInput);
    }
}
