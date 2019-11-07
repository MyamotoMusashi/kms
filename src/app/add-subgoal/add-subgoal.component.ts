import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { Goal } from '../models/goal.model';
import { GoalService } from '../goal.service';

@Component({
  selector: 'app-add-subgoal',
  templateUrl: './add-subgoal.component.html',
  styleUrls: ['./add-subgoal.component.css']
})

export class AddSubGoalComponent implements OnInit {
  subGoal = new Goal("", "", "");
  id = this.route.snapshot.paramMap.get('id')

  constructor(private goalService: GoalService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }

  addSubGoal(){
    this.goalService.addSubGoal(this.id, this.subGoal).subscribe(respone => {
      this.router.navigateByUrl('/goals/' + this.id);
    });
  }
}
