import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{

  private subscriptions: Subscription;

  constructor(private userService: UserService){
    this.subscriptions = new Subscription;
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.userService.getAll().subscribe((result: any) => {
        console.log(result);
      })
    );
  }
}
