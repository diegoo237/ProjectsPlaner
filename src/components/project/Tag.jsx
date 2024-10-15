import PropTypes from "prop-types";
import styles from "./tag.module.css";

function Tag({ name }) {
  return <span className={styles.tag}>{name}</span>;
}

export default Tag;

Tag.propTypes = {
  name: PropTypes.string,
};
