import { Injectable } from '@angular/core';

import { DragOperation } from './draggable.directive';

/**
 * Service which keeps track of aborted drag operations to
 * let newly created draggables take it over from destroyed draggables.
 */
@Injectable()
export class DraggableService {
  abortedDragOperation?: DragOperation;
}