import { Component, Listen, Prop } from '@stencil/core';
import { RouterSegments, generateURL, parseURL, readNavState, writeNavState } from './router-utils';

/**
  * @name RouterController
  * @module ionic
  * @description
 */
@Component({
  tag: 'ion-router-controller'
})
export class RouterController {

  private busy = false;
  private enabled = false;

  @Prop() fragment: boolean = true;

  // TODO
  @Prop() base: string;

  constructor() {
    this.enabled = Context.useRouter === true;
  }

  protected ionViewDidLoad() {
    Context.dom.raf(() => {
      console.debug('[OUT] page load -> write nav state');
      this.writeNavStateRoot();
    });
  }

  @Listen('window:hashchange')
  protected onURLHashChanged() {
    if (!this.isBlocked()) {
      console.debug('[OUT] hash changed -> write nav state');
      this.writeNavStateRoot();
    }
  }

  @Listen('body:ionNavChanged')
  protected onNavChanged(ev: CustomEvent) {
    if (this.isBlocked()) {
      return;
    }
    console.debug('[IN] nav changed -> update URL');
    const { stack, pivot } = this.readNavState();
    if (pivot) {
      // readNavState() found a pivot that is not initialized
      console.debug('[IN] pivot uninitialized -> write partial nav state');
      this.writeNavState(pivot, []);
    }

    this.setURL(generateURL(stack), ev.detail.isPop === true);
  }

  private setURL(url: string, isPop: boolean) {
    const history = window.history;
    if (isPop) {
      history.back();
      history.replaceState(null, null, url);
    } else {
      history.pushState(null, null, url);
    }
  }

  private isBlocked(): boolean {
    return this.busy || !this.enabled;
  }

  private writeNavStateRoot(): Promise<any> {
    const node = document.querySelector('ion-app') as HTMLElement;
    return this.writeNavState(node, this.readURL());
  }

  private writeNavState(node: HTMLElement, url: string[]): Promise<any> {
    const segments = new RouterSegments(url);
    this.busy = true; //  prevents reentrance
    return writeNavState(node, segments)
      .catch(err => console.error(err))
      .then(() => this.busy = false);
  }

  private readNavState() {
    let root = document.querySelector('ion-app') as HTMLElement;
    return readNavState(root);
  }

  private readURL(): string[] {
    let url: string;
    if (this.fragment) {
      url = window.location.hash.substr(1);
    } else {
      url = window.location.pathname;
    }
    return parseURL(url);
  }
}
