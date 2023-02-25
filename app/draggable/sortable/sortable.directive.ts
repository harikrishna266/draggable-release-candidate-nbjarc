import { Directive, forwardRef, HostBinding, ElementRef } from '@angular/core';
import { DraggableDirective } from '../draggable.directive';

@Directive({
  selector: '[appSortable]'
})
export class SortableDirective {
  @HostBinding('class.sortable') sortable = true;

  constructor(public draggable: DraggableDirective, public element: ElementRef) {}
}