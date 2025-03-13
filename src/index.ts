import type {LoaderContext} from 'webpack';

type LoaderModifyFunction = (source: string, resourcePath: string) => string | void | null | undefined;

interface LoaderOptions {
    modify?: LoaderModifyFunction;
}

export default function sourceModifierLoader(
    this: LoaderContext<LoaderOptions>,
    source: string
): string {
    const {modify} = this.getOptions() || {};
    const resourcePath = this.resourcePath;

    if (typeof modify !== 'function') {
        return source;
    }

    const result = modify(source, resourcePath);

    return typeof result === 'string' ? result : source;
}