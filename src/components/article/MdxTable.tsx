import type { ComponentPropsWithoutRef } from "react";

import styles from "./MdxTable.module.css";

type Props = ComponentPropsWithoutRef<"table">;

export default function MdxTable({
  className,
  ...props
}: Props) {
  return (
    <div className={styles.wrapper}>
      <table
        {...props}
        className={[
          styles.table,
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      />
    </div>
  );
}