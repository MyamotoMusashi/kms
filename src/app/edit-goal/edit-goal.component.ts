import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { Goal } from '../models/goal.model';
import { GoalsService } from '../goals.service';
import { GoalService } from '../goal.service';

@Component({
  selector: 'app-edit-goal',
  templateUrl: './edit-goal.component.html',
  styleUrls: ['./edit-goal.component.css']
})
export class EditGoalComponent implements OnInit {
  goal = new Goal("","","");


  constructor(private goalService: GoalService, private goalsService: GoalsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.goalService.getGoalByID(id).subscribe(goal => {
      this.goal = goal;
    })
  }

  editGoal() {
    const id = this.route.snapshot.paramMap.get('id');
    this.goalService.editGoalByID(id, this.goal).subscribe(() => {
      this.router.navigate([`/goals/${id}`])
    });
  }
}  
