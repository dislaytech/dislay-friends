import { Component } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { Friend } from "../../models/Friend.model";
import { FriendsService } from "./friends.service";

@Component({
  selector: "app-friends",
  templateUrl: "./friends.component.html",
  styleUrls: ["./friends.component.scss"],
})
export class FriendsComponent {
  data$: Observable<Friend[]>;

  constructor(private friendsService: FriendsService) {
    this.data$ = friendsService.getFriends();
  }
}
