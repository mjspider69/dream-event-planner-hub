
import React, { useState, useRef, useEffect } from 'react';
import { cn } from "@/lib/utils";

interface OTPInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const OTPInput = ({ length = 6, value, onChange, className }: OTPInputProps) => {
  const [inputs, setInputs] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Update inputs when value prop changes
    const valueArray = value.split('').slice(0, length);
    const newInputs = Array(length).fill('');
    valueArray.forEach((char, index) => {
      newInputs[index] = char;
    });
    setInputs(newInputs);
  }, [value, length]);

  const handleChange = (index: number, newValue: string) => {
    // Only allow digits
    if (!/^\d*$/.test(newValue)) return;

    const newInputs = [...inputs];
    newInputs[index] = newValue.slice(-1); // Take only the last character
    setInputs(newInputs);

    // Call onChange with the combined value
    onChange(newInputs.join(''));

    // Move to next input if current input is filled
    if (newValue && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === 'Backspace' && !inputs[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').replace(/\D/g, '').slice(0, length);
    onChange(pastedData);
    
    // Focus the next empty input or the last input
    const nextIndex = Math.min(pastedData.length, length - 1);
    inputRefs.current[nextIndex]?.focus();
  };

  return (
    <div className={cn("flex gap-2 justify-center", className)}>
      {inputs.map((digit, index) => (
        <input
          key={index}
          ref={el => inputRefs.current[index] = el}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          className={cn(
            "w-12 h-12 text-center text-lg font-semibold border-2 border-gray-300 rounded-lg",
            "focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200",
            "transition-all duration-200"
          )}
        />
      ))}
    </div>
  );
};

export default OTPInput;
