import { Animations } from './animations';
import { PageScroll } from './page-scroll';
import { Parallex } from './parallax';
import { TextRotator } from './text-rotator';

$(() => {
    Parallex.initialise();
    new TextRotator().initialise();
    new Animations().initialise();
    new PageScroll().initialise();
});
