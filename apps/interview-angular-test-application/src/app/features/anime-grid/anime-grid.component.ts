import { AfterViewInit, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import anime from 'animejs';

@Component({
  selector: 'mrlonis-anime-grid',
  templateUrl: './anime-grid.component.html',
  styleUrls: ['./anime-grid.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AnimeGridComponent implements AfterViewInit {
  columns = 10;
  rows = 10;
  tiles: HTMLElement | null = null;
  tilesGradient: HTMLElement | null = null;
  gridType: FormControl<'rainbow' | 'gradient'> = new FormControl('rainbow', { nonNullable: true });
  widthChop = 0.9;
  heightChop = 0.8;
  backgroundColor: string | null = null;
  toggled = false;

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.createGrid(this.gridType.value);
    window.onresize = () => {
      this.createGrid(this.gridType.value);
    };
    this.gridType.valueChanges.subscribe((value) => {
      this.changeDetectorRef.detectChanges();

      if (value === 'rainbow') {
        this.toggled = false;
      }

      this.createGrid(value);
      this.changeDetectorRef.detectChanges();
    });
  }

  createGrid(gridType: 'rainbow' | 'gradient') {
    this.columns = Math.floor((document.body.clientWidth * this.widthChop) / 50);
    this.rows = Math.floor((document.body.clientHeight * this.heightChop) / 50);

    this.tiles = document.getElementById('tiles');
    if (this.tiles !== null) {
      this.tiles.innerHTML = '';
      this.tiles.style.setProperty('--columns', this.columns.toString());
      this.tiles.style.setProperty('--rows', this.rows.toString());
      this.createTiles(this.tiles, this.columns * this.rows, gridType);
    }

    this.tilesGradient = document.getElementById('tilesGradient');
    if (this.tilesGradient !== null) {
      this.tilesGradient.innerHTML = '';
      this.tilesGradient.style.setProperty('--columns', this.columns.toString());
      this.tilesGradient.style.setProperty('--rows', this.rows.toString());
      this.createTiles(this.tilesGradient, this.columns * this.rows, gridType);
    }
  }

  createTiles(wrapper: HTMLElement, quantity: number, gridType: 'rainbow' | 'gradient') {
    Array.from(Array(quantity)).map((_tile, index) => {
      wrapper.appendChild(this.createTile(index, gridType));
    });
  }

  createTile(index: number, gridType: 'rainbow' | 'gradient'): HTMLElement {
    const tile = document.createElement('div');

    let className = 'tile';
    if (gridType === 'gradient') {
      className = 'tileGradient';
    } else {
      if (this.backgroundColor !== null) {
        tile.style.backgroundColor = this.backgroundColor;
      }
    }

    tile.classList.add(className);
    // tile.innerText = index.toString();
    // tile.innerText = ' ';
    tile.onclick = () => this.handleOnClick(index, gridType);
    return tile;
  }

  handleOnClick(index: number, gridType: 'rainbow' | 'gradient') {
    console.log('AnimeGridComponent: handleOnClick(): Starting...');
    if (gridType === 'rainbow') {
      this.backgroundColor =
        'rgb(' +
        Math.floor(Math.random() * 255).toString() +
        ', ' +
        Math.floor(Math.random() * 255).toString() +
        ', ' +
        Math.floor(Math.random() * 255).toString() +
        ')';

      anime({
        targets: '.tile',
        backgroundColor: this.backgroundColor,
        // eslint-disable-next-line import/no-named-as-default-member
        delay: anime.stagger(50, {
          grid: [this.columns, this.rows],
          from: index,
        }),
      });
    } else {
      this.toggled = !this.toggled;

      anime({
        targets: '.tileGradient',
        opacity: this.toggled ? 0 : 1,
        // eslint-disable-next-line import/no-named-as-default-member
        delay: anime.stagger(50, {
          grid: [this.columns, this.rows],
          from: index,
        }),
      });
    }
  }
}
