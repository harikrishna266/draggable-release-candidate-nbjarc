import { Directive, ContentChildren, QueryList } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { ConnectedSortableListDirective } from './connected-sortable-list.directive';

@Directive({
  selector: '[appConnectedSortableLists]'
})
export class ConnectedSortableListsDirective {
  @ContentChildren(ConnectedSortableListDirective) connectedLists: QueryList<ConnectedSortableListDirective>;

  private subscriptions: Subscription[] = [];

  ngAfterContentInit(): void {
    this.connectedLists.changes.subscribe(() => {
      this.subscriptions.forEach(s => s.unsubscribe());

      this.subscriptions = this.connectedLists
        .map(connectedList => connectedList.moveIn$
          .subscribe(event => this.moveTo(event.data, connectedList)
        )
      );
    });

    this.connectedLists.notifyOnChanges();
  }

  private moveTo(data: any, toList: ConnectedSortableListDirective) {
    this.connectedLists
      .filter(list => list !== toList)
      .forEach(list => list.removeData(data));

    toList.addData(data);
  }

}