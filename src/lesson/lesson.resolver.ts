import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AssignStudentsToLessonInput } from './assign-students-to-lesson.input';
import { CreateLessonInput } from './lesson.input';
import { LessonService } from './lesson.service';
import { LessonType } from './lesson.type';

@Resolver((of) => LessonType)
export class LessonResolver {
    constructor(private lessonService: LessonService) {}

    @Query((returns) => LessonType)
    lesson(@Args('id') id: string) {
        return this.lessonService.read(id);
    }

    @Mutation((returns) => LessonType)
    createLesson(
        @Args('createLessonInput') createLessonInput: CreateLessonInput,
    ) {
        return this.lessonService.create(createLessonInput);
    }

    @Query((returns) => [LessonType])
    lessons() {
        return this.lessonService.readAll();
    }

    @Mutation((returns) => LessonType)
    assignStudentsToLesson(
        @Args('assignStudentToLessonInput')
        assignStudentsToLessonInput: AssignStudentsToLessonInput,
    ) {
        const { lessonId, studentsIds } = assignStudentsToLessonInput;
        return this.lessonService.assignStudentsToLesson(lessonId, studentsIds);
    }
}
