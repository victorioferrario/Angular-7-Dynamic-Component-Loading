# Angular 7 Dynamic Image Loading

```
ng g library projects --name manx-services
```

The repository is an experiement in dynamically loading components into the dom. In addition, I am also using a seperate service to dynamically add to the dom a spinner control from @angular/material.

![Image of Yaktocat](image.png)

# Overview

## ScrollViewComponent

The scroll-view component is driven by a Service called `ScrollViewContext`. `ScrollViewContext` contains the data payload of images. The first properties in `ScrollViewContext` are height & width. This controls the overall dimensions of the component, and its children. Implementation in the components takes advantage of using the HostBinding decorator.

```typescript
  public height: BehaviorSubject<number>;
  public width: BehaviorSubject<string>;
```

`@HostBinding` and `@HostListener` are two decorators in Angular that can be really useful in custom directives and in components. @HostBinding lets you set properties on the element or component that hosts the directive, and @HostListener lets you listen for events on the host element or component.

```typescript
@HostBinding('style.width')
  viewWidth: string;
@HostBinding('style.height.px')
  viewHeight: number;

```

Next in `ScrollViewContext` we have an array that contains our data, and set of Observables that enable the component to set through the items array, and view the images.

```typescript
  public items: IDataItem[];
  public index: BehaviorSubject<number>;
  public hasNext: BehaviorSubject<boolean>;
  public hasPrev: BehaviorSubject<boolean>;
  public dispatch: EventEmitter<boolean>;
```

The scroll-view component works off of a payload:

```typescript
export const dataItems: IDataItem[] = [
  {
    path: serverPath + 'banner-06-1920X306.jpg',
    title: 'The elegant man',
    description: '',
    height: 306,
    index: 0
  },
  {
    path: serverPath + 'banner-05-1920X306.jpg',
    title: 'The regal begal',
    description: '',
    height: 306,
    index: 1
  },
  {
    path: serverPath + 'banner-04-1920X306.jpg',
    title: 'Some Dog',
    description: '',
    height: 306,
    index: 2
  },
  {
    path: serverPath + 'banner-03-1920X306.jpg',
    title: 'Dogs R Us',
    description: '',
    height: 306,
    index: 3
  },
  {
    path: serverPath + 'banner-02-1920x243.jpg',
    title: 'Legally dog',
    description: '',
    height: 306,
    index: 4
  },
  {
    path: serverPath + 'banner-01.jpg',
    title: 'Pupps R Us',
    description: '',
    height: 306,
    index: 5
  }
];
```

The scoll-view component template iterates through the array of items, and binds it the ui.

```html
<ul class="k-scrollview">
  <li *ngFor="let item of this.scrollContext.items; let i = index; let c = count" [item]="item" [index]="i"></li>
</ul>
<!-- These are the controls to move from image to image -->
<manx-scroll-nav></manx-scroll-nav>
```

### Important

I am overriding the native `li` element, and in the scroll-item selector.

```typescript
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'li',
  templateUrl: './scroll-item.component.html',
  styleUrls: ['./scroll-item.component.scss']
})
export class ScrollItemComponent implements OnInit {
```

The template for ScrollItemComponent is very simple:

```html
<ng-container> <ng-template #dynamicImage></ng-template></ng-container>
```

and in the ngInit method, we subscribe each individual `ScrollItemComponent`component to `ScrollViewContext` services `index` observable.

```typescript
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
  }

```

## Dynamic Loading of Components

### AppContextInjector

`projects/manx-services/src/lib/app-injector.service.ts`

The `AppContextInjector` Service removes all the verbose and complicated code of the components themselves, we just need to remeber to pass in a `ViewContainerRef`.

Initially I created a custom directive that was populating this refrenence for me and it worked really well. The challange became when I was adding a bunch of components to the dom at the same time, I needed individual instances of `ViewContainerRef`.

I also wanted to make sure this service did not need a reference to the component I was going to dynamically add to the dom, so I created the following component that also allows me to send in an interface type, to define so data that component may need.

`projects/manx-services/src/lib/models/type.component.ts`

```typescript
import { Type } from '@angular/core';
export class TypeComponent<T> {
  constructor(public component: Type<any>, public data: T) {}
}
```

The app-injector.service is available in the `ScrollViewContext`, and is called by `ScrollViewComponent` as follows:

```typescript
const image = new TypeComponent<IDataItem>(DynamicImageComponent, self.item);
self.scrollContext.appInjector.loadComponent(self.containerImage, image);
```
