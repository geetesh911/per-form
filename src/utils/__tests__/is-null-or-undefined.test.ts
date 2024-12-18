import { describe, expect, it } from 'vitest';

import { isNullOrUndefined } from '../is-null-or-undefined';

describe('isNullOrUndefined', () => {
    it('should return true when object is null or undefined', () => {
        expect(isNullOrUndefined(null)).toBeTruthy();
        expect(isNullOrUndefined(undefined)).toBeTruthy();
    });

    it('should return false when object is neither null nor undefined', () => {
        expect(isNullOrUndefined(-1)).toBeFalsy();
        expect(isNullOrUndefined(0)).toBeFalsy();
        expect(isNullOrUndefined(1)).toBeFalsy();
        expect(isNullOrUndefined('')).toBeFalsy();
        expect(isNullOrUndefined({})).toBeFalsy();
        expect(isNullOrUndefined([])).toBeFalsy();
    });
});
