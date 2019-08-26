export class Navbar {
  private static getViewportWidth(): number {
    return Math.max(
      document.documentElement.clientWidth,
      document.documentElement.offsetWidth,
      document.documentElement.scrollWidth,
    );
  }

  private readonly widthToShowDesktopMenu = 768;
  private readonly scrollPositionOffset = -1;
  private readonly navbarSizeOffset = 10;

  private $window = $(window);
  private $navbar = $('.navbar');
  private $navbarToggler = $('.navbar-toggler');
  private $navbarCollapse = $('.navbar-collapse');
  private $navLink = $('.nav-link');

  public initialise() {
    this.$window.on('scroll load resize', () => {
      this.resizeNavbar();
    });

    this.$navbarToggler.on('click', () => {
      this.toggleMenu();
    });

    this.$navLink.on('click', () => {
      this.collapseMenu();
    });
  }

  private resizeNavbar() {
    const scrollTopPosition = this.$window.scrollTop();
    const initialNavbarHeight = this.$navbar.outerHeight() - this.$navbarCollapse.outerHeight();
    const skillsElementVerticalPosition = $('#skills').offset().top - initialNavbarHeight;
    const menuIsCollapsed = this.$navbarToggler.hasClass('collapsed');

    const viewportWidth = Navbar.getViewportWidth();

    if (scrollTopPosition + this.scrollPositionOffset <= skillsElementVerticalPosition && menuIsCollapsed) {
      this.makeNavbarBigAndTransparent();
    }

    if (scrollTopPosition + this.scrollPositionOffset > skillsElementVerticalPosition) {
      this.makeNavbarOpaque();
    }

    if (
      (
        scrollTopPosition + this.scrollPositionOffset >
        skillsElementVerticalPosition + this.navbarSizeOffset
      ) &&
      (viewportWidth >= this.widthToShowDesktopMenu)
    ) {
      this.makeNavbarSmall();
    }
  }

  private toggleMenu() {
    const viewportWidth = Navbar.getViewportWidth();
    const goingToShowMenu = this.$navbarToggler.hasClass('collapsed');
    const scrollTopPosition = this.$window.scrollTop();
    const initialNavbarHeight = this.$navbar.outerHeight() - this.$navbarCollapse.outerHeight();
    const skillsElementVerticalPosition = $('#skills').offset().top - initialNavbarHeight;

    if (viewportWidth < this.widthToShowDesktopMenu) {
      if (goingToShowMenu) {
        this.makeNavbarOpaque();
      } else {
        if (scrollTopPosition + this.scrollPositionOffset <= skillsElementVerticalPosition) {
          console.log('makeNavbarBigAndTransparent');
          this.makeNavbarBigAndTransparent();
        }
      }
    }
  }

  private collapseMenu() {
    const menuIsCollapsed = this.$navbarToggler.hasClass('collapsed');
    const $navbarCollapse = $('.navbar-collapse') as any;

    if (!menuIsCollapsed) {
      this.toggleMenu();
      $navbarCollapse.collapse('hide');
    }
  }

  private makeNavbarOpaque() {
    this.$navbar
      .addClass('bg-white')
      .removeClass('bg-transparent');
    $('.logo--white').addClass('transparent');
    $('.logo--color').removeClass('transparent');
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
    $('.logo--color').addClass('transparent');
    $('.nav-link, .navbar-toggler-icon').addClass('text-white');
  }
}
