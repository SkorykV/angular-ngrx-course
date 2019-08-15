import { Course } from "./model/course";
import { Lesson } from "./model/lesson";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import * as CourseActions from './course.actions';

export interface CoursesState extends EntityState<Course>{
    allCoursesLoaded: boolean,
}

export const adapter: EntityAdapter<Course> = createEntityAdapter<Course>();

const coursesInitialState: CoursesState = adapter.getInitialState({allCoursesLoaded: false});

export function courseReducer(state: CoursesState = coursesInitialState, action: CourseActions.CourseActions): CoursesState {
    switch (action.type) {
        case CourseActions.CourseActionTypes.CourseLoaded:
            return adapter.addOne(action.payload.course, state);
        case CourseActions.CourseActionTypes.AllCoursesLoaded:
            return adapter.addAll(action.payload.courses, {...state, allCoursesLoaded: true});
        case CourseActions.CourseActionTypes.CourseSaved:
            return adapter.updateOne(action.payload.course, state);
        default: {
            return state;
        }
    }
}


export const {
    selectAll
} = adapter.getSelectors()