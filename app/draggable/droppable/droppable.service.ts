import { Injectable, Optional, SkipSelf } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { DroppableEvent } from './droppable-event';

@Injectable()
export class DroppableService<T = any> {
  dragStart$: Observable<DroppableEvent<T>>;
  dragMove$: Observable<DroppableEvent<T>>;
  dragEnd$: Observable<DroppableEvent<T>>;

  private dragStartSubject = new Subject<DroppableEvent<T>>();
  private dragMoveSubject = new Subject<DroppableEvent<T>>();
  private dragEndSubject = new Subject<DroppableEvent<T>>();

  constructor(@SkipSelf() @Optional() private parent?: DroppableService<T>) {
    this.dragStart$ = this.dragStartSubject.asObservable();
    this.dragMove$ = this.dragMoveSubject.asObservable();
    this.dragEnd$ = this.dragEndSubject.asObservable();
  }

  onDragStart(event: DroppableEvent<T>): void {
    this.dragStartSubject.next(event);

    if (this.parent) {
      this.parent.onDragStart(event);
    }
  }

  onDragMove(event: DroppableEvent<T>): void {
    this.dragMoveSubject.next(event);

    if (this.parent) {
      this.parent.onDragMove(event);
    }
  }

  onDragEnd(event: DroppableEvent<T>): void {
    this.dragEndSubject.next(event);

    if (this.parent) {
      this.parent.onDragEnd(event);
    }
  }
}
