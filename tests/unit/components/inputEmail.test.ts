import '@testing-library/jest-dom';
import { render } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { InputEmail } from '../../../src/lib/components';

test('shows email input', () => {
	const { getByText, getByLabelText } = render(InputEmail, { label: 'input' });
	const input = getByLabelText('input');

	expect(getByText('input')).toBeInTheDocument();
	expect(input).toBeInTheDocument();
	expect(input).toHaveAttribute('type', 'email');
});

test('shows email input - required', () => {
	const { getByLabelText } = render(InputEmail, { label: 'input', required: true });

	expect(getByLabelText('input')).toBeRequired();
});

test('shows email input - disabled', () => {
	const { getByLabelText } = render(InputEmail, { label: 'input', disabled: true });

	expect(getByLabelText('input')).toBeDisabled();
});

test('shows email input - autofocus', () => {
	const { getByLabelText } = render(InputEmail, { label: 'input', autofocus: true });

	expect(getByLabelText('input')).toHaveFocus();
});

test('shows email input - placeholder', () => {
	const { getByPlaceholderText } = render(InputEmail, { label: 'input', placeholder: 'find me' });

	expect(getByPlaceholderText('find me')).toBeInTheDocument();
});

test('state', async () => {
	const { component, getByLabelText } = render(InputEmail, { label: 'input', value: '' });
	const input = getByLabelText('input');

	expect(component.value).toEqual('');
	await userEvent.type(input, 'lorem');
	expect(component.value).toEqual('lorem');
});
