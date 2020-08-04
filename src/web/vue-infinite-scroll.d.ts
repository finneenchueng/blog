interface InfiniteScrollStatic {
    // new(layer: any, options?: FastClickOptions): FastClickObject;
    // attach(layer: any, options?: FastClickOptions): FastClickObject;
    bind: () => void;
    unbind: () => void;
    install: () => void;
}
declare module "vue-infinite-scroll" {
    namespace infiniteScroll {
        var InfiniteScroll: InfiniteScrollStatic;
    }

    export = infiniteScroll;
}

declare var InfiniteScroll: InfiniteScrollStatic;