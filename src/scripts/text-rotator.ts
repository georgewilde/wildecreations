export class TextRotator {
    private readonly fadeSpeed: number;
    private readonly pauseSpeed: number;
    private $textItem: JQuery;
    private $rotateElement: JQuery;

    public constructor() {
        this.fadeSpeed = 300;
        this.pauseSpeed = 5000;
    }

    public initialise(): void {
        $('.text-rotate').each((rotateIndex, rotateElement): void => {
            this.$rotateElement = $(rotateElement);
            this.rotateTextItems();
        });
    }

    private getFirstTextElement(rotateElement: JQuery): JQuery {
        return rotateElement.children(':first');
    }

    private rotateTextItems(): void {
        let nextTextItem: JQuery;

        if (!this.$textItem) {
            nextTextItem = this.getFirstTextElement(this.$rotateElement);
        } else {
            nextTextItem = this.$textItem;
        }

        $(nextTextItem).fadeIn(this.fadeSpeed, (): void => {
            $(nextTextItem).delay(this.pauseSpeed).fadeOut(this.fadeSpeed, (): void => {
                this.$textItem = $(nextTextItem).next();

                if (this.$textItem.length === 0) {
                    this.$textItem = this.getFirstTextElement(this.$rotateElement);
                }

                this.rotateTextItems();
            });
        });
    }
}
