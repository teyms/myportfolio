import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    
    constructor(
      private metaTagService: Meta,
    ) { }

  ngOnInit(): void {
    // this.metaTagService.addTags([
    //   {
    //     name: 'keywords',
    //     content: 'Angular SEO Integration, Music CRUD, Angular Universal',
    //   },
    //   { name: 'robots', content: 'index, follow' },
    //   { name: 'author', content: 'Digamber Singh' },
    //   { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    //   { name: 'date', content: '2019-10-31', scheme: 'YYYY-MM-DD' },
    //   { charset: 'UTF-8' },
    // ]);
  }

}
