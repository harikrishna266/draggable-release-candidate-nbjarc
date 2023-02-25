import { Directive } from '@angular/core';

import { DroppableService } from './droppable.service';

@Directive({
  selector: '[appDroppableContainer],[appConnectedSortableLists]',
  providers: [DroppableService]
})
export class DroppableContainerDirective {}