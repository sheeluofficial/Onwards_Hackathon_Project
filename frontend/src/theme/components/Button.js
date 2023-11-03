const isScholar = true; // todo : true or false boolean;

const Button = {
  baseStyle: {
    fontWeight: "semibold",
    fontStyle: "normal",
    textTransform: "uppercase",
    fontFamily: "body",
    borderRadius: "ms-8",
  },
  sizes: {
    sm: {
      h: "32px",
      p: "8px 12px",
      fontSize: "ms-12",
      lineHeight: "ms-16",
      letterSpacing: "1.25px",
    },
    md: {
      h: "40px",
      p: "8px 16px",
      fontSize: "ms-14",
      lineHeight: "ms-24",
      letterSpacing: "1.25px",
    },
    lg: {
      h: "48px",
      p: "12px 20px",
      fontSize: "ms-18",
      lineHeight: "ms-24",
    },
    "block-sm": {
      w: "100%",
      h: "32px",
      p: "8px 12px",
      fontSize: "ms-12",
      lineHeight: "ms-16",
      letterSpacing: "1.25px",
    },
    "block-md": {
      w: "100%",
      h: "40px",
      p: "8px 16px",
      fontSize: "ms-14",
      lineHeight: "ms-24",
      letterSpacing: "1.25px",
    },
    "block-lg": {
      w: "100%",
      h: "48px",
      p: "12px 20px",
      fontSize: "ms-18",
      lineHeight: "ms-24",
    },
  },
  variants: {
    primary: {
      bg: isScholar ? "ms-prepleaf.400" : "ms-blue.500",
      color: "white",
      _hover: {
        bg: isScholar ? "ms-prepleaf.500" : "ms-blue.600",
        _disabled: { bg: isScholar ? "ms-prepleaf.200" : "ms-blue.200" },
      },
      _focus: {
        outline: "solid 4px",
        outlineColor: isScholar ? "ms-prepleaf.100" : "ms-blue.100",
        boxShadow: "none",
        outlineOffset: "0px",
      },
      _disabled: {
        bg: isScholar ? "ms-prepleaf.200" : "ms-blue.200",
      },
    },
    
  "primary-red": {
    bg: isScholar ? "ms-red.500" : "ms-red.500",
    color: "white",
    _hover: {
      bg: isScholar ? "ms-red.600" : "ms-red.600",
      _disabled: { bg: isScholar ? "ms-red.200" : "ms-red.200" },
    }
  },
    secondary: {
      bg: "#F2F7FF",
      color: "#3470E4",
      _hover: { bg: "#D6E2FA", _disabled: { bg: "#F2F7FF" } },
      _focus: {
        outline: "#D6E2FA solid 4px",
        boxShadow: "none",
        outlineOffset: "0px",
      },
      _disabled: {
        bg: "#F2F7FF",
        color: "#AEC6F4",
      },
    },
    "secondary-grey": {
      border: "1px solid",
      borderColor: "ms-grey.300",
      bg: "white",
      color: "ms-grey.700",
      _hover: {
        bg: "ms-grey.50",
        color: "ms-grey.800",
        _disabled: {
          color: "ms-grey.300",
        },
      },
      _focus: { boxShadow: "0px 0px 0px 4px #F3F2F2" },
      _disabled: {
        bg: "white",
        color: "ms-grey.300",
      },
    },
    tertiary: {
      bg: "white",
      color: isScholar ? "ms-prepleaf.400" : "ms-blue.500",
      _hover: { bg: isScholar ? "ms-prepleaf.100" : "ms-blue.50" },
      _focus: {
        outline: "solid 4px",
        outlineColor: isScholar ? "ms-prepleaf.50" : "ms-blue.50",
        border: "none",
        bg: "white",
        boxShadow: "none",
        outlineOffset: "0px",
      },
      _disabled: {
        bg: "white",
        color: "ms-grey.300",
      },
    },
    "tertiary-grey": {
      bg: "white",
      color: "ms-grey.700",
      _hover: { bg: "ms-grey.50" },
      _focus: {
        outline: "solid 4px",
        outlineColor: "ms-grey.50",
        border: "none",
        bg: "white",
        boxShadow: "none",
        outlineOffset: "0px",
      },
      _disabled: {
        bg: "white",
        color: "ms-grey.300",
      },
    },
    link: {
      bg: "white",
      color: isScholar ? "ms-prepleaf.400" : "ms-blue.500",
      _hover: {
        color: isScholar ? "ms-prepleaf.500" : "ms-blue.600",
        _disabled: { color: "ms-grey.300" },
      },
      _focus: { outline: "none", boxShadow: "none" },
      _disabled: { color: "ms-grey.300" },
    },
  },
  defaultProps: {
    size: "md",
    variant: "outline",
  }
};

export default Button;
