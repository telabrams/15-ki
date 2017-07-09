import {CanActivate} from "@angular/router";
import {Observable} from 'rxjs/Rx';
import {Injectable} from '@angular/core';
import {PlayerService} from './player.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private PlayerService:PlayerService){}

    canActivate() {
        return this.PlayerService.isLoggedIn();
    }
}
