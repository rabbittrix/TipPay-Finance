import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { TransactionForm } from '../../components/TransactionForm';
import { createTransaction } from '../../services/api';

// Mock the API service
jest.mock('../../services/api');

describe('TransactionForm', () => {
    beforeEach(() => {
        (createTransaction as jest.Mock).mockClear();
    });

    it('renders all form fields', () => {
        render(<TransactionForm />);
        
        expect(screen.getByLabelText(/amount/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    });

    it('submits form with valid data', async () => {
        (createTransaction as jest.Mock).mockResolvedValueOnce({
            id: 'tx123',
            status: 'pending'
        });

        render(<TransactionForm />);
        
        fireEvent.change(screen.getByLabelText(/amount/i), {
            target: { value: '100.00' }
        });
        
        fireEvent.change(screen.getByLabelText(/description/i), {
            target: { value: 'Test transaction' }
        });
        
        fireEvent.click(screen.getByRole('button', { name: /submit/i }));
        
        await waitFor(() => {
            expect(createTransaction).toHaveBeenCalledWith({
                amount: 100.00,
                description: 'Test transaction'
            });
        });
    });

    it('displays validation errors for invalid input', async () => {
        render(<TransactionForm />);
        
        fireEvent.change(screen.getByLabelText(/amount/i), {
            target: { value: '-50.00' }
        });
        
        fireEvent.click(screen.getByRole('button', { name: /submit/i }));
        
        expect(await screen.findByText(/amount must be positive/i)).toBeInTheDocument();
    });
}); 