import PropTypes from "prop-types";
import styles from "./Tag.module.css";

function Tag({ name, children }) {
  return (
    <span className={styles.tag}>
      {name} {children}
    </span>
  );
}

export default Tag;

Tag.propTypes = {
  name: PropTypes.string,
  children: PropTypes.object,
};
