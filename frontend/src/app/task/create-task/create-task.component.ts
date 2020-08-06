import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../service/task.service'
import { MatSnackBar } from '@angular/material'
import { HttpErrorResponse } from '@angular/common/http'
import { Router } from '@angular/router'

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  
  createTask = {
    name: null,
    function: null,
    boss: null
  }
  

  constructor(private taskService: TaskService,
    private router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
  }


  

  create(){
    this.taskService.createTask(this.createTask)
      .subscribe(
        res => {
          console.log(res)
          this.router.navigate(['/tasks'])
        },
        err => {
          console.log(err)
          if(err instanceof HttpErrorResponse){
            if(err.status === 401){
              this.snackBar.open("No estas logeado... Enviando a Login", null, {
                duration: 2000
              })
              this.router.navigate(['/login'])
            }
          }
        }
      )
  }

}
