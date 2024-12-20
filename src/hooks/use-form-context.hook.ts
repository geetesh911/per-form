import { useContext } from 'react';

import { FormContext } from '../providers';
import type { FieldValues, UseFormReturn } from '../types';

import type { useForm } from './use-form.hook';

/**
 * This custom hook allows you to access the form context. useFormContext is intended to be used in deeply nested structures, where it would become inconvenient to pass the context as a prop. To be used with {@link FormProvider}.
 *
 * @remarks
 * [API](https://per-form.com/docs/useformcontext)
 *
 * @returns return all useForm methods
 *
 * @example
 * ```tsx
 * function App() {
 *   const form = useForm();
 *   const onSubmit = data => console.log(data);
 *
 *   return (
 *     <FormProvider form={form} >
 *       <form onSubmit={methods.handleSubmit(onSubmit)}>
 *         <NestedInput />
 *         <input type="submit" />
 *       </form>
 *     </FormProvider>
 *   );
 * }
 *
 *  function NestedInput() {
 *   const { register } = useFormContext(); // retrieve all hook methods
 *   return <input {...register("test")} />;
 * }
 * ```
 */
export function useFormContext<
    TFieldValues extends FieldValues,
    TTransformedValues extends FieldValues | undefined = undefined,
>(): UseFormReturn<TFieldValues, TTransformedValues> {
    const formContext = useContext(FormContext);

    if (!formContext) {
        throw new Error('useFormContext must be used within a FormProvider');
    }

    return formContext as unknown as ReturnType<typeof useForm<TFieldValues, TTransformedValues>>;
}