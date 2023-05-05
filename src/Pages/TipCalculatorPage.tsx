import { Box, Button, List, ListItem, Typography } from "@mui/material";
import styles from "./styles.module.scss";
import { Display, InputField } from "../Components";
import { IconDollar, IconPerson, Logo } from "../assets";
import classNames from "classnames";
import { useInputField } from "../useInputField";
import { useState } from "react";

const calculateTipAmount = (
  bill?: number,
  percent?: number,
  custom?: number,
  people?: number
): number | undefined => {
  if (!people || people === 0) return undefined;

  return bill && (percent || custom)
    ? (bill * 0.01 * (percent ?? custom!)) / people
    : undefined;
};

const calculateTotal = (bill?: number, people?: number): number | undefined => {
  if (!people || people === 0) return undefined;

  return bill && people ? bill / people : undefined;
};

const TipCalculatorPage = () => {
  const bill = useInputField();
  const custom = useInputField();
  const people = useInputField();

  const [tip, setTip] = useState<number | undefined>(undefined);

  const handleTipClick = (percent: number) => {
    setTip(tip === percent ? undefined : percent);
  };

  const handleReset = () => {
    bill.clear();
    custom.clear();
    people.clear();
    setTip(undefined);
  };

  const tipAmount = calculateTipAmount(
    bill.numeric,
    tip,
    custom.numeric,
    people.numeric
  );

  const total = calculateTotal(bill.numeric, people.numeric);

  const resetDisabled = !bill.value && !custom.value && !people.value && !tip;

  return (
    <Box className={styles["container"]}>
      <Box className={styles["header"]}>
        <img src={Logo} />
      </Box>
      <Box className={styles["main"]}>
        <InputField
          className={styles["input-bill"]}
          icon={IconDollar}
          caption="Bill"
          placeholder="0.00"
          {...bill}
        />
        <Box className={styles["section"]}>
          <Typography className={styles["title"]}>Select Tip %</Typography>
          <List className={styles["tips"]}>
            {[5, 10, 15, 25, 50].map((percent, key) => (
              <ListItem className={styles["tip"]} key={key}>
                <Button
                  className={classNames(styles["btn"], {
                    [styles["btn-selected"]]: tip === percent,
                  })}
                  onClick={() => handleTipClick(percent)}
                >
                  {percent}%
                </Button>
              </ListItem>
            ))}
            <ListItem className={styles["tip"]}>
              <InputField
                disabled={tip !== undefined}
                placeholder="Custom"
                {...custom}
              />
            </ListItem>
          </List>
        </Box>
        <InputField
          className={styles["input-people"]}
          error={people.value == 0}
          errorMessage="Can't be zero"
          icon={IconPerson}
          caption="Number of People"
          maxLength={5}
          allowDecimal={false}
          placeholder="Minimum 1"
          {...people}
        />
        <Display
          resetDisabled={resetDisabled}
          className={styles["display"]}
          amount={tipAmount}
          total={total}
          onReset={handleReset}
        />
      </Box>
    </Box>
  );
};

export default TipCalculatorPage;
