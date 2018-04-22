export class Parallex {
    public static initialise(): void {
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
}
