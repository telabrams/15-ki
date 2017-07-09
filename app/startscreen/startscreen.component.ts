import { Component, OnInit } from '@angular/core';

import {PlayerService} from '../player.service'
import { Player } from '../datebase/Models';


@Component({
  moduleId: module.id,
  selector: 'app-startscreen',
  templateUrl: './startscreen.component.html',
  styleUrls: ['./startscreen.component.css']
})
export class StartscreenComponent implements OnInit {
  showName: string;

  constructor () {
  }

  ngOnInit() {
  }

  onOpen(playerName: string) {
    this.showName = playerName;
  }


}
