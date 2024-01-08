import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Card } from './path-to-your-component/Card'; // Adjust the import path accordingly
import { StationProgress } from '@/components/StationProgress'; // Import any other components if used inside Card

jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));

describe('<Card />', () => {
    const mockProps = {
        id: 1,
        departure_time: '08:00',
        estimated_departure_time: '08:05',
        animationDelay: 100,
    };

    it('renders correctly', () => {
        const { getByText } = render(<Card {...mockProps} />);
        expect(getByText('Estimated Departure Time:')).toBeTruthy();
        expect(getByText('08:05')).toBeTruthy();
        expect(getByText('Scheduled Time:')).toBeTruthy();
        expect(getByText('08:00')).toBeTruthy();
    });

    it('toggles expansion on press', async () => {
        const { getByTestId } = render(<Card {...mockProps} />);

        // Assuming you add a testID to your TouchableOpacity for easier testing
        const toggleButton = getByTestId('toggleButton');
        fireEvent.press(toggleButton);

        // Check if the state has changed or if some element appears/disappears after expansion
        // For example, if a text or view should appear after expansion, you can test it here
        await waitFor(() => {
            // Your expectations for state change after toggle
        });
    });

    it('triggers animations correctly', () => {
        // This test can be tricky because it involves animations.
        // You might want to mock the useAnimatedStyle and test if it's being called with correct parameters.
        // However, this would be more of a test for the react-native-reanimated library rather than your component.
    });

    it('navigates to the correct screen on press', () => {
        const { getByTestId } = render(<Card {...mockProps} />);
        
        // Assuming you add a testID to your Link or Pressable for easier testing
        const navigationLink = getByTestId('navigationLink');
        fireEvent.press(navigationLink);

        // Test if the navigation has been triggered with the correct path
        // This will depend on your navigation setup and may require mocking
    });
});
