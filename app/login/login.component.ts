import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

import {PlayerService} from '../player.service'

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input() playerName: string;
  @Output() open: EventEmitter<any> = new EventEmitter();
  login : boolean = false;
  
  constructor (private playerService: PlayerService) {}

  onSubmit() {
    this.playerService.addPlayer(this.playerName);
  }

  toggle() {
    this.open.emit(this.playerName);
  }

  ngOnInit() {

  }

}
