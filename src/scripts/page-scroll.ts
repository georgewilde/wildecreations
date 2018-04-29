export class PageScroll {
    private $pageScrollLink: JQuery = $('.page-scroll-link');
    private $window: JQuery = $(window);
    private initialNavbarHeight: number = $('.navbar').outerHeight();
    private smallNavbarHeight: number = 72;
    private scrollAnimationDuration: number = 400;

    public initialise() {
        this.scrollToPage();
        this.highlightCurrentLink();
    }

    private scrollToPage(): void {
        this.$pageScrollLink.on('click', (event: any) => {
            event.preventDefault();

            const target: string = event.currentTarget.hash;
            let navigationOffset: number;

            switch (target) {
                case '#home':
                    navigationOffset = 0;
                    break;

                case '#skills':
                    navigationOffset = this.initialNavbarHeight;
                    break;

                default:
                    navigationOffset = this.smallNavbarHeight;
                    break;
            }

            $('body, html').animate({
                scrollTop: $(target).offset().top - navigationOffset,
            }, this.scrollAnimationDuration);
        });
    }

    private highlightCurrentLink(): void {
        this.$window.on('scroll', () => {
            const scrollbarLocation = this.$window.scrollTop();

            this.$pageScrollLink.each((index: number, element: any) => {
                let navbarHeight: number = this.smallNavbarHeight;

                if ('#skills' === element.hash) {
                    navbarHeight = this.initialNavbarHeight;
                }

                const pageOffset = $(element.hash).offset().top - navbarHeight;

                if (pageOffset <= scrollbarLocation) {
                    $(element).parent().addClass('active');
                    $(element).parent().siblings().removeClass('active');
                }
            });
        });
    }
}
