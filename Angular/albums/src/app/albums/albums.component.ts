import { Component, OnInit } from '@angular/core';
import { Album } from '../album';
import { ALBUMS } from '../mock-albums';
import { AlbumService } from '../album.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss'],
})
export class AlbumsComponent implements OnInit {

  titlePage: string = "Page princiaple Albums Music";
  albums: Album[] = ALBUMS;
  selectedAlbum : Album;
  pos : number;
  status: string = null; // pour gérer l'affichage des caractères [play] 

  constructor(private aS: AlbumService) {}

  ngOnInit() {
    this.albums = this.aS.paginate(
      0,
      this.aS.paginateNumberPage()
      );

  }

  onSelect(album: Album) {
    this.selectedAlbum = album;
  }

  // event de l'enfant dans la variable $event un album 
  playParent($event){
    this.status = $event.id; // identifiant unique

    this.aS.switchOn($event);
  }

  search($event) {
    if ($event) this.albums = $event;
  }

  // mise à jour de la pagination
  paginate($event) {
    this.albums = this.aS.paginate($event.start, $event.end);
  }
}
