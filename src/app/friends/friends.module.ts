import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { ChartComponent } from "./chart/chart.component";
import { FriendsComponent } from "./page/friends.component";
import { FriendsService } from "./page/friends.service";

@NgModule({
  declarations: [FriendsComponent, ChartComponent],
  imports: [CommonModule, MatInputModule, MatButtonModule, HttpClientModule],
  providers: [FriendsService],
  exports: [FriendsComponent],
})
export class FriendsModule {}
