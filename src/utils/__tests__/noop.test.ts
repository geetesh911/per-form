import { describe, expect, it } from 'vitest';

import { noop } from '../noop';

describe('noop', () => {
    it('should be a function', () => {
        expect(noop instanceof Function).toBeTruthy();
    });

    it('should return undefined', () => {
        const result = noop();

        expect(result).toBeUndefined();
    });
});
