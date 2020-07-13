import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms'; // template-driven
import { AlbumService } from '../album.service';
import { Album } from '../album';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Output() searchAlbums: EventEmitter<Album[]> = new EventEmitter(); // émission des données vers le parent

  constructor(private ablumService: AlbumService) { }

  ngOnInit() {}

  onSubmit(form: NgForm): void {
    const searchAlbums = this.ablumService.search(form.value['word']);
    if (searchAlbums)
      this.searchAlbums.emit(searchAlbums);
  }

}