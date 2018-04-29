export class Navbar {
    private $window: JQuery = $(window);
    private $navbar: JQuery = $('.navbar');
    private initialNavbarHeight: number = this.$navbar.outerHeight();

    public initialise(): void {
        this.navbarResize();
    }

    private navbarResize(): void {
        this.$window.on('scroll', () => {
            const scrollTopPosition: number = this.$window.scrollTop();
            const skillsElementVerticalPosition: number = $('#skills').offset().top - this.initialNavbarHeight;
            const scrollPositionOffset: number = -1;
            const navbarSizeOffset: number = 10;

            if (scrollTopPosition + scrollPositionOffset <= skillsElementVerticalPosition) {
                this.makeNavbarBigAndTransparent();
            }

            if (scrollTopPosition + scrollPositionOffset > skillsElementVerticalPosition) {
                this.makeNavbarOpaque();
            }

            if (scrollTopPosition + scrollPositionOffset > skillsElementVerticalPosition + navbarSizeOffset) {
                this.makeNavbarSmall();
            }
        });
    }

    private makeNavbarOpaque(): void {
        this.$navbar
            .addClass('bg-white')
            .removeClass('bg-transparent');
        $('.logo--white').addClass('transparent');
        $('.nav-link, .navbar-toggler-icon').removeClass('text-white');
    }

    private makeNavbarSmall(): void {
        this.$navbar.addClass('navbar--small');
    }

    private makeNavbarBigAndTransparent(): void {
        this.$navbar
            .removeClass('bg-white')
            .addClass('bg-transparent')
            .removeClass('navbar--small');

        $('.logo--white').removeClass('transparent');
        $('.nav-link, .navbar-toggler-icon').addClass('text-white');
    }
}
