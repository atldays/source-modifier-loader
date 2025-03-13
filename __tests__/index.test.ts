import type { LoaderContext } from 'webpack';
import sourceModifierLoader from '../src/index';

describe('sourceModifierLoader', () => {
    const resourcePath = '/path/to/file.scss';

    const createLoaderContext = (options: any = {}): LoaderContext<any> => ({
        getOptions: () => options,
        resourcePath,
    } as unknown as LoaderContext<any>);

    const originalSource = '.test { color: blue; }';

    test('returns original source if no modify function provided', () => {
        const ctx = createLoaderContext();
        const result = sourceModifierLoader.call(ctx, originalSource);
        expect(result).toBe(originalSource);
    });

    test('returns original source if modify function returns undefined', () => {
        const ctx = createLoaderContext({
            modify: () => undefined,
        });
        const result = sourceModifierLoader.call(ctx, originalSource);
        expect(result).toBe(originalSource);
    });

    test('returns original source if modify function returns null', () => {
        const ctx = createLoaderContext({
            modify: () => null,
        });
        const result = sourceModifierLoader.call(ctx, originalSource);
        expect(result).toBe(originalSource);
    });

    test('correctly modifies source if modify function returns string', () => {
        const modifiedSource = `${originalSource}\n.additional-class { color: red; }`;

        const ctx = createLoaderContext({
            modify: (source: string, path: string) => {
                expect(source).toBe(originalSource);
                expect(path).toBe(resourcePath);
                return modifiedSource;
            },
        });

        const result = sourceModifierLoader.call(ctx, originalSource);
        expect(result).toBe(modifiedSource);
    });

    test('modify function receives correct arguments', () => {
        const mockModify = jest.fn(() => null);
        const ctx = createLoaderContext({ modify: mockModify });

        sourceModifierLoader.call(ctx, originalSource);

        expect(mockModify).toHaveBeenCalledWith(originalSource, resourcePath);
    });

    test('throws error if modify function throws an error', () => {
        const ctx = createLoaderContext({
            modify: () => { throw new Error('Modification Error'); },
        });

        expect(() => {
            sourceModifierLoader.call(ctx, originalSource);
        }).toThrow('Modification Error');
    });
});