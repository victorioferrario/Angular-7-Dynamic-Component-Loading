import { AppContextLoaderInjector, TypeNoDataComponent } from '@manx-services';
import { ScrollViewContext } from '../../services/scroll-view.service';
import { BehaviorSubject } from 'rxjs';
import {
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ElementRef,
  Renderer2
} from '@angular/core';
import { DynamicLoaderComponent } from '../dynamic-loader/dynamic-loader.component';
import { IDataItem } from '../../models/IDataItem';
@Component({
  selector: 'manx-image',
  template: `
    <ng-container>
      <ng-template #dynamicLoader> </ng-template>
      <img #image [class]="cssImageObs | async" />
    </ng-container>
  `,
  providers: [AppContextLoaderInjector],
  styles: [
    `
      .dynamic-image {
        width: 100%;
        display: block;
      }
      .animated-image {
        -webkit-animation-duration: 1s;
        animation-duration: 1s;
        -webkit-animation-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
        animation-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        -webkit-animation-delay: 0.2s;
        animation-delay: 0.2s;
      }
    `
  ]
})
export class DynamicImageComponent implements OnInit {
  @ViewChild('image')
  image: ElementRef;
  @ViewChild('dynamicLoader', {
    read: ViewContainerRef
  })
  loadContainer: ViewContainerRef;
  public data: IDataItem;
  protected cssImageHide = 'dynamic-image-hide';
  public cssImageObs: BehaviorSubject<string>;
  protected imagePlaceholder: HTMLImageElement;
  constructor(
    private loadBuilder: AppContextLoaderInjector,
    private renderer: Renderer2,
    public scrollContext: ScrollViewContext
  ) {
    const self = this;
    self.cssImageObs = new BehaviorSubject<string>(self.cssImageHide);
    self.cssImageObs.asObservable();
  }
  ngOnInit() {
    const self = this;
    const comp: TypeNoDataComponent = new TypeNoDataComponent(
      DynamicLoaderComponent
    );
    self.loadBuilder.createLoader(this.loadContainer, comp);
    setTimeout(() => {
      this.loadImage();
    }, 1000);
    self.scrollContext.index.subscribe((index: number) => {
      if (index === this.data.index) {
        const h = Math.floor(
          (self.scrollContext.height.value -
            self.image.nativeElement.clientHeight) /
            2
        );
        const size = h;
        this.renderer.setStyle(
          this.image.nativeElement,
          'margin-top',
          size + 'px'
        );
      }
    });
  }
  protected loadImage() {
    const self = this;
    const imageCssStart = 'dynamic-image';
    self.renderer.setAttribute(self.image.nativeElement, 'src', self.data.path);
    self.image.nativeElement.onload = () => {
      self.cssImageObs.next(
        imageCssStart + ' fadeIn animated-image animated-image-delay'
      );
      self.loadBuilder.removeLoader();
    };
  }
}
