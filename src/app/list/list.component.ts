import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

import { Todo } from './list.interface';

const materialModule = [
  MatFormFieldModule,
  MatInputModule,
  MatTableModule,
  MatDatepickerModule,
  MatCheckboxModule,
  MatNativeDateModule,
  MatButtonModule,
  MatIconModule,
];

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ...materialModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  taskList: Array<Todo> = [];
  dataSource: Array<Todo> = [];
  displayedColumns: string[] = ['isCompleted', 'task', 'date', 'delete'];
  todoForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.createForm();
  }

  createForm(): void {
    this.todoForm = this.formBuilder.group({
      task: ['', Validators.required],
      date: ['', Validators.required],
      isCompleted: [false],
    });
  }

  addTasks(): void {
    this.taskList.push(this.todoForm.value);
    this.dataSource = [...this.taskList];
    this.todoForm.reset();
  }

  updateList(check: boolean, index: number) {
    let currentTask: Todo = this.taskList.splice(index, 1)[0];
    currentTask.isCompleted = check;

    if (!!currentTask.isCompleted) {
      this.taskList.push(currentTask);
    } else {
      this.taskList.unshift(currentTask);
    }
    this.dataSource = [...this.taskList];
  }

  deleteTask(index: number): void {
    this.taskList.splice(index, 1)[0];
    this.dataSource = [...this.taskList];
  }
}
