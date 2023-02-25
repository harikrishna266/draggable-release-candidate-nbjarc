import { AfterContentInit, ContentChildren, Directive, EventEmitter, Output, QueryList, Input } from '@angular/core';
import { SortableDirective } from './sortable.directive';

import { Subscription } from 'rxjs/Subscription';

export interface SortEvent {
  currentIndex: number;
  newIndex: number;
}

const distance = (rectA: ClientRect, rectB: ClientRect): number => {
  return Math.sqrt(
    Math.pow(rectB.top - rectA.top, 2) +
    Math.pow(rectB.left - rectA.left, 2)
  )
};

const hCenter = (rect: ClientRect): number => {
  return rect.left + rect.width / 2;
};

const vCenter = (rect: ClientRect): number => {
  return rect.top + rect.height / 2;
};

@Directive({
  selector: '[appSortableList],[appConnectedSortableList]'
})
export class SortableListDirective implements AfterContentInit {
  @ContentChildren(SortableDirective) sortables: QueryList<SortableDirective>;

  @Input('appSortableList')
  list: any[];

  @Output('appSortableListChange')
  listChange = new EventEmitter<any[]>();

  @Output() sort = new EventEmitter<SortEvent>();

  private clientRects: ClientRect[];
  private subscriptions: Subscription[] = [];

  ngAfterContentInit(): void {
    this.sortables.changes.subscribe(() => {
      this.subscriptions.forEach(s => s.unsubscribe());
      this.measureClientRects();

      this.sortables.forEach(sortable => {
        this.subscriptions.push(
          sortable.draggable.dragStart.subscribe(() => this.measureClientRects()),
          sortable.draggable.dragMove.subscribe(event => this.detectSorting(sortable, event))
        );
      });
    });

    this.sortables.notifyOnChanges();
  }

  private measureClientRects() {
    this.clientRects = this.sortables.map(sortable => sortable.element.nativeElement.getBoundingClientRect());
  }

  private detectSorting(sortable: SortableDirective, event: PointerEvent) {
    const currentIndex = this.sortables.toArray().indexOf(sortable);
    const currentRect = this.clientRects[currentIndex];

    this.clientRects
      .slice()
      .sort((rectA, rectB) => distance(rectA, currentRect) - distance(rectB, currentRect))
      .filter(rect => rect !== currentRect)
      .some(rect => {
        const isHorizontal = rect.top === currentRect.top;
        const isBefore = isHorizontal ? 
          rect.left < currentRect.left :
          rect.top < currentRect.top;

        // refactored this part a little bit after my Youtube video
        // for improving readability
        const moveBack = isBefore && (isHorizontal ?
          event.clientX < hCenter(rect) :
          event.clientY < vCenter(rect)
        );

        const moveForward = !isBefore && (isHorizontal ?
          event.clientX > hCenter(rect) :
          event.clientY > vCenter(rect)
        );

        if (moveBack || moveForward) {
          const event: SortEvent = {
            currentIndex: currentIndex,
            newIndex: this.clientRects.indexOf(rect)
          };

          this.sortList(event);
          this.sort.emit(event);

          return true;
        }

        return false;
      });
  }

  private sortList(event: SortEvent): void {
    if (this.list) {
      const newList = [...this.list];
      const currentItem = newList[event.currentIndex];

      newList[event.currentIndex] = newList[event.newIndex];
      newList[event.newIndex] = currentItem;

      this.listChange.emit(newList);
    }
  }
}
