import { Component } from '@angular/core';
import { Animals } from '../classes/animales.class';
import { ANIMALES } from '../classes/data.animales';
import { IonRefresher } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public Animales: Animals[] = ANIMALES.slice(0);
  Timer: any;
  public Animal: Animals;
  public Audio = new Audio();
  constructor() {
  }
  playSound(position: number): void  {
    this.Animal = this.Animales[position];
    this.Audio.src = this.Animal.audio;
    this.Audio.load();
    this.Audio.play();
    this.Animal.reproduciendo = true;
    this.Timer = setTimeout((): void  => {
      this.Animal.reproduciendo = false;
    }, (this.Animal.duracion * 1000));

  }
  StopAudio(position: number): void {
    clearTimeout(this.Timer);
    this.Audio.pause();
    this.Audio.currentTime = 0;
    for (let x = 0; x < this.Animales.length; x++) {
      if (x === position) {
        this.Animales[position].reproduciendo = false;
        return;
      } else {
        this.Animales[x].reproduciendo = false;
      }
    }
  }
  removeItem(position: number): void {
    this.Animales.splice(position, 1);
  }
  doRefresh(event: any): void {
    setTimeout((): void => {
      this.Animales = ANIMALES.slice(0);
      event.target.complete();
    }, 2000);
  }
}
