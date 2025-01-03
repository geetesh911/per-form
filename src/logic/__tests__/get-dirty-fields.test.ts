import { describe, expect, it } from 'vitest';

import { getDirtyFields } from '../get-dirty-fields';

describe('getDirtyFields', () => {
    it('should return all the dirty fields', () => {
        expect(
            getDirtyFields(
                {},
                {
                    test: {
                        test1: 'bill',
                        test2: 'luo',
                    },
                    test1: ['1', '2', '3'],
                    test2: [
                        {
                            test1: 'bill',
                            test2: 'luo',
                        },
                    ],
                },
            ),
        ).toEqual({
            test: {
                test1: true,
                test2: true,
            },
            test1: [true, true, true],
            test2: [
                {
                    test1: true,
                    test2: true,
                },
            ],
        });

        expect(
            getDirtyFields(
                {
                    test: {
                        test1: '',
                        test2: 'luo',
                    },
                    test1: ['1'],
                    test2: [
                        {
                            test1: 'bill',
                            test2: '',
                        },
                    ],
                },
                {
                    test: {
                        test1: 'bill',
                        test2: 'luo',
                    },
                    test1: ['1', '2', '3'],
                    test2: [
                        {
                            test1: 'bill',
                            test2: 'luo',
                        },
                    ],
                },
            ),
        ).toEqual({
            test: {
                test1: true,
                test2: false,
            },
            test1: [false, true, true],
            test2: [
                {
                    test1: false,
                    test2: true,
                },
            ],
        });
    });

    it('should set correctly dirty', () => {
        expect(
            getDirtyFields(
                {
                    test: [{ data: 'bill' }, { data: 'luo', data1: 'luo1' }],
                },
                {
                    test: [{ data: 'bill1' }, { data: 'luo2' }],
                },
            ),
        ).toEqual({
            test: [
                {
                    data: true,
                },
                {
                    data: true,
                    data1: true,
                },
            ],
        });
    });

    it('should not set dirtyFields fields for nested input data which are deep equal', () => {
        expect(
            getDirtyFields(
                { test: [{ data: 'luo', data1: 'luo1' }] },
                { test: [{ data: 'luo', data1: 'luo1' }] },
            ),
        ).toEqual({ test: [{ data: false, data1: false }] });
    });

    it('should unset dirtyFields fields when value matches', () => {
        expect(
            getDirtyFields(
                { test: [{ data: 'bill' }, { data: 'luo2', data1: 'luo1' }] },
                { test: [{ data: 'bill1' }, { data: 'luo2' }] },
            ),
        ).toEqual({ test: [{ data: true }, { data: false, data1: true }] });
    });

    it('should works in reverse dirtyFields fields check', () => {
        expect(
            getDirtyFields(
                { test: [{ data: 'bill1' }, { data: 'luo2' }] },
                { test: [{ data: 'bill' }, { data: 'luo', data1: 'luo1' }] },
            ),
        ).toEqual({ test: [{ data: true }, { data: true, data1: true }] });

        expect(
            getDirtyFields(
                { test: [{ data: 'bill1' }, { data: 'luo2' }] },
                { test: [{ data: 'bill' }, { data: 'luo2', data1: 'luo1' }] },
            ),
        ).toEqual({ test: [{ data: true }, { data: false, data1: true }] });
    });

    it('should work for empty values compare with defaultValues', () => {
        expect(
            getDirtyFields(
                { test: [] },
                { test: [{ data: 'bill' }, { data: 'luo2', data1: 'luo1' }] },
            ),
        ).toEqual({
            test: [
                {
                    data: true,
                },
                {
                    data: true,
                    data1: true,
                },
            ],
        });
    });

    it('should set correctly with nested dirty', () => {
        expect(
            getDirtyFields(
                {
                    test: [
                        { data: 'bill' },
                        {
                            data: 'luo',
                            data1: 'luo1',
                            nested: [{ data: 'luo', data1: 'luo1' }],
                            nested1: [{ data: 'luo', data1: 'luo1' }],
                        },
                    ],
                },
                { test: [{ data: 'bill1' }, { data: 'luo2' }] },
            ),
        ).toEqual({
            test: [
                {
                    data: true,
                },
                {
                    data: true,
                    data1: true,
                    nested: [{ data: true, data1: true }],
                    nested1: [{ data: true, data1: true }],
                },
            ],
        });
    });

    it('should keep nested dirtyFields fields when value matches', () => {
        expect(
            getDirtyFields(
                {
                    test: [
                        { data: 'bill' },
                        {
                            data: 'luo',
                            data1: 'luo1',
                            nested: [{ data: 'luo', data1: 'luo1' }],
                            nested1: [{ data: 'luo', data1: 'luo1' }],
                        },
                    ],
                },
                {
                    test: [
                        { data: 'bill1' },
                        {
                            data: 'luo2',
                            data1: 'luo1',
                            nested: [{ data: 'luo', data1: 'luo1' }],
                        },
                    ],
                },
            ),
        ).toEqual({
            test: [
                {
                    data: true,
                },
                {
                    data: true,
                    data1: false,
                    nested: [{ data: false, data1: false }],
                    nested1: [{ data: true, data1: true }],
                },
            ],
        });
    });

    it('should reset dirtyFields fields', () => {
        expect(getDirtyFields({ test: [{ data: 'bill' }] }, { test: [{ data: 'bill' }] })).toEqual({
            test: [{ data: false }],
        });
    });

    it('should reset dirtyFields fields', () => {
        expect(
            getDirtyFields(
                {
                    test: [
                        {
                            test1: 'test',
                            test: [
                                {
                                    test: 'test1',
                                },
                            ],
                        },
                    ],
                },
                {
                    test: [
                        {
                            test1: 'test1',
                            test: null,
                        },

                        {
                            test1: 'test',
                            test: [
                                {
                                    test: 'test1',
                                },
                            ],
                        },
                    ],
                },
            ),
        ).toEqual({
            test: [
                {
                    test: [
                        {
                            test: true,
                        },
                    ],
                    test1: true,
                },
                {
                    test: [
                        {
                            test: true,
                        },
                    ],
                    test1: true,
                },
            ],
        });
    });

    it('should work out with different data type', () => {
        expect(
            getDirtyFields(
                {
                    test: [
                        {
                            test1: 'test',
                            test: [
                                {
                                    test: 'test1',
                                },
                            ],
                        },
                    ],
                },
                {
                    test: [
                        {
                            test1: 'test1',
                            test: true,
                        },
                        {
                            test1: 'test',
                            test: [
                                {
                                    test: 'test1',
                                },
                            ],
                        },
                    ],
                },
            ),
        ).toEqual({
            test: [
                {
                    test: [
                        {
                            test: true,
                        },
                    ],
                    test1: true,
                },
                {
                    test: [
                        {
                            test: true,
                        },
                    ],
                    test1: true,
                },
            ],
        });
    });

    it('should properly spread nested objects when marking fields dirty', () => {
        expect(
            getDirtyFields(
                {
                    nested: {
                        obj1: {
                            field1: 'value1',
                            field2: 'value2',
                        },
                        obj2: {
                            field3: 'value3',
                        },
                    },
                },
                {
                    nested: {
                        obj1: {
                            field1: 'different1',
                            field2: 'value2',
                        },
                        obj2: {
                            field3: 'different3',
                        },
                    },
                },
            ),
        ).toEqual({
            nested: {
                obj1: {
                    field1: true,
                    field2: false,
                },
                obj2: {
                    field3: true,
                },
            },
        });
    });
});
