import { Component } from '@angular/core';

function remove(item: string, list: string[]) {
  if (list.indexOf(item) !== -1) {
    list.splice(list.indexOf(item), 1);
  }
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentPosition: string;

  updatePosition(event) {
    this.currentPosition = `${event.clientX.toFixed(0)},${event.clientY.toFixed(0)}`;
  }

  sortableList = [
    'Box 1',
    'Box 2',
    'Box 3',
    'Box 4',
  ];

  connectedList1 = [
    'Box 1',
    'Box 2',
    'Box 3',
  ];

  connectedList2 = [
    'Box 4',
    'Box 5',
  ];

  connectedList3 = [
    'Box 6',
  ];

  availableBoxes = [
    'Box 1',
    'Box 2',
    'Box 3',
    'Box 4',
    'Box 5',
  ];

  dropzone1 = [
    'Box 6'
  ];

  dropzone2 = [
    'Box 7'
  ];

  move(box: string, toList: string[]): void {
    remove(box, this.availableBoxes);
    remove(box, this.dropzone1);
    remove(box, this.dropzone2);

    toList.push(box);
  }
}
