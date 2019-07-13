import { Component, OnInit } from '@angular/core';
import { Item } from '../assets/model/item.schema';
import { AppService } from './app.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'electron-sqllite-angular';
  itemList: Item[];
  constructor(private translate: TranslateService, private appservice: AppService) {
    translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    console.log('component initialized');
    this.appservice.getItems().subscribe((items) => (this.itemList = items));
  }

  addItem(): void {
    let item = new Item();
    item.name = 'Item ' + this.itemList.length;
    this.appservice.addItem(item).subscribe((items) => (this.itemList = items));
  }

  deleteItem(): void {
    const item = this.itemList[this.itemList.length - 1];
    this.appservice
      .deleteItem(item)
      .subscribe((items) => (this.itemList = items));
  }

}
