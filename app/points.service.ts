import { Injectable } from '@angular/core';

import { Http } from '@angular/http';

import * as PouchDB from 'pouchdb';
import { UUID } from 'angular2-uuid';

@Injectable()
export class PointsService {

  constructor() {}

  db = new PouchDB('todos');
  // remoteCouch = 'http://localhost:5984/todos';
  moveCount: number = 0;
  winCongratulations: boolean = false;
  player: any;
  startTimePoint: any;

  getPlayers() {
    // console.log(this.db.allDocs({include_docs: true, attachments: true}));
    // console.log(this.db.get('7f2e812b-2b71-e0b8-4133-af9a16e27a74'));

    return this.db.allDocs({include_docs: true, attachments: true});

  }

  startTime() {
    this.startTimePoint = Date.now();
  }

  doMove(block, blocks, newPlayer) {

    // let transform = document.get

    let defaultBlock: any;
    let currentIndex: number;
    const exception: number = 4;

    let winCheck = () => {
      let checkItem = 0;
      for (let i = 0; i < blocks.length; i++) {
        if (blocks[i].number === i) {
          if (checkItem === 15) {
            console.log('you win!!');
            this.winCongratulations = true;

            let timeRecord = Date.now() - this.startTimePoint;

            this.player = {
              name: newPlayer,
              _id: UUID.UUID(),
              record: this.moveCount,
              time: timeRecord
            };

            this.db.put(this.player, function callback(err, result) {
              if (!err) {
                console.log('Successfully posted a todo!');
              }
            });


            return false;
          }
          checkItem++;
        }
        else {
          return false;
        }
      }
    };

    let swap = (item) => {
      let swapClass = blocks[currentIndex+item];
      let swapedClass = blocks[currentIndex];
      let swapClassC = blocks[currentIndex+item].class_id;
      let swapedClassC = blocks[currentIndex].class_id;
      blocks[currentIndex] = swapClass;
      blocks[currentIndex+item] = swapedClass;
      blocks[currentIndex].class_id = swapedClassC;
      blocks[currentIndex+item].class_id = swapClassC;
      this.moveCount+=1;
      console.log(this.moveCount);
      winCheck();
    };

    for (let i =0;i<17;i++) {
      if (blocks[i].number === 0){
        defaultBlock = blocks[i];
        currentIndex = blocks.indexOf(block);

        if (blocks[currentIndex+1] === defaultBlock
            && ((currentIndex != exception*2-1 && blocks[currentIndex+1].number != exception*2)
            && currentIndex != exception-1 && blocks[currentIndex+1].number != exception)
            && currentIndex != exception*3-1 && blocks[currentIndex+1].number != exception*3
        ) {
          swap(1);
        }

        else if (blocks[currentIndex+4] === defaultBlock) {
          swap(4);
        }

        else if (blocks[currentIndex-4] === defaultBlock) {
          swap(-4);
        }

        else if (blocks[currentIndex-1] === defaultBlock
            && ((currentIndex != exception*2 && blocks[currentIndex-1].number != exception*2-1)
            && currentIndex != exception && blocks[currentIndex-1].number != exception-1)
            && currentIndex != exception*3 && blocks[currentIndex-1].number != exception*3-1
        ) {
          swap(-1);
        }
        return false;
      }
    }

  }

  winner() {
    return this.winCongratulations;
  }

}
