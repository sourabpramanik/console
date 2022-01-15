import '@testing-library/jest-dom';
import { render } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { InputPassword } from '../../../src/lib/components';

test('shows password input', () => {
	const { getByText, getByLabelText } = render(InputPassword, { label: 'input' });
	const input = getByLabelText('input');

	expect(getByText('input')).toBeInTheDocument();
	expect(input).toBeInTheDocument();
	expect(input).toHaveAttribute('type', 'password');
});

test('shows password input - required', () => {
	const { getByLabelText } = render(InputPassword, { label: 'input', required: true });

	expect(getByLabelText('input')).toBeRequired();
});

test('shows password input - disabled', () => {
	const { getByLabelText } = render(InputPassword, { label: 'input', disabled: true });

	expect(getByLabelText('input')).toBeDisabled();
});

test('shows password input - autofocus', () => {
	const { getByLabelText } = render(InputPassword, { label: 'input', autofocus: true });

	expect(getByLabelText('input')).toHaveFocus();
});

test('shows password input - placeholder', () => {
	const { getByPlaceholderText } = render(InputPassword, {
		label: 'input',
		placeholder: 'find me'
	});

	expect(getByPlaceholderText('find me')).toBeInTheDocument();
});

test('state', async () => {
	const { component, getByLabelText } = render(InputPassword, { label: 'input', value: '' });
	const input = getByLabelText('input');

	expect(component.value).toEqual('');
	await userEvent.type(input, 'lorem');
	expect(component.value).toEqual('lorem');
});
