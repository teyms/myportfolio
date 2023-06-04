import { Component } from '@angular/core';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'myportfolio';

  showHeader: boolean = true;
  showFooter: boolean = true;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private metaTagService: Meta
  ) { 
    
  }

  ngOnInit(): void {
    this.addSeoTag();

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: any) => {
      // if(event !== undefined && event.url === '/video/embed'){
      if(event !== undefined && (event.url).includes('/video/embed')){
        this.showHeader = false;
        this.showFooter = false;
      }
    });

  }

  addSeoTag(){
    //https://stackoverflow.com/questions/40662802/how-to-get-data-from-route-or-activatedroute-when-subscribing-to-router-events-s
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
    ).subscribe(() => {

      var rt = this.getChild(this.activatedRoute);

      // this.activatedRoute.data.subscribe(data => {
      rt.data.subscribe(data => {
        // console.log('datadata');
        // console.log(data);
        
        if(data['title'] !== undefined){
          this.titleService.setTitle(data['title']);
        }

        if(data['description'] !== undefined){
          this.metaTagService.updateTag({ name: 'description', content: data['description'] });
        } else{
          this.metaTagService.removeTag("name='description'");
        }

        if(data['robots'] !== undefined){
          this.metaTagService.updateTag({ name: 'robots', content: data['robots'] });
        } else{
          this.metaTagService.updateTag({ name: 'robots', content: "follow,index" });
        }

        // if (data['ogUrl'] !== undefined) {
        //   this.metaTagService.updateTag({ property: 'og:url', content: data['ogUrl'] });
        // } else {
        //   this.metaTagService.updateTag({ property: 'og:url', content: this.router.url });
        // }

        if (data['og_title'] !== undefined) {
          this.metaTagService.updateTag({ property: 'og:title', content: data['og_title'] });
        } else {
          this.metaTagService.removeTag("property='og:title'");
        }

        if (data['og_description'] !== undefined) {
          this.metaTagService.updateTag({ property: 'og:description', content: data['og_description'] });
        } else {
          this.metaTagService.removeTag("property='og:description'");
        }

        // if (data['ogImage'] !== undefined) {
        //   this.metaTagService.updateTag({ property: 'og:image', content: data['ogImage'] });
        // } else {
        //   this.metaTagService.removeTag("property='og:image'");
        // }

        
      });

    });

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

  private getChild(activatedRoute: ActivatedRoute): ActivatedRoute {
    if (activatedRoute.firstChild) {
      return this.getChild(activatedRoute.firstChild);
    } else {
      return activatedRoute;
    }
 
  }

}
