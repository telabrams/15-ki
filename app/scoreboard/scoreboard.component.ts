import { Component, OnInit } from '@angular/core';

import {PointsService} from '../points.service'
// import { Template } from '../datebase/Template';

@Component({
  moduleId: module.id,
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css'],
})

export class ScoreboardComponent implements OnInit {

  constructor (private PointsService: PointsService) {}
  
  playerDB: any;

  sortType(sort: string) {
    if (sort === 'record') {
      this.playerDB = this.playerDB.sort(this.sortByMoves);
      console.log(this.playerDB);
    }
    if (sort === 'time') {
      this.playerDB = this.playerDB.sort(this.sortByTime);
      console.log(this.playerDB);
    }
  }

  sortByMoves(m1: any, m2: any) {
    if(m1.record > m2.record) return 1;
    else if (m1.record === m2.record) return 0;
    else return -1;
  }

  sortByTime(m1: any, m2: any) {
    if(m1.record < m2.record) return 1;
    else if (m1.record === m2.record) return 0;
    else return -1;
  }

  ngOnInit() {
    this.PointsService.getPlayers()
        .then(res => {
          console.log(res);
          this.playerDB = res.rows;
        })
        .catch(err => console.log(err));
  }

}
