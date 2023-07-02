import { Injectable } from "@nestjs/common";
import { Observable, Subject } from "rxjs";
import { MessageEvent } from "@nestjs/common";

@Injectable()
export class SseService{
    private eventSubject = new Subject<MessageEvent>()

    pushEvent(event:MessageEvent){
        this.eventSubject.next(event)
    }

    getAccountCreationProgress(auth:any):Observable<MessageEvent>{
        return this.eventSubject.asObservable()
    }
}