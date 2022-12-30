import { createReceipe } from './receipe';

const buttonReceipe = createReceipe({
	base: 'font-sans',

	variants: {
		size: {
			small: `text-sm px-3`,
			medium: `text-md px-4`,
			large: `text-lg px-6`,
		},
		variant: {
			solid: `text-white bg-blue-500 hover:bg-blue-600`,
			outline: `text-blue-500 hover:bg-blue-100 border border-blue-500`,
			ghost: `text-blue-500 hover:bg-blue-100`,
		},
		rounded: {
			true: 'rounded',
		},
	},

	defaultVariants: {
		size: 'medium',
		variant: 'solid',
		rounded: true,
	},
});

export default function App() {
	return (
		<div className='p-4 space-x-2'>
			<button
				className={buttonReceipe(
					{
						size: 'large',
						variant: 'outline',
					},
					'font-semibold',
				)}
			>
				button
			</button>

			<button className={buttonReceipe()} onClick={() => console.log('clicked')}>
				button
			</button>

			<a
				href='/'
				className={buttonReceipe(
					{
						size: 'small',
						variant: 'ghost',
					},
					'underline',
				)}
			>
				Link
			</a>
		</div>
	);
}
