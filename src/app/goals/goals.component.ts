import { Component, OnInit } from '@angular/core';
import { GoalsService } from '../goals.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Goal } from '../models/goal.model';
import { GoalService } from '../goal.service';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css']
})
export class GoalsComponent implements OnInit {

  goals = [] as Goal[];
  header: string;

  constructor(private goalsService: GoalsService, private goalService: GoalService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    this.route.queryParamMap.subscribe(params => {
      let query: string;
      query = params.get("state")
      this.header = query;
      switch (query) {
        case "active":
          this.getAllActiveGoalsByQuery("active");
          break;
        case "waiting":
          this.getAllGoalsByQuery("waiting");
          break;
        case "inbox":
          this.getAllGoalsByQuery("inbox");
          break;
        case "daily":
          this.getAllGoalsByQuery("daily");
          break;
        case null:
          this.getAllGoalsByQuery(null);
          break;
      }
    })
  }


  completeGoal(event: any, goal: Goal) {
    let id: string = goal.id;
    this.goalService.editGoalByID(id, goal).subscribe();
  }

  sortGoalsByPriority(a, b) {
    return a.priority - b.priority;
  }

  refreshGoalList(event: boolean) {
    if (event) {
      let query = this.route.snapshot.queryParamMap.get("state");
      this.getAllGoalsByQuery(query);
    }
  }

  getAllGoalsByQuery(query: string) {
    this.goals = [];
    this.goalsService.getAllGoalsByQuery(query).subscribe(goals => {
      //goals.sort(this.sortGoalsByPriority);
      for (let i = 0; i < goals.length; i = i + 1) {
      /*   if (goals[i].parentid === null) {
          this.goals.push(goals[i]);
        } */
        this.goals[i] = goals[i];
        this.goals[i].priority = i;
      }
    });
    
  }

  getAllActiveGoalsByQuery(query: string) {
    this.goals = [];
    this.goalsService.getAllGoalsByQuery(query).subscribe(goals => {
      //goals.sort(this.sortGoalsByPriority);
      for (let i = 0; i < goals.length; i = i + 1) {
          //this.goals.push(goals[i]);
          this.goals[i] = goals[i];
          this.goals[i].priority = i;
      }
    });
  }

  download() {
    console.log("it works");
  }
}
