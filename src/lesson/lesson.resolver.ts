import { Args, Mutation, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { LessonService } from './lesson.service';
import { LessonType } from './lesson.type';

@Resolver((of) => LessonType)
export class LessonResolver {
    constructor(private lessonService: LessonService) {}

    @Query((returns) => LessonType)
    lesson() {
        return {
            id: 'some-id',
            name: 'Physics',
            startDate: new Date().toISOString(),
            endDate: new Date().toISOString(),
        };
    }

    @Mutation((returns) => LessonType)
    createLesson(
        @Args('name') name: string,
        @Args('startDate') startDate: string,
        @Args('endDate') endDate: string,
    ) {
        return this.lessonService.create(name, startDate, endDate);
    }
}
