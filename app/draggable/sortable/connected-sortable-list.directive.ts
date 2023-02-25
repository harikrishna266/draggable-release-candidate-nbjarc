import { Directive, Input, Output, HostListener, ContentChildren, QueryList } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { SortableListDirective } from './sortable-list.directive';

import { DroppableDirective } from '../droppable/droppable.directive';
import { DropzoneDirective } from '../droppable/dropzone.directive';
import { DroppableEvent } from '../droppable/droppable-event';

@Directive({
  selector: '[appConnectedSortableList]'
})
export class ConnectedSortableListDirective {
  @ContentChildren(DroppableDirective) droppables: QueryList<DroppableDirective>;

  @Input('appConnectedSortableList') set connectedList(list: any[]) {
    this.sortableList.list = list;
  }

  @Output('appConnectedSortableListChange') get connectedListChange() {
    return this.sortableList.listChange;
  }

  moveIn$: Observable<DroppableEvent>;

  private moveInSubject = new Subject<DroppableEvent>();

  constructor(private sortableList: SortableListDirective,
              private dropzone: DropzoneDirective) { }

  ngOnInit(): void {
    this.moveIn$ = this.moveInSubject.asObservable();
  }

  ngAfterContentInit(): void {
    this.droppables.changes.subscribe(() => {
      this.droppables.forEach((droppable, index) => {
        droppable.data = this.sortableList.list[index];
      });
    });

    this.droppables.notifyOnChanges();
  }

  @HostListener('enter', ['$event']) onEnter(event: DroppableEvent): void {
    if (this.sortableList.list.indexOf(event.data) === -1) {
      this.moveInSubject.next(event);
    }
  }

  removeData(data: any) {
    this.sortableList.listChange.emit(
      this.sortableList.list.filter(item => item !== data)
    );
  }

  addData(data: any) {
    this.sortableList.list.push(data);
  }
}