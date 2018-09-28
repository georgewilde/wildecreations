export class LazyLoadImages {
    public initialise() {
        this.lazyLoadImages();
    }

    private lazyLoadImages() {
        const imagesToLazyLoad = document.querySelectorAll('.lazy-load');
        const config = {
            rootMargin: '50px 0px',
            threshold: 0.01,
        };

        const intersectionObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.intersectionRatio > 0) {
                    observer.unobserve(entry.target);
                    this.loadImage(entry.target as HTMLImageElement);
                }
            });
        }, config);

        imagesToLazyLoad.forEach((image) => {
            intersectionObserver.observe(image);
        });
    }

    private loadImage(image: HTMLImageElement) {
        const src = image.dataset.src;

        this.fetchImage(src).then(() => {
            image.src = src;
        });
    }

    private fetchImage(url: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.src = url;
            image.onload = resolve;
            image.onerror = reject;
        });
    }
}
