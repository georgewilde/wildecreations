export class Parallex {
    private $window = $(window);

    public initialise() {
       this.background();
       this.content();
    }

    private background() {
        const $window = $(window);
        let scrollTop: number = window.pageYOffset || document.documentElement.scrollTop;

        $window.on('scroll resize', () => {
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        });

        $('#parallaxBackground').each((index: number, element: HTMLElement) => {
            $window.on('scroll resize', () => {
                $(element).css({transform: `translateY(-${scrollTop * 0.5}px)`});
            });
        });

        $window.trigger('scroll');
    }

    private content() {
        this.$window.on('scroll', () => {
            const opacity = 1.1 - (this.$window.scrollTop() / 500);

            $('.parallax__content').css('opacity', `${opacity}`);
        });
    }
}
