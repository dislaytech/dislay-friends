import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { Friend } from "src/app/models/Friend.model";

@Injectable({
  providedIn: "root",
})
export class FriendsService {
  constructor(private http: HttpClient) {}

  getFriends(): Observable<Friend[]> {
    return this.http.get<Friend[]>("./assets/friends.json");
  }
}
