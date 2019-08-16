import { createFeatureSelector, createSelector } from "@ngrx/store";
import { selectAll, LessonsState } from "./lessons.reducer";
import { PageQuery } from "./course.actions";


const selectLessonsState = createFeatureSelector<LessonsState>('lessons');

export const selectLessons = createSelector(
    selectLessonsState,
    selectAll
);

export const selectLessonsFromPage = (courseId: number, pageQuery: PageQuery) =>
    createSelector(
        selectLessons,
        lessons => lessons
            .filter(lesson => lesson.courseId === courseId)
            .slice(pageQuery.pageIndex * pageQuery.pageSize, (pageQuery.pageIndex + 1) * pageQuery.pageSize)
    )

export const selectLoader = createSelector(
    selectLessonsState,
    state => state.loading
)