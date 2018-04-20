import { Animations } from './animations';
import { Parallex } from './parallax';
import { TextRotator } from './text-rotator';

$(() => {
    Parallex.initialise();
    new TextRotator().initialise();
    new Animations().initialise();
});
