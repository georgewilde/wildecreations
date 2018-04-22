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

            const target: string = event.currentTarget.hash;
            let navigationOffset: number;

            switch (target) {
                case '#home':
                    navigationOffset = 0;
                    break;

                case '#skills':
                    navigationOffset = 104;
                    break;

                default:
                    navigationOffset = 72;
                    break;
            }

            $('body, html').animate({
                scrollTop: $(target).offset().top - navigationOffset,
            }, 400);
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
