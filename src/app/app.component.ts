import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core'; 
import { RouterOutlet } from '@angular/router'; 
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [
    RouterOutlet, 
    TranslateModule, 
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule
  ], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(public translate: TranslateService) {
    translate.addLangs(['en']); // Ajouter uniquement la langue souhaitée
    translate.setDefaultLang('en'); // Définir la langue par défaut
    translate.use('en'); // Utiliser la langue par défaut
  }
}
  


