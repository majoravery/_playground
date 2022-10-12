// import React from 'react';
// import { render, fireEvent } from '@testing-library/react';
// import { default as EditRuleFooter, CustomerTargetingEditFooterProps } from './EditRuleFooter';

// const defaultComponentProps: CustomerTargetingEditFooterProps = {
//   onApply: jest.fn(),
//   onCancel: jest.fn(),
// };

// describe('EditRuleFooter', () => {
//   it('renders', () => {
//     const { asFragment } = render(<EditRuleFooter {...defaultComponentProps} />);
//     expect(asFragment()).toMatchSnapshot();
//   });

//   it('renders with apply button disabled', () => {
//     const { asFragment } = render(<EditRuleFooter {...defaultComponentProps} disableApplyButton />);
//     expect(asFragment()).toMatchSnapshot();
//   });

//   it('renders with remove button', () => {
//     const { asFragment } = render(<EditRuleFooter {...defaultComponentProps} deleteButtonText='Remove' />);
//     expect(asFragment()).toMatchSnapshot();
//   });

//   it('triggers onApply click', () => {
//     const onApplyMock = jest.fn();
//     const { getByTestId } = render(<EditRuleFooter {...defaultComponentProps} onApply={onApplyMock} />);
//     const selectButton = getByTestId('tab-content-footer-select-btn');
//     fireEvent.click(selectButton);
//     expect(onApplyMock).toHaveBeenCalled();
//   });

//   it('triggers onCancel click', () => {
//     const onCancelMock = jest.fn();
//     const { getByTestId } = render(<EditRuleFooter {...defaultComponentProps} onCancel={onCancelMock} />);
//     const removeButton = getByTestId('tab-content-footer-remove-btn');
//     fireEvent.click(removeButton);
//     expect(onCancelMock).toHaveBeenCalled();
//   });
// });
export {};
