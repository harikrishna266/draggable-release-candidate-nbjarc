import { Directive, ElementRef, EventEmitter, HostBinding, HostListener, OnInit, Output, SkipSelf } from '@angular/core';

import { DroppableService } from './droppable.service';
import { DroppableEvent } from './droppable-event';

@Directive({
  selector: '[appDropzone],[appConnectedSortableList]',
  providers: [DroppableService]
})
export class DropzoneDirective implements OnInit {
  @HostBinding('class.dropzone-activated') activated = false;
  @HostBinding('class.dropzone-entered') entered = false;

  @Output() drop = new EventEmitter<DroppableEvent>();
  @Output() remove = new EventEmitter<DroppableEvent>();

  @Output() enter = new EventEmitter<DroppableEvent>();
  @Output() leave = new EventEmitter<DroppableEvent>();

  private clientRect: ClientRect;

  constructor(@SkipSelf() private allDroppableService: DroppableService,
              private innerDroppableService: DroppableService,
              private element: ElementRef) { }

  ngOnInit(): void {
    this.allDroppableService.dragStart$.subscribe(() => this.onDragStart());
    this.allDroppableService.dragEnd$.subscribe(event => this.onDragEnd(event));

    this.allDroppableService.dragMove$.subscribe(event => {
      this.clientRect = this.element.nativeElement.getBoundingClientRect();
      if (this.isEventInside(event.nativeEvent) && !this.entered) {
        this.onPointerEnter(event);
      } else if (!this.isEventInside(event.nativeEvent) && this.entered) {
        this.onPointerLeave(event);
      }
    });

    this.innerDroppableService.dragStart$.subscribe(() => this.onInnerDragStart());
    this.innerDroppableService.dragEnd$.subscribe(event => this.onInnerDragEnd(event));
  }

  private onPointerEnter(event: DroppableEvent): void {
    if (!this.activated) {
      return;
    }

    this.entered = true;
    this.enter.emit(event);
  }

  private onPointerLeave(event: DroppableEvent): void {
    if (!this.activated) {
      return;
    }

    this.entered = false;
    this.leave.emit(event);
  }

  private onDragStart(): void {
    // this.clientRect = this.element.nativeElement.getBoundingClientRect();

    this.activated = true;
  }

  private onDragEnd(event: DroppableEvent): void {
    if (!this.activated) {
      return;
    }

    if (this.entered) {
      this.drop.emit(event);
    }

    this.activated = false;
    this.entered = false;
  }

  private onInnerDragStart() {
    this.activated = true;
    this.entered = true;
  }

  private onInnerDragEnd(event: DroppableEvent) {
    if (!this.entered) {
      this.remove.emit(event);
    }

    this.activated = false;
    this.entered = false;
  }

  private isEventInside(event: PointerEvent) {
    return event.clientX >= this.clientRect.left &&
      event.clientX <= this.clientRect.right &&
      event.clientY >= this.clientRect.top &&
      event.clientY <= this.clientRect.bottom;
  }
}
