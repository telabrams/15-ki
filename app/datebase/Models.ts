// import { UUID } from 'angular2-uuid';

export class Player {
    constructor(
        public name: string,
        public _id: string
    ) {}
}

export class Points {
    constructor(
        public name: string,
        public record: number,
        public time: number,
        public uuid: string,
        public player?: Player
    ) {}
    
}

