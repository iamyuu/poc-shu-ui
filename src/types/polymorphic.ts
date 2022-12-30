// https://github.com/ohansemmanuel/polymorphic-react-component/blob/master/06.tsx

type AsProp<Element extends React.ElementType> = {
	as?: Element;
};

type PropsToOmit<Element extends React.ElementType, P> = keyof (AsProp<Element> & P);

export type PolymorphicRef<Element extends React.ElementType> = React.ComponentPropsWithRef<Element>['ref'];

export type PolymorphicComponentProps<Element extends React.ElementType, Props = {}> = React.PropsWithChildren<
	Props & AsProp<Element>
> &
	Omit<React.ComponentPropsWithoutRef<Element>, PropsToOmit<Element, Props>>;

export type PolymorphicComponentPropWithRef<Element extends React.ElementType, Props = {}> = PolymorphicComponentProps<
	Element,
	Props
> & {
	ref?: PolymorphicRef<Element>;
};
