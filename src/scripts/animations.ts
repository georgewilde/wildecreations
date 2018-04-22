export class Animations {
    private static makeNavbarTransparent(): void {
        $('.navbar')
            .addClass('bg-white')
            .removeClass('bg-transparent');
        $('.logo--white').addClass('transparent');
        $('.nav-link, .navbar-toggler-icon').removeClass('text-white');
    }

    private $window: JQuery = $(window);

    public initialise(): void {
        this.navbarResize();
        this.homeTitle();
    }

    private navbarResize(): void {
        this.$window.on('scroll', () => {
            const scrollTop = this.$window.scrollTop();

            if (scrollTop > 875) {
                $('.navbar').addClass('navbar--small');
            }

            if (scrollTop > 865) {
                Animations.makeNavbarTransparent();
            }

            if (scrollTop < 865) {
                $('.navbar')
                    .removeClass('bg-white')
                    .addClass('bg-transparent')
                    .removeClass('navbar--small');

                $('.logo--white').removeClass('transparent');
                $('.nav-link, .navbar-toggler-icon').addClass('text-white');
            }
        });
    }

    private homeTitle(): void {
        this.$window.on('scroll', () => {
            const opacity = 1.1 - (this.$window.scrollTop() / 500);
            $('.parallax__content').css('opacity', `${opacity}`);
        });
    }
}
