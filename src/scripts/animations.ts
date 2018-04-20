export class Animations {
    private $window: JQuery = $(window);

    public initialise(): void {
        this.navbarScroll();
        this.homeTitle();
    }

    private navbarScroll(): void {
        this.$window.on('scroll', () => {
            if (this.$window.scrollTop() > 300) {
                $('.navbar')
                    .addClass('bg-white')
                    .removeClass('bg-transparent')
                    .addClass('navbar--small');

                $('.logo--white').addClass('transparent');
                $('.nav-link, .navbar-toggler-icon').removeClass('text-white');
            } else {
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
            if (this.$window.scrollTop() > 300) {
                $('.home__intro__text').addClass('fadeOut');
            } else {
                $('.home__intro__text').removeClass('fadeOut');
            }
        });
    }
}
