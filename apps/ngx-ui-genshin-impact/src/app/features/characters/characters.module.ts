import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { RouterModule } from '@angular/router';
import { CharacterDetailGuard } from './character-detail';
import { CharacterDetailComponent } from './character-detail/character-detail.component';
import { CharactersComponent } from './characters.component';

@NgModule({
  declarations: [CharactersComponent, CharacterDetailComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule,
    RouterModule.forChild([
      { path: '', component: CharactersComponent },
      {
        path: 'characters/:name',
        canActivate: [CharacterDetailGuard],
        component: CharacterDetailComponent
      }
    ])
  ],
  exports: [CharactersComponent, CharacterDetailComponent, CommonModule, MatCardModule, MatGridListModule, RouterModule]
})
export class CharactersModule {}
