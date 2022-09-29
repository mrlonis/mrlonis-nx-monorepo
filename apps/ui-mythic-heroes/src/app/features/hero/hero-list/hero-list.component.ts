import { CommonModule } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { BaseResource, Faction, MythicHero, Rarity, Type } from '@mrlonis/types-mrlonis';
// import { TableVirtualScrollDataSource, TableVirtualScrollModule } from 'ng-table-virtual-scroll';
import { forkJoin, Observable, of } from 'rxjs';
import { BaseResourceDisplayComponent, MythicHeroesAggressiveCache } from '../../../shared';

@Component({
  standalone: true,
  selector: 'mrlonis-table-pagination-example',
  styleUrls: ['hero-list.component.scss'],
  templateUrl: 'hero-list.component.html',
  imports: [
    BaseResourceDisplayComponent,
    CommonModule,
    FormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatOptionModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    ReactiveFormsModule,
    RouterModule,
    // TableVirtualScrollModule,
  ],
})
export class HeroListComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['hero', 'faction', 'rarity', 'type'];
  // dataSource = new TableVirtualScrollDataSource<MythicHeroesTableDataSource>([]);
  dataSource = new MatTableDataSource<MythicHeroesTableDataSource>([]);
  data: MythicHeroesTableDataSource[] = [];
  isLoadingResults = true;

  nameParam = '';
  factionNameParam = '';
  rarityNameParam = '';
  typeNameParam = '';
  heroSortParam?: string;

  items = Array.from({ length: 100000 }).map((_, i) => `Item #${i}`);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('scrollViewport') scrollViewport!: ElementRef<HTMLDivElement>;

  heroNameFilterControl = new FormControl('');
  filteredOptions: Observable<MythicHero[]> | Observable<never[]> = of([]);

  constructor(private cache: MythicHeroesAggressiveCache) {}

  ngOnInit() {
    this.updateData();
    this.filteredOptions = this.cache.collectBy('mythicHero', this.getHttpParams());

    this.heroNameFilterControl.valueChanges.subscribe((value) => {
      this.nameParam = value != null ? value : '';
      this.updateData();
      this.filteredOptions = this.cache.collectBy('mythicHero', this.getHttpParams());
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  createDataSource(forkJoinResult: {
    heroes: MythicHero[];
    factions: Faction[];
    rarities: Rarity[];
    types: Type[];
  }): MythicHeroesTableDataSource[] {
    const data: MythicHeroesTableDataSource[] = [];
    forkJoinResult.heroes.forEach((hero) => {
      data.push({
        hero: hero,
        faction: this.cache.getBy('faction', new HttpParams().set('id', hero.factionId)),
        rarity: this.cache.getBy('rarity', new HttpParams().set('id', hero.rarityId)),
        type: this.cache.getBy('type', new HttpParams().set('id', hero.typeId)),
      });
    });
    return data;
  }

  findById(data: BaseResource[], id: string): BaseResource {
    for (let i = 0; i < data.length; i++) {
      if (data[i].id == id) {
        return data[i];
      }
    }
    return { name: '--', imageUrl: '', id: '', _links: { self: { href: '' }, item: { href: '' } } };
  }

  pageEventHandler(event: PageEvent) {
    // console.log('HeroListComponent: pageEventHandler(): Starting...');
    console.log(event);
  }

  sortData(sort: Sort) {
    if (sort.active == 'hero') {
      if (sort.direction == 'asc') {
        this.heroSortParam = 'name,asc';
      } else if (sort.direction == 'desc') {
        this.heroSortParam = 'name,desc';
      } else {
        this.heroSortParam = undefined;
      }

      this.updateData();
    }
  }

  updateData() {
    this.isLoadingResults = true;
    forkJoin({
      heroes: this.cache.collectBy('mythicHero', this.getHttpParams()),
      factions: this.cache.getAll('faction'),
      rarities: this.cache.getAll('rarity'),
      types: this.cache.getAll('type'),
    }).subscribe((x) => {
      console.log(x);
      // this.dataSource = new TableVirtualScrollDataSource<MythicHeroesTableDataSource>(this.createDataSource(x));
      this.dataSource = new MatTableDataSource<MythicHeroesTableDataSource>(this.createDataSource(x));
      this.dataSource.paginator = this.paginator;
      this.isLoadingResults = false;
    });
  }

  getHttpParams(): HttpParams {
    let params = new HttpParams()
      .set('name', this.nameParam)
      .set('factionName', this.factionNameParam)
      .set('rarityName', this.rarityNameParam)
      .set('typeName', this.typeNameParam);
    if (this.heroSortParam !== undefined) {
      params = params.set('sort', this.heroSortParam);
    }
    return params;
  }

  clearNameFilter(): void {
    this.heroNameFilterControl.setValue('');
  }
}

export interface MythicHeroesTableDataSource {
  hero: MythicHero;
  faction: Observable<Faction>;
  rarity: Observable<Rarity>;
  type: Observable<Type>;
}
