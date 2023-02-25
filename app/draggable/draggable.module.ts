import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from "@angular/cdk/overlay";

import { DraggableDirective } from './draggable.directive';
import { DraggableHelperDirective } from './draggable-helper.directive';
import { DraggableService } from './draggable.service';
import { DraggableHandleDirective } from './draggable-handle.directive';

import { MovableDirective } from './movable/movable.directive';
import { MovableAreaDirective } from './movable/movable-area.directive';

import { DropzoneDirective } from './droppable/dropzone.directive';
import { DroppableDirective } from './droppable/droppable.directive';
import { DroppableService } from './droppable/droppable.service';
import { DroppableContainerDirective } from './droppable/droppable-container.directive';

import { SortableListDirective } from './sortable/sortable-list.directive';
import { SortableDirective } from './sortable/sortable.directive';
import { ConnectedSortableListsDirective } from './sortable/connected-sortable-lists.directive';
import { ConnectedSortableListDirective } from './sortable/connected-sortable-list.directive';

@NgModule({
  imports: [CommonModule, OverlayModule],
  declarations: [
    DraggableDirective,
    DraggableHelperDirective,
    DraggableHandleDirective,
    MovableDirective,
    MovableAreaDirective,
    DropzoneDirective,
    DroppableDirective,
    DroppableContainerDirective,
    SortableListDirective,
    SortableDirective,
    ConnectedSortableListsDirective,
    ConnectedSortableListDirective
  ],
  exports: [
    DraggableDirective,
    DraggableHelperDirective,
    DraggableHandleDirective,
    MovableDirective,
    MovableAreaDirective,
    DropzoneDirective,
    DroppableDirective,
    DroppableContainerDirective,
    SortableListDirective,
    SortableDirective,
    ConnectedSortableListsDirective,
    ConnectedSortableListDirective
  ],
  providers: [DraggableService]
})
export class DraggableModule {}