import { forwardRef, createElement } from 'react';
import type { VariantSelection, VariantGroups } from './types/variant';
import type { PolymorphicComponentPropWithRef, PolymorphicRef } from './types/polymorphic';

export type ReceipeOptions<Variants extends VariantGroups> = {
	base: string;
	variants: Variants;
	defaultVariants: VariantSelection<Variants>;
};

export function createReceipe<Element extends React.ElementType, Variants extends VariantGroups>(
	element: Element,
	recipe: Partial<ReceipeOptions<Variants>>,
) {
	const variants = recipe.variants || ({} as Variants);

	type ComponentProps = PolymorphicComponentPropWithRef<Element, VariantSelection<typeof variants>>;

	const Component = forwardRef(({ as, className, ...props }: ComponentProps, ref: PolymorphicRef<Element>) => {
		// filter props that are valid HTML attributes
		const htmlProps = Object.entries(props).reduce((prev, [propsKey, propsValue]) => {
			if (propsKey in variants) {
				return prev;
			}

			return {
				...prev,
				[propsKey]: propsValue,
			};
		}, {});

		// generate classes based on the variants
		const variantClasses = Object.entries({ ...recipe.defaultVariants, ...props }).reduce(
			(prev, [variantKey, variantValue]) => {
				const hasVariant = variantKey in variants;

				if (!hasVariant) {
					return prev;
				}

				const classNameVariant = variants[variantKey][variantValue as string];

				return prev ? [prev, classNameVariant].join(' ') : classNameVariant;
			},
			'',
		);

		return createElement(as || element, {
			...htmlProps,
			ref,
			className: [className, recipe.base, variantClasses].join(' '),
		});
	});

	return Component;
}
