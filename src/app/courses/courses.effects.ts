import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import * as CoursesActions from './course.actions';
import { switchMap, map, mergeMap, withLatestFrom, filter } from "rxjs/operators";
import { Course } from "./model/course";
import { CoursesService } from "./services/courses.service";
import { AppState } from "../reducers";
import { Store, select } from "@ngrx/store";
import { allCoursesLoaded } from "./course.selectors";

@Injectable()
export class CourseEffects {

    @Effect()
    loadCourse$ = this.actions$
        .pipe(
            ofType<CoursesActions.CourseRequested>(CoursesActions.CourseActionTypes.CourseRequested),
            switchMap(
                action => {
                    return this.coursesService.findCourseById(action.payload.courseId)
                }
            ),
            map((course: Course) => new CoursesActions.CourseLoaded({course}))
        )

    @Effect()
    loadAllCourses$ = this.actions$
        .pipe(
            ofType<CoursesActions.AllCoursesRequested>(CoursesActions.CourseActionTypes.AllCoursesRequested),
            withLatestFrom(this.store.pipe(select(allCoursesLoaded))),
            filter(([action, allCoursesLoaded]) => !allCoursesLoaded),
            mergeMap(
                action => {
                    return this.coursesService.findAllCourses();
                }
            ),
            map((courses: Course[]) => new CoursesActions.AllCoursesLoaded({courses}))
        )


    constructor(
        private actions$: Actions,
        private coursesService: CoursesService,
        private store: Store<AppState>
    ) {}
}