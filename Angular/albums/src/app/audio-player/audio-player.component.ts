import { Component, OnInit } from '@angular/core';
import { AlbumService } from '../album.service';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { interval } from 'rxjs';
import { Album } from '../album';
import { ConsoleReporter } from 'jasmine';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss']
})
export class AudioPlayerComponent implements OnInit {

  ratio:number = 0
  counter:number = 1;

  songs : number = 0; // nombre de chansons
  songTime:number = 120; // chanson dure toute 2 minutes on compte en paquet de 120 secondes == 2 minutes

  showplayer : boolean = false; // afficher le player

  album : Album;
  title : string; // le titre de l'album

  listSongs : string[] = []; // la liste des chansons

  // le service doit s'injecter dans le composant et être privé
  constructor(private aS: AlbumService) {}

  ngOnInit() {

    // timer Observable qui envoit un entier toutes les minutes on met 10 au lieu de 1000 pour aller plus vide
    // dans l'affichage
    const count$ = interval(10 * 60);

    // subjectAlbum est un Subject donc réversible : Observale/Observer
    // ici on le considère comme Observable il reçoit la données pour en faire quelque chose une fois que l'on a souscrit
    // 1. On fait les pipes pour traiter l'information
    // 2. On souscrit pour récupérer la données
    const player$ = this.aS.subjectAlbum.pipe(
      // 1 pipeline ordre des pipes
      map(album => {
        this.title = album.title; // le titre de l'album

        // On récupère la liste des chansons de l'album par décomposition d'objet
        const { list }= this.aS.getAlbumList(album.id);

        this.songs = list.length; // nombre de chansons

        // on récupère la liste des chansons
        this.listSongs = list || [];

        return album;
      }),
      // 2 pipeline ordre des pipes
      // le propre du switchMap c'est de renvoyer un Observable sans effet de bord
      switchMap( album => {

        this.songs = album.duration / this.songTime;
        this.showplayer = true;

        return count$.pipe(
          map( minute => {

            console.log(minute);

            // chaque morceau de musique fait 2 minutes donc on incrémente le compteur en fonction
            if( minute > 0 && minute % 2 === 0 ) this.counter++;

            // ratio le nombre de minute(s) divisé par la durée
            return   Math.ceil( (minute  / album.duration) * 100 * 60 );

          }),
          // Opérateur qui permet de stopper un observable, il attent un observable boolean
          // takeUntil souscrit lui-même à l'observable
          takeUntil(this.aS.destroy$)
        )        
      }),
    );

    // On s'ouscrit à l'observable
    player$.subscribe( ratio => {
      this.ratio = ratio;

      console.log("test du ration", ratio);
      if( ratio >= 100 ) this.reset();
    });
  }

  reset(){
    this.showplayer = false;
    this.counter = 0;
    this.songs = 0;
    this.ratio = 0;

    this.aS.destroy$.next(true);
  }

}