


import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {Observable, BehaviorSubject, of, noop} from "rxjs";
import {Lesson} from "../model/lesson";
import {CoursesService} from "./courses.service";
import {catchError, finalize, tap, filter} from 'rxjs/operators';
import { AppState } from "../../reducers";
import { Store, select } from "@ngrx/store";
import { PageQuery } from "../course.actions";
import { selectLessonsFromPage } from "../lessons.selectors";

import * as CourseActions from '../course.actions';



export class LessonsDataSource implements DataSource<Lesson> {

    private lessonsSubject = new BehaviorSubject<Lesson[]>([]);

    constructor(private store: Store<AppState>) {

    }

    loadLessons(courseId: number, page: PageQuery) {
        this.store.pipe(
            select(selectLessonsFromPage(courseId, page)),
            tap(
                lessons => {
                    if (lessons.length === 0) {
                        this.store.dispatch(new CourseActions.LessonsPageRequested({courseId: courseId, page: page}));
                    }
                    else {
                        this.lessonsSubject.next(lessons);
                    }
                }
            ),
            catchError(error => of([]))
        )
        .subscribe(noop);
    }

    connect(collectionViewer: CollectionViewer): Observable<Lesson[]> {
        console.log("Connecting data source");
        return this.lessonsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.lessonsSubject.complete();
    }

}

