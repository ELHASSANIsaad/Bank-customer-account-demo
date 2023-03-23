import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-editable-element',
  templateUrl: './editable-element.component.html',
  styleUrls: ['./editable-element.component.css']
})
export class EditableElementComponent {

  @Input() value?: number = 0;
  @Output() valueChange = new EventEmitter<number>();

  showInput = false;

  onEdit() {
    this.showInput = true;
    if(this.value == null || !Number.isFinite(this.value))
    {
      this.valueChange.emit(0);
      return;
    }
    this.valueChange.emit(this.value);
  }

}
