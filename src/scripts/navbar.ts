export class Navbar {
    private $window = $(window);
    private $navbar = $('.navbar');
    private initialNavbarHeight = this.$navbar.outerHeight();

    public initialise(): void {
        this.navbarResize();
    }

    private navbarResize(): void {
        this.$window.on('scroll', () => {
            const scrollTopPosition = this.$window.scrollTop();
            const skillsElementVerticalPosition = $('#skills').offset().top - this.initialNavbarHeight;
            const scrollPositionOffset = -1;
            const navbarSizeOffset = 10;

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

    private makeNavbarOpaque() {
        this.$navbar
            .addClass('bg-white')
            .removeClass('bg-transparent');
        $('.logo--white').addClass('transparent');
        $('.nav-link, .navbar-toggler-icon').removeClass('text-white');
    }

    private makeNavbarSmall() {
        this.$navbar.addClass('navbar--small');
    }

    private makeNavbarBigAndTransparent() {
        this.$navbar
            .removeClass('bg-white')
            .addClass('bg-transparent')
            .removeClass('navbar--small');

        $('.logo--white').removeClass('transparent');
        $('.nav-link, .navbar-toggler-icon').addClass('text-white');
    }
}
