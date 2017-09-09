import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Sudoku Solver';

  grid=[[3,0,6,5,0,8,4,0,0],
  [5,2,0,0,0,0,0,0,0],
  [0,8,7,0,0,0,0,3,1],
  [0,0,3,0,1,0,0,8,0],
  [9,0,0,8,6,3,0,0,5],
  [0,5,0,0,9,0,6,0,0],
  [1,3,0,0,0,0,2,5,0],
  [0,0,0,0,0,0,0,7,4],
  [0,0,5,2,0,6,3,0,0]];

  
  solveSudoku(): boolean{
    var l = [0,0];
    var row = 0,col = 1;
    if(!this.findUnassignedLocation(row, col))
      return true;

    for(var num = 1; num<=9;num++){
      if(this.isSafe(row, col, num)){
        this.grid[row][col] = num;
        if(this.solveSudoku())
          return true;
        this.grid[row][col] = 0;
      }
    }
    return false;
  }

  findUnassignedLocation( row, col): boolean{
    for(row = 0; row<9;row++)
      for(col=0;col<9;col++)
        if(this.grid[row][col]==0)
          return true;
    return false;
  }

  usedInRow(row, num): boolean{
    for(var col = 0;col<9;col++)
      if(this.grid[row][col]==num)
        return true;
    return false;
  }

  usedInCol(col, num): boolean{
    for(var row = 0;row<9;row++)
      if(this.grid[row][col]==num)
        return true;
    return false;
  }

  usedInBox(boxStartRow, boxStartCol, num): boolean{
    for(var row = 0;row<3;row++)
      for(var col = 0;col<3;col++)
        if(this.grid[row+boxStartRow][col+boxStartCol]==num)
          return true;
    return false;
  }

  isSafe(row, col, num): boolean{
    return !this.usedInRow(row,num) && !this.usedInCol(col, num) && !this.usedInBox(row - row%3, col - col%3, num);
  }

  solver(){
    console.log(this.solveSudoku());
  }
}
