import { Directive, ElementRef, HostBinding } from '@angular/core';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { tap } from 'rxjs/operators';

import { DraggableDirective } from './draggable.directive';

@Directive({
  selector: '[appDraggableHandle]'
})
export class DraggableHandleDirective {
  // to trigger pointer-events polyfill
  @HostBinding('class.draggable') enabled = true;

  // to trigger pointer-events polyfill
  @HostBinding('attr.touch-action') touchAction = 'none';

  constructor(private draggable: DraggableDirective, private element: ElementRef) {}

  ngOnInit(): void {
    this.draggable.draggable = false;
    this.draggable.handle$ = fromEvent(this.element.nativeElement, 'pointerdown').pipe(tap((event: PointerEvent) => event.stopPropagation()));
  }

}