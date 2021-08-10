// For types in the file, there is no choice but using any to insure the typescript infers types correctly

/* eslint-disable @typescript-eslint/no-explicit-any */
type UnwrapPromise<T extends Promise<any>> = T extends Promise<infer RT>
    ? RT
    : never;
/* eslint-enable @typescript-eslint/no-explicit-any */

// TODO: Constrain return variables so one and only one will be undefined
// TODO: Simply return type so it is less confusing while keep inferring working
function goify<T extends (...args: any[]) => Promise<any>>( // eslint-disable-line @typescript-eslint/no-explicit-any
    promiseFunc: T,
): (
    ...args: Parameters<T>
) => Promise<[UnwrapPromise<ReturnType<T>>, undefined] | [undefined, Error]> {
    return async (
        ...args: Parameters<T>
    ): Promise<
        [UnwrapPromise<ReturnType<T>>, undefined] | [undefined, Error]
    > => {
        try {
            const result = await promiseFunc(...args);
            return [result, undefined];
        } catch (err) {
            return [undefined, err];
        }
    };
}

export async function goCatch<T extends Promise<any>>( // eslint-disable-line @typescript-eslint/no-explicit-any
    promise: T,
): Promise<[UnwrapPromise<T>?, Error?]> {
    try {
        const result = await promise;
        return [result, undefined];
    } catch (err) {
        return [undefined, err];
    }
}

export const goFetch = goify(fetch);
