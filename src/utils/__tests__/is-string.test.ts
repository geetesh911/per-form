import { describe, expect, it } from 'vitest';

import { isString } from '../is-string';

describe('isString', () => {
    it('should return true when value is a string', () => {
        expect(isString('')).toBeTruthy();
        expect(isString('foobar')).toBeTruthy();
    });

    it('should return false when value is not a string', () => {
        expect(isString(null)).toBeFalsy();
        expect(isString(undefined)).toBeFalsy();
        expect(isString(-1)).toBeFalsy();
        expect(isString(0)).toBeFalsy();
        expect(isString(1)).toBeFalsy();
        expect(isString({})).toBeFalsy();
        expect(isString([])).toBeFalsy();
        expect(isString(new String('test'))).toBeFalsy();
        expect(isString(() => null)).toBeFalsy();
    });
});
