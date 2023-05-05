import { Box, Button, Typography } from "@mui/material";
import styles from "./styles.module.scss";
import classNames from "classnames";

interface IDisplay {
  className?: string;
  amount?: number;
  total?: number;
  resetDisabled?: boolean;
  onReset?: () => void;
}

const Display: React.FC<IDisplay> = ({
  className,
  amount,
  total,
  resetDisabled = false,
  onReset,
}) => {
  const Content = ({ title, value }: { title: string; value?: number }) => (
    <>
      <Typography className={styles["title"]}>
        {title}
        <span className={styles["text"]}>/ person</span>
      </Typography>
      <Typography className={styles["amount"]}>
        ${value?.toFixed(2) ?? "0.00"}
      </Typography>
    </>
  );

  return (
    <Box className={classNames(styles["container"], className)}>
      <Content title="Tip Amount" value={amount} />
      <Content title="Total Amount" value={total} />
      <Button
        className={classNames(styles["btn"], {
          [styles["btn-disabled"]]: resetDisabled,
        })}
        disableRipple
        onClick={resetDisabled ? undefined : onReset}
      >
        Reset
      </Button>
    </Box>
  );
};

export { Display };
