import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import * as PouchDB from 'pouchdb';
import { UUID } from 'angular2-uuid';
// import { Player } from './datebase/Models';
// import { Observable } from 'rxjs/Observable';

// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/throw';
// import 'rxjs/RX';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PlayerService {

  constructor(private http: Http) {}

  db = new PouchDB('todos');
  // remoteCouch = 'http://localhost:5984/todos';
  showName: string;
  login: boolean = false;
  player: any;

    isLoggedIn() {
        return true;
    }

  addPlayer(playerName: string) {

      let dbCall = this.db.allDocs({include_docs: true, attachments: true})
          .then(result => result)
          .catch(err => err);

      dbCall
          .then(result => {
            result.rows.forEach((target) => {
              console.log('step');
              if (target.doc.name === playerName) {
                this.login = true;
              }
            });

            if (this.login === false) {
              console.log('doneeee');
              this.login = true;
              // this.player = {
              //   name: newPlayer,
              //   _id: UUID.UUID(),
              //   record: 0,
              //   time: 0
              // };
              //
              // this.db.put(this.player, function callback(err, result) {
              //   if (!err) {
              //     console.log('Successfully posted a todo!');
              //   }
              // });
            }

          })
          .catch(err => console.log(err));

    //
    // let sync = () => {
    //   let opts = {live: true};
    //   this.db.sync(this.remoteCouch, opts);
    // };
    //
    // sync();

    this.showName = playerName;
  }

  getName() {
    return this.showName;
  }
  
}
