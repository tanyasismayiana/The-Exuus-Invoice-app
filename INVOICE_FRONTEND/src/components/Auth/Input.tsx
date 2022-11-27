import React from "react";
import { Input } from "semantic-ui-react";

export interface TextInputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  name: string;
  value: string;
  placeholder: string;
  type?: "text" | "email" | "password";
  labelTitle?: string;
  error?: string;
}

const TextInput = ({
  onChange,
  name,
  value,
  placeholder,
  type,
  labelTitle,
  error,
  onBlur,
}: TextInputProps) => {
  return (
    <div className="group">
      <label htmlFor={name}>{labelTitle}</label>
      <Input
        placeholder={placeholder}
        type={type}
        className="auth-input"
        value={value}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && <span className="auth-input-error">{error}</span>}
    </div>
  );
};

export default TextInput;
