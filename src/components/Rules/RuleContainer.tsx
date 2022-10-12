import React from 'react';

interface RuleContainerProp extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode;
}

const RuleContainer: React.FC<RuleContainerProp> = ({ children, className, ...props }) => (
  <div className={`rule__container ${className}`} {...props}>
    {children}
  </div>
);

export default RuleContainer;
