import { PropsWithChildren, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import styles from "@styles/dropdown.module.css";

type DropdownPropsType = {
  label: string;
};
const Dropdown = ({
  label,
  children,
}: PropsWithChildren<DropdownPropsType>) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.dropdown} role="listbox">
      <div
        className={styles.label}
        onClick={() => setOpen((openState) => !openState)}
        data-testid="dropdown-label"
      >
        <p>{label}</p>
        {open ? <FaChevronUp /> : <FaChevronDown />}
      </div>
      {open && <div>{children}</div>}
    </div>
  );
};

export default Dropdown;
