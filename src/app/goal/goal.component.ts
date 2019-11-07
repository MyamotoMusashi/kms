import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GoalService } from '../goal.service';

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.css']
})
export class GoalComponent implements OnInit {

  goal = {};

  constructor(private goalService: GoalService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.goalService.getGoalByID(id).subscribe(goal => {
      this.goal = goal;
    });
  }

  ngOnDestroy(){
  }

  deleteGoalByID() {
    const id = this.route.snapshot.paramMap.get('id')
    this.goalService.deleteGoalByID(id).subscribe((deletedGoal) => {
      this.router.navigateByUrl('/goals')
      let alert = document.getElementById('alert-primary');
        let alertTitle = document.getElementById('alert-primary-title')
        alertTitle.innerText = `Goal "${deletedGoal.title}" successfully deleted!`
        alert.style.display = "block";
    })
  }

};

