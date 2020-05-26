import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { Router } from '@angular/router';


export class Todo{
  constructor(
    public id: number,
    public description: string,
    public done: boolean,
    public targetDate : Date){}

    
}

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})
export class ListTodosComponent implements OnInit {

  message : string
  todos : Todo[]
  //   new Todo(1,'Learn to Dance',false,new Date()),
  //   new Todo(2,'Become an Expert at Angular',false,new Date()),
  //   new Todo(3,'Visit India',false,new Date())
  //   // {id : 1, description : 'Learn to Dance'},
  //   // {id : 2, description : 'Become an Expert at Angular'},
  //   // {id : 3, description : 'Visit India'}
  // ]
  // todo = {
  //   id : 1,
  //   description : 'Learn to Dance'
  // }

  constructor(
    private todoService:TodoDataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.refreshTodos();
  }

  refreshTodos(){
    this.todoService.retrieveAllTodos('cray').subscribe(
      response => {
        console.log(response);
        this.todos = response;
      }
    )
  }

  deleteTodo(id){
    console.log(`delete todo ${id}`)
    this.todoService.deleteTodo('cray',id).subscribe(
      responce =>{
        console.log(responce);
        this.message = `Delete of todo ${id} successful!`;
        this.refreshTodos();
      }
    )
  }

  updateTodo(id){
    this.router.navigate(['todos',id])
  }

  addTodo(){
    this.router.navigate(['todos',-1])
  }

}
