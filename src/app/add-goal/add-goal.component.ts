import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Goal } from '../models/goal.model';
import { GoalsService } from '../goals.service';

@Component({
  selector: 'app-add-goal',
  templateUrl: './add-goal.component.html',
  styleUrls: ['./add-goal.component.css']
})
export class AddGoalComponent implements OnInit {
  goal = new Goal("", "", "")


  constructor(private goalsService: GoalsService, private router: Router) { }

  ngOnInit() {
  }

  addGoal() {
    this.goalsService.addGoal(this.goal).subscribe(response => {
      if (response){
        this.router.navigateByUrl('/goals')
        let alert = document.getElementById('alert-primary');
        let alertTitle = document.getElementById('alert-primary-title')
        alertTitle.innerText = `Goal "${this.goal.title}" successfully added!`
        alert.style.display = "block";
      }
    });
  }

}
