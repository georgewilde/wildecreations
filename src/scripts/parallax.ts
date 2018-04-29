export class Parallex {
    private $window: JQuery = $(window);

    public initialise(): void {
       this.background();
       this.content();
    }

    private background(): void {
        const $window: JQuery = $(window);
        let scrollTop: number = window.pageYOffset || document.documentElement.scrollTop;

        $window.on('scroll resize', (): void => {
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        });

        $('.parallax__background').each((index: number, element: HTMLElement): void => {
            $window.on('scroll resize', () => {
                $(element).css({transform: `translateY(-${scrollTop * 0.5}px)`});
            });
        });

        $window.trigger('scroll');
    }

    private content(): void {
        this.$window.on('scroll', () => {
            const opacity = 1.1 - (this.$window.scrollTop() / 500);

            $('.parallax__content').css('opacity', `${opacity}`);
        });
    }
}
