import { Directive, HostListener, Optional, Input, EventEmitter, Output } from '@angular/core';

import { DraggableDirective } from './../draggable.directive';
import { DroppableService } from './droppable.service';
import { DroppableEvent } from './droppable-event';

@Directive({
  selector: '[appDroppable],[appSortable]'
})

export class DroppableDirective<T = any> {
  @Input('appDroppable')
  data: T;

  constructor(public draggable: DraggableDirective,
              @Optional() private droppableService: DroppableService<T>) { }

  @HostListener('dragStart', ['$event'])
  onDragStart(event: PointerEvent): void {
    if (!this.droppableService) return;

    this.droppableService.onDragStart({
      nativeEvent: event,
      data: this.data
    });
  }

  @HostListener('dragMove', ['$event'])
  onDragMove(event: PointerEvent): void {
    if (!this.droppableService) return;

    this.droppableService.onDragMove({
      nativeEvent: event,
      data: this.data
    });
  }

  @HostListener('dragEnd', ['$event'])
  onDragEnd(event: PointerEvent): void {
    if (!this.droppableService) return;
    
    this.droppableService.onDragEnd({
      nativeEvent: event,
      data: this.data
    });
  }
}
