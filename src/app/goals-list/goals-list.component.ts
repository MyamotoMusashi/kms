import { Component, OnInit, Input, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { Goal } from '../models/goal.model';
import { GoalService } from '../goal.service';
import { GoalsService } from '../goals.service';

@Component({
  selector: 'app-goals-list',
  templateUrl: './goals-list.component.html',
  styleUrls: ['./goals-list.component.css']
})
export class GoalsListComponent implements OnInit {
  
  @Input()
  goals = [] as Goal[];

  @Output()
  refreshGoalList: EventEmitter<boolean> = new EventEmitter<boolean>()


  constructor(private goalService: GoalService, private goalsService: GoalsService) { }

  ngOnInit() {}

  completeGoal(event: any, goal: Goal){
    let id: string = goal.id;
    this.goalService.editGoalByID(id, goal).subscribe();
  }

  addToDaily(goal: Goal){
    if(goal.isDaily == true){
      goal.isDaily = false;
    }
    else if(goal.isDaily == false || goal.isDaily == null){
      goal.isDaily = true;
    }

    let id: string = goal.id;
    this.goalService.editGoalByID(id, goal).subscribe(() => {
      this.refreshGoalList.emit(true);
    }); ;
  }

  changePriority(event, goal: Goal){
    let id: string = goal.id;
    console.log(goal.priority)
    console.log(event.currentTarget.value)
    console.log(this.goals)
    this.goalsService.changePriority(goal).subscribe(() => {
      this.refreshGoalList.emit(true);
    }); 
  }


}
