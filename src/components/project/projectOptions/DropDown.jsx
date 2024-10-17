import styles from "./DropDown.module.css";
function DropDown() {
  return (
    <select className={styles.drop_down} name="stations">
      <option value="volvo">A fazer</option>
      <option value="saab">Fazendo</option>
      <option value="mercedes">Feito</option>
    </select>
  );
}
export default DropDown;
