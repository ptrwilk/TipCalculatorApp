import { Box, InputAdornment, Typography, styled } from "@mui/material";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import styles from "./styles.module.scss";
import classNames from "classnames";

const font = "var(--verydarkcyan)";
const primary = "var(--verylightgrayishcyan)";
const secondary = "var(--strongcyan)";
const errorColor = "var(--red)";

const TextFieldStyled = styled(TextField)<TextFieldProps>(
  ({ error, disabled }) => ({
    width: "100%",
    ".MuiOutlinedInput-root": {
      color: font,
      background: primary,
      "&:hover fieldset": {
        borderColor: disabled ? undefined : error ? errorColor : secondary,
      },
      "&.Mui-focused fieldset": {
        borderColor: secondary,
      },
      "&.Mui-error fieldset": {
        borderColor: errorColor,
      },
      ".MuiOutlinedInput-notchedOutline": {
        borderColor: primary,
        borderWidth: 2,
        borderRadius: "0.5rem",
      },
      ".MuiOutlinedInput-input": {
        padding: `0.5rem 1.2rem`,
        fontWeight: 700,
        textAlign: "right",
        "::placeholder": {
          opacity: 0.7,
        },
        cursor: disabled ? "not-allowed" : undefined,
      },
    },
  })
);

export interface IInputFieldProps {
  className?: string;
  value?: any;
  onValueChange?: (value?: any) => void;
  caption?: string;
  error?: boolean;
  errorMessage?: string;
  placeholder?: string;
  maxLength?: number;
  icon?: any;
  disabled?: boolean;
  allowDecimal?: boolean;
}

const DecimalPoints: number = 2;

const isNumber = (text: any, allowDecimal: boolean) => {
  const decimalPointsRegex = new RegExp(`^\\d*\\.?\\d{0,${DecimalPoints}}$`);

  return allowDecimal
    ? !isNaN(text) &&
        !/\s+/.test(text) &&
        decimalPointsRegex.test(text) &&
        parseFloat(text) >= 0
    : !isNaN(text) && !/\s+|\./.test(text) && parseFloat(text) >= 0;
};

const hasDecimalPoint = (text: any) => text.includes(".");

const InputField: React.FC<IInputFieldProps> = ({
  className,
  value,
  caption,
  error,
  errorMessage,
  placeholder,
  maxLength = 10,
  icon,
  allowDecimal = true,
  disabled = false,
  onValueChange,
}) => {
  const handleValueChange = (text?: any) => {
    if (text === "") {
      onValueChange?.(undefined);
    } else if (
      (text?.length ?? 0) <=
        (hasDecimalPoint(text) ? maxLength + DecimalPoints + 1 : maxLength) &&
      isNumber(text, allowDecimal)
    ) {
      onValueChange?.(text);
    }
  };

  return (
    <Box className={classNames(styles["container"], className)}>
      {caption && (
        <Typography className={styles["caption"]}>{caption}</Typography>
      )}
      {error && (
        <Typography className={styles["error"]}>{errorMessage}</Typography>
      )}
      <TextFieldStyled
        disabled={disabled}
        InputProps={
          icon && {
            startAdornment: (
              <InputAdornment position="start" sx={{ paddingLeft: ".3rem" }}>
                <img src={icon} />
              </InputAdornment>
            ),
          }
        }
        placeholder={placeholder}
        value={value?.toString() ?? ""}
        error={error}
        onChange={(e) => handleValueChange(e.target.value)}
      />
    </Box>
  );
};

export { InputField };
