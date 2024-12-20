import { describe, expect, it } from 'vitest';

import { isObject } from '../is-object';

describe('isObject', () => {
    it('should return true when value is an object', () => {
        expect(isObject({})).toBeTruthy();
        expect(isObject({ foo: 'bar' })).toBeTruthy();
        expect(isObject(new Blob())).toBeTruthy();
    });

    it('should return false when value is not an object or is null', () => {
        expect(isObject(null)).toBeFalsy();
        expect(isObject(undefined)).toBeFalsy();
        expect(isObject(-1)).toBeFalsy();
        expect(isObject(0)).toBeFalsy();
        expect(isObject(1)).toBeFalsy();
        expect(isObject('')).toBeFalsy();
        expect(isObject([])).toBeFalsy();
        expect(isObject(['foo', 'bar'])).toBeFalsy();
        expect(isObject(() => null)).toBeFalsy();
    });
});
