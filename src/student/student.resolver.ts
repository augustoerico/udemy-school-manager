import { Query, Resolver } from '@nestjs/graphql';
import { StudentType } from './student.type';

@Resolver((of) => StudentType)
export class StudentResolver {
    @Query((returns) => StudentType)
    student() {
        return {
            id: 'some-student-id',
            firstName: 'Wile',
            lastName: 'Coyote',
        };
    }
}
