import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class NotfoundComponent{

  constructor(private readonly cd:ChangeDetectorRef){}
  onClick(){
    this.cd.detectChanges
  }
}
