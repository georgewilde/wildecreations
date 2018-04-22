export class Animations {
    private $window: JQuery = $(window);

    public initialise(): void {
        this.navbarResize();
        this.homeTitle();
    }

    private navbarResize(): void {
        this.$window.on('scroll', () => {
            if (this.$window.scrollTop() > 700) {
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
            const opacity = 1.1 - (this.$window.scrollTop() / 500);
            $('.parallax__content').css('opacity', `${opacity}`);
        });
    }
}
