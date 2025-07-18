import '../setup.components.js';
import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import Alert from '../../components/Alert';
import UIProvider from '../../contexts/UIContext';
import { UIContext } from '../../contexts/UIContext';
import { useContext, useEffect } from 'react';

// Test component that can trigger alerts and clear them
function TestAlertTrigger({ message, shouldShow = false, clearAfter = null }) {
  const { setAlert } = useContext(UIContext);
  
  useEffect(() => {
    if (shouldShow && message) {
      setAlert(message);
      
      // Clear the alert after a specified time to simulate the UIContext timeout
      if (clearAfter) {
        const timeout = setTimeout(() => {
          setAlert(null);
        }, clearAfter);
        return () => clearTimeout(timeout);
      }
    }
  }, [shouldShow, message, setAlert, clearAfter]);
  
  return <Alert />;
}

describe('Alert component', () => {
  it('shows alert message when alert is provided', async () => {
    render(
      <UIProvider>
        <TestAlertTrigger message="Alert appearing" shouldShow={true} />
      </UIProvider>
    );
    
    await waitFor(() => {
      expect(screen.getByText('Alert appearing')).toBeInTheDocument();
    });
  });
  
  it('does not appear when alert is null', () => {
    render(
      <UIProvider>
        <TestAlertTrigger message={null} shouldShow={false} />
      </UIProvider>
    );
    expect(screen.queryByTestId('alert')).not.toBeInTheDocument();
  });
  
  it('has proper fade animations', async () => {
    render(
      <UIProvider>
        <TestAlertTrigger message="You won!" shouldShow={true} />
      </UIProvider>
    );
    
    await waitFor(() => {
      const alert = screen.getByText('You won!');
      expect(alert).toBeInTheDocument();
      expect(alert).toHaveClass('transition-opacity');
    });
  });
  
  it('auto-hides after timeout', async () => {
    render(
      <UIProvider>
        <TestAlertTrigger 
          message="Temporary alert" 
          shouldShow={true} 
          clearAfter={100} // Clear after 100ms to simulate UIContext timeout
        />
      </UIProvider>
    );
    
    // Alert should appear
    await waitFor(() => {
      expect(screen.getByText('Temporary alert')).toBeInTheDocument();
    });
    
    // Alert should disappear after the Alert component's 2-second timeout
    await waitFor(() => {
      expect(screen.queryByText('Temporary alert')).not.toBeInTheDocument();
    }, { timeout: 3000 }); // 2 seconds for Alert component timeout
  });
});