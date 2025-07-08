import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Alert from '../../components/Alert';

describe('Alert component', () => {
  it('shows alert message when alert prop is provided', () => {
    render(<Alert alert="Alert appearing"/>)
    expect(screen.getByText("Alert appearing")).toBeInTheDocument();
  })
  
  it('does not appear when allert prop is called with null', () => {
    render(<Alert alert={null}/>)
    expect(screen.queryByTestId('alert')).not.toBeInTheDocument();
  })
  
  it('has proper fade animations', () => {
    render(<Alert alert="You won!" />)
    const alert = screen.getByText("You won!")

    expect(alert).toBeInTheDocument();
    expect(alert).toHaveClass('transition-opacity')
  })
})