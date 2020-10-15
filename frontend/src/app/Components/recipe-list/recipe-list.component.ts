import { Component, OnInit, ViewChild } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateRecipeComponent } from '../create-recipe/create-recipe.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  //@ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  // @ViewChild('scheduledOrdersPaginator') paginator: MatPaginator;
  // @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  // @ViewChild('scheduledOrdersPaginator') paginator: MatPaginator;

  paginator
  response: any;
  data: any;
  dataSource: any;
  // dataSource: MatTableDataSource<Object>;
  // dataSource2: MatTableDataSource<any>;

  // formFieldAppearance: MatFormFieldAppearance

  search: string;
  displayedColumns: string[] = [
    'name',
    'image',
    'description',
    'calories',
    'recipeCreatedDate',
    'ingredients',
    'cusineType',
    'recipeMakingTime',
    'recipeCategory'
  ];

  // @ViewChild(MatPaginator, {static: false}) set matPaginator(paginator: MatPaginator) {
  //   this.dataSource.paginator = paginator;
  // }

  constructor(private recipeService: RecipeService, public dialog: MatDialog) {}

  openDialog() {


    const dialogRef = this.dialog.open(CreateRecipeComponent);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialogForEdit(id: any) {
    console.log('testid', id);

    this.recipeService.getById(id).subscribe((res) => {
      console.log(res);
      this.data = res;
      console.log(this.data);

      const dialogRef = this.dialog.open(CreateRecipeComponent, {
        data: this.data,
      });

      dialogRef.afterClosed().subscribe((result) => {
        console.log(`Dialog result: ${result}`);
      });
    });
  }

  searchByName() {
    if (this.search == '') {
      return this.getList();
    }
    var searchModel = {
      name: this.search,
    };

    this.recipeService.search(searchModel).subscribe((res) => {
      this.dataSource = res;
      console.log([res]);
    });
  }

  getList() {
    this.recipeService.get().subscribe((response) => {
      this.dataSource = response;
      // console.log('<<<<<<<<>>>>>>>create list', response);
      // console.log('<<<<<<<<>>>>>>>> get dataScourse ', this.dataSource);
      // console.log('<<<<<<<<>>>>>>>> get response', response);
    });
  }

  ngOnInit(): void {
    this.getList();

    // this.recipeService.get().subscribe((response) => {
    //   this.dataSource = new MatTableDataSource();

    //   this.dataSource = response;
    //   this.dataSource.MatPaginator = this.paginator;


    // });
  }
 }
