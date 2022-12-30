// https://github.com/vanilla-extract-css/vanilla-extract/blob/master/packages/recipes/src/types.ts

type BooleanMap<T> = T extends 'true' | 'false' ? boolean : T;

type VariantDefinitions = Record<string, string>;

export type VariantGroups = Record<string, VariantDefinitions>;

export type VariantSelection<Variants extends VariantGroups> = {
	[VariantGroup in keyof Variants]?: BooleanMap<keyof Variants[VariantGroup]>;
};
