import { Directive, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { GlobalPositionStrategy, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';

import { fromEvent } from 'rxjs/observable/fromEvent';
import { first } from 'rxjs/operators';

import { DragOperation } from './draggable.directive';

@Directive({
  selector: '[appDraggableHelper]',
  exportAs: 'appDraggableHelper'
})
export class DraggableHelperDirective implements OnInit, OnDestroy {
  private overlayRef: OverlayRef;
  private positionStrategy = new GlobalPositionStrategy(document);

  constructor(private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private overlay: Overlay) { }

  ngOnInit(): void {
    this.overlayRef = this.overlay.create({
      positionStrategy: this.positionStrategy
    });
  }

  ngOnDestroy(): void {
    this.overlayRef.dispose();
  }

  onDragStart(operation: DragOperation): void {
    this.overlayRef.overlayElement.style.minWidth = `${operation.clientRect.width}px`;
  }

  onDragMove(operation: DragOperation): void {
    if (!this.overlayRef.hasAttached()) {
      this.overlayRef.attach(new TemplatePortal(this.templateRef, this.viewContainerRef));
      const rootElement = this.overlayRef.overlayElement.firstChild as HTMLElement;
      if (rootElement.style) {
        rootElement.style.minWidth = '100%';
        rootElement.style.boxSizing = 'border-box';
      }
    }

    // position the helper...
    this.positionStrategy.left(`${operation.lastEvent.clientX - operation.offset.x}px`);
    this.positionStrategy.top(`${operation.lastEvent.clientY - operation.offset.y}px`);
    this.positionStrategy.apply();
  }

  onDragEnd(newPosition: ClientRect): void {
    if (!this.overlayRef.hasAttached()) {
      return;
    }

    this.overlayRef.overlayElement.classList.add('animated');

    this.positionStrategy.left(`${newPosition.left}px`);
    this.positionStrategy.top(`${newPosition.top}px`);
    this.positionStrategy.apply();

    fromEvent(this.overlayRef.overlayElement, 'transitionend')
      .pipe(first())
      .subscribe(() => {
        this.overlayRef.detach();
        this.overlayRef.overlayElement.classList.remove('animated');
      });
  }
}
