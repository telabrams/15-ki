import { Component, OnInit } from '@angular/core';

import {PointsService} from '../points.service';
import {PlayerService} from '../player.service';


@Component({
  moduleId: module.id,
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {
  blocks:Array<{number: number,
    class_id: string}> = [];
  winCheck: boolean;
  showName: string;

  constructor(private PointsService: PointsService,
              private PlayerService: PlayerService) {
    for (let i = 0; i < 16; i++) {
      this.blocks[i] = {
        number: i,
        class_id: 'block-number-'+i
      }
    }

    /* получить случайное целое число из диапазона */
    function random(min, max) {
      let range = max - min + 1;
      return Math.floor(Math.random()*range) + min;
    }

    /* перемешать массив */
    function shuffle(arr) {
      let r_i;
      let v;
      let arrLength = arr.length-1;
      for (let i = 0; i < arrLength; i++) {
        r_i = random(0, arrLength);
        v = arr[r_i].number;
        arr[r_i].number = arr[arrLength].number;
        arr[arrLength].number = v;
      }
      return arr;
    }
    shuffle(this.blocks);
  }

  ngOnInit() {
    this.PointsService.startTime();
  }


  clickEvent(block: any) {
    this.showName = this.PlayerService.getName();
    this.PointsService.doMove(block, this.blocks,this.showName);
    this.winCheck = this.PointsService.winner();

  }

}