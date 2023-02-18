import {
    Column,
    Entity,
    ObjectIdColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Lesson {
    @ObjectIdColumn()
    _id: string;

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    startDate: string;

    @Column()
    endDate: string;
}
