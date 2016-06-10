module app.meldgraphics {
  
  export interface meldgraphicsModel {
    showNav: boolean;
    lang: string;
    scrollTopValue: number;
    scrollDurationValue: number;
    scrollOffset: number;
    features: any;
    toggleNav(): void;
    scrollTop(duration: string): void;
    scrollToSection(elementSelector: string): void
  }

  export class meldgraphicsCtrl implements meldgraphicsModel {

    static $inject = ['$window', '$document', '$rootScope', '$timeout', '$location'];
    constructor(
      private $window: ng.IWindowService,
      private $document: ng.IDocumentService,
      private $rootScope: ng.IRootScopeService,
      private $timeout: ng.ITimeoutService,
      private $location: ng.ILocationService,
      public showNav: boolean = false,
      public lang: string,
      public features: any,
      public scrollTopValue: number = 0,
      public scrollDurationValue: number = 2000,
      public scrollOffset: number = 70) {

      angular.element(this.$window).bind("resize", () => {
        if (this.$window.innerWidth > 768) this.showNav = false;
      });

    }

    getUrlPath():string {
      return this.$location.path().substring(3);
    }

    setLang(lang): string {
      return this.lang = lang;
    }

    toggleNav(): void {
      this.showNav = !this.showNav;
    }

    scrollTop(duration: number = this.scrollDurationValue): void {
      this.$document.scrollTop(this.scrollTopValue, duration);
    }

    scrollToSection(elementSelector: string): void {
      this.$timeout(() => {
        let scrollOffset = this.$document[0].querySelector('.nav').offsetHeight - 10;
        let targetElement = this.$document[0].querySelector(elementSelector);
        this.$document.scrollToElement(targetElement, scrollOffset, this.scrollDurationValue / 2);
        this.$rootScope.activeSectionClass = elementSelector;
      }, 10);
    }
  }
  
  angular
    .module('meldgraphics')
    .controller('meldgraphicsCtrl',
                 meldgraphicsCtrl);
}