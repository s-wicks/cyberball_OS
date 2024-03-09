
function defaultExceptionHandler(e: unknown, callbackIdentifier: string) {
    console.error(`default CallbackList exception handler, callbackIdentifier: ${callbackIdentifier}`);
    console.error(e);
}

/**
 * CallbackList is intended to be a very simple tool to facilitate calling 
 * multiple callback functions from a single location.
 * 
 * Callbacks are called in order of insertion.
 * Both sync and async functions are supported.
 * Every functions has a unique string identifier.
 * Exception are contained and dispatch a callback that gets the exception and callback identifier.
 * If no exception handler is supplied on construction, CallbackList defaults to logging.
 */
export default class CallbackList<CallbackArgs extends unknown[]> {
    private callbacks: Map<string, (...args: CallbackArgs) => void | Promise<void>> = new Map();
    /**
     * @param exceptionHandler Called when a function throws or a promise is rejected.
     */
    public exceptionHandler: (e: unknown, callbackIdentifier: string) => void;
    
    /**
     * @param exceptionHandler Called when a function throws or a promise is rejected.
     */
    constructor(exceptionHandler: (e: unknown, callbackIdentifier: string) => void = defaultExceptionHandler) {
        this.exceptionHandler = exceptionHandler;
    }

    /**
     * Adds a callback which is called when runCallbacks is called.
     * If a callback with the same identifier already exists, this function will not add the new callback
     * @param identifier A unique identifier used to identify this callback
     * @param callback The callback to add
     * @returns If the callback was added
     */
    public addCallback(identifier: string, callback: (...args: CallbackArgs) => void | Promise<void>): boolean {
        if (this.callbacks.has(identifier)) {
            return false;
        }
        this.callbacks.set(identifier, callback);
        return true;
    }

    /**
     * Removes a callback. The callback will no longer be called when runCallbacks is called.
     * @param identifier The identifier for the callback.
     * @returns If the callback was removed, it could fail if callback was already removed or never existed
     */
    public removeCallback(identifier: string): boolean {
        return this.callbacks.delete(identifier);
    }


    /**
     * This method will call every callback in insertion order.
     * Async function are allowed to run concurrently.
     * The promise will resolve when every async function settles.
     * If a callback throws or a promise is rejected, it will be caught and call exceptionHandler, continuing to call other callbacks.
     * @param args The arguments to pass to the callback functions
     */
    public async runCallbacks(...args: CallbackArgs): Promise<void> {
        const promises: Array<Promise<void>> = [];
        for (const [identifier, callback] of this.callbacks) {
            try {
                const result = callback(...args);
                if (result) {
                    promises.push(result.catch((e: unknown) => this.exceptionHandler(e, identifier)));
                }
            } catch (e: unknown) {
                this.exceptionHandler(e, identifier);
            }
        }
        await Promise.all(promises);
    }

    /**
     * This method will call every callback in insertion order.
     * Every callback will be awaited in order, this means it is possible for a non-async callback to wait on async functions before executing.
     * If a callback throws or a promise is rejected, it will be caught and call exceptionHandler, continuing to call other callbacks.
     * @param args The arguments to pass to the callback functions
     */
    public async runCallbacksBlocking(...args: CallbackArgs): Promise<void> {
        for (const [identifier, callback] of this.callbacks) {
            try {
                await callback(...args);
            } catch (e: unknown) {
                this.exceptionHandler(e, identifier);
            }
        }
    }

    /**
     * Calls runCallbacks after the specified delay 
     * @param delayMs The amount of delay before running callbacks
     * @param args The arguments to pass to the callback functions
     */
    public runCallbacksDeferred(delayMs: number, ...args: CallbackArgs): void {
        setTimeout(() => {
            this.runCallbacks(...args);
        }, delayMs);
    }
}
