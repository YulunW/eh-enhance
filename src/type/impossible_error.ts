class ImpossibleError extends Error {
    constructor() {
        super("This should be impossible");
        this.name = "ImpossibleError";
    }
}

export const impossibleError = new ImpossibleError();
