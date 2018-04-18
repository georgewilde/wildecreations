import { Parallex } from './parallax';
import { TextRotator } from './text-rotator';

$(() => {
    Parallex.initialise();
    
    const textRotator = new TextRotator();
    textRotator.initialise();
});
