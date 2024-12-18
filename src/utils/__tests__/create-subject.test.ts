import { describe, expect, it, vi } from 'vitest';

import { createSubject } from '../create-subject';

describe('createSubject', () => {
    it('should subscribe to all the correct observer', () => {
        const subject = createSubject();
        const next = vi.fn();

        subject.subscribe({
            next,
        });

        subject.subscribe({
            next,
        });

        expect(subject.observers.length).toBe(2);

        subject.next(2);

        expect(next).toBeCalledTimes(2);
        expect(next).toBeCalledWith(2);
    });

    it('should unsubscribe observers', () => {
        const subject = createSubject();
        const next1 = vi.fn();
        const next2 = vi.fn();

        const subscription = subject.subscribe({
            next: next1,
        });

        subject.subscribe({
            next: next2,
        });

        expect(subject.observers.length).toBe(2);

        subscription.unsubscribe();

        expect(subject.observers.length).toBe(1);

        subject.next(2);

        expect(next1).not.toBeCalled();
        expect(next2).toBeCalledWith(2);
    });

    it('should unsubscribe all observers', () => {
        const subject = createSubject();
        const next = vi.fn();

        subject.subscribe({
            next,
        });

        subject.subscribe({
            next,
        });

        expect(subject.observers.length).toBe(2);

        subject.unsubscribe();

        expect(subject.observers.length).toBe(0);

        subject.next(2);
        subject.next(2);

        expect(next).not.toBeCalled();
    });
});
