import React from "react";

interface TextProps {
  children: React.ReactNode;
  variant?: "large" | "medium" | "small";
  block?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

export const StyledText: React.FC<TextProps> = ({ children, variant = "medium", block, style, className }) => {
  const Tag = block ? "div" : "span";

  const sizeMap: { [key: string]: number } = {
    large: 16,
    medium: 14,
    small: 12,
  };

  const defaultStyle: React.CSSProperties = {
    fontSize: `${sizeMap[variant]}px`,
    display: block ? "block" : "inline",
    ...style,
  };

  return <Tag style={defaultStyle} className={className}>{children}</Tag>;
};
