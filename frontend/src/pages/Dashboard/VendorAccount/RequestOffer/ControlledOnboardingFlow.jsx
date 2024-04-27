import React from "react";

export default function ControlledOnboardingFlow({
  children,
  onNext,
  currentIndex,
  onFinish,
  onPrevious,
  loading,
}) {
  const currentChild = React.Children.toArray(children)[currentIndex];

  const isLastStep = currentIndex === children.length - 1;

  if (React.isValidElement(currentChild)) {
    return (
      <>
        {React.cloneElement(currentChild, {
          onNext,
          onPrevious,
          onFinish,
          isLastStep: currentIndex === children.length - 1,
          loading,
        })}
      </>
    );
  }

  return currentChild;
}
