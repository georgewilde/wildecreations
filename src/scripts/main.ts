import { LazyLoadImages } from './lazy-load-images';
import { Navbar } from './navbar';
import { PageScroll } from './page-scroll';
import { Parallex } from './parallax';
import { TextRotator } from './text-rotator';
import { Video } from './video';

$(() => {
    new LazyLoadImages().initialise();
    new Parallex().initialise();
    new TextRotator().initialise();
    new Navbar().initialise();
    new PageScroll().initialise();
    new Video().initialise();
});
