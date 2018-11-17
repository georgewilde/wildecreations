export class Video {
    private $video = $('#backgroundVideo') as JQuery<HTMLVideoElement>;
    private $pauseButton = $('#pauseButton');
    private $playButton = $('#playButton');

    public initialise() {
        this.addVideoControls();
    }

    private addVideoControls() {
        this.$pauseButton.on('click', () => {
            this.$video.get(0).pause();
            this.$playButton.removeClass('hidden');
            this.$pauseButton.addClass('hidden');
        });

        this.$playButton.on('click', () => {
            this.$video.get(0).play();
            this.$playButton.addClass('hidden');
            this.$pauseButton.removeClass('hidden');
        });
    }
}
