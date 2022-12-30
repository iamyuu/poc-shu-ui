import type { VariantSelection, VariantGroups } from './types/variant';

export type ReceipeOptions<Variants extends VariantGroups> = {
	base: string;
	variants: Variants;
	defaultVariants: VariantSelection<Variants>;
};

export function createReceipe<Variants extends VariantGroups>(recipe: Partial<ReceipeOptions<Variants>>) {
	const variants = recipe.variants || ({} as Variants);

	return function generateClasses(selection?: VariantSelection<typeof variants>, additional?: string) {
		const variantClasses = Object.entries({ ...recipe.defaultVariants, ...selection }).reduce(
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

		return [additional, recipe.base, variantClasses].join(' ');
	};
}
