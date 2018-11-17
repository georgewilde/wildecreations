export class PageScroll {
    private $pageScrollLink = $('.page-scroll-link');
    private $window = $(window);
    private initialNavbarHeight = $('.navbar').outerHeight();
    private smallNavbarHeight = 63;
    private scrollAnimationDuration = 400;

    public initialise() {
        this.scrollToPage();
        this.highlightCurrentLink();
    }

    private scrollToPage() {
        this.$pageScrollLink.on('click', (event: any) => {
            event.preventDefault();

            const target = event.currentTarget.hash;
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

    private highlightCurrentLink() {
        this.$window.on('scroll', () => {
            const scrollbarLocation = this.$window.scrollTop();

            this.$pageScrollLink.each((index: number, element: any) => {
                let additionalOffset: number = this.smallNavbarHeight + 100;

                if ('#skills' === element.hash) {
                    additionalOffset = this.initialNavbarHeight + 100;
                }

                const pageOffset = $(element.hash).offset().top - additionalOffset;

                if (pageOffset <= scrollbarLocation) {
                    $(element).parent().addClass('active');
                    $(element).parent().siblings().removeClass('active');
                }
            });
        });
    }
}
