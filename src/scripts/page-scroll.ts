export class PageScroll {
    private $pageScrollLink: JQuery = $('.page-scroll-link');
    private $window: JQuery = $(window);

    public initialise() {
        this.scrollToPage();
        this.highlightCurrentLink();
    }

    private scrollToPage(): void {
        this.$pageScrollLink.on('click', (event: any) => {
            event.preventDefault();

            const target = event.currentTarget.hash;
            const navigationOffset = ('#home' === target) ? 0 : 112;

            $('body, html').animate({
                scrollTop: $(target).offset().top + navigationOffset,
            }, 600);
        });
    }

    private highlightCurrentLink(): void {
        this.$window.on('scroll', () => {
            const scrollbarLocation = this.$window.scrollTop();

            this.$pageScrollLink.each((index: number, element: any) => {
                const pageOffset = $(element.hash).offset().top - 20;

                if (pageOffset <= scrollbarLocation) {
                    $(element).parent().addClass('active');
                    $(element).parent().siblings().removeClass('active');
                }
            });
        });
    }
}



