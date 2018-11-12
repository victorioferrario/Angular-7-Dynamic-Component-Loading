import {
  Component,
  OnInit,
  HostBinding,
  Input,
  ViewContainerRef,
  ViewChild
} from '@angular/core';
import { IDataItem } from '../../../models/IDataItem';
import { TypeComponent } from '@manx-services';
import { DynamicImageComponent } from '../../dynamic-image/dynamic-image.component';
import { ScrollViewContext } from '../../../services/scroll-view.service';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'li',
  templateUrl: './scroll-item.component.html',
  styleUrls: ['./scroll-item.component.scss']
})
export class ScrollItemComponent implements OnInit {
  @ViewChild('dynamicImage', {
    read: ViewContainerRef
  })
  containerImage: ViewContainerRef;
  @Input()
  item: IDataItem;
  @Input()
  index: number;
  @HostBinding('style.width')
  viewWidth: string;
  @HostBinding('style.height.px')
  viewHeight: number;
  @HostBinding('style.transform')
  transform: string;
  constructor(public scrollContext: ScrollViewContext) {}
  ngOnInit() {
    const self = this;
    const tx = self.index === 0 ? 0 : 101;
    self.transform = 'translateX(' + tx + '%)';
    self.viewWidth = self.scrollContext.width.value;
    self.viewHeight = self.scrollContext.height.value;
    self.scrollContext.index.subscribe((index: number) => {
      if (index === self.index) {
        self.transform = 'translateX(' + 0 + '%)';
      } else {
        self.transform =
          index > self.index ? 'translateX(-100%)' : 'translateX(100%)';
      }
    });
    const image = new TypeComponent<IDataItem>(
      DynamicImageComponent,
      self.item
    );
    self.scrollContext.appInjector.loadComponent(self.containerImage, image);
  }
}
