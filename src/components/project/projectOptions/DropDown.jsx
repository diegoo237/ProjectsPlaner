import PropTypes from "prop-types";
import styles from "./DropDown.module.css";

function DropDown({ setStation, station }) {
  const handleChange = (e) => {
    setStation(e.target.value);
  };

  const stations = [
    { value: "a_fazer", label: "A Fazer" },
    { value: "fazendo", label: "Fazendo" },
    { value: "feito", label: "Feito" },
  ];

  return (
    <div>
      <select
        id="stations"
        className={styles.drop_down}
        name="stations"
        value={station}
        onChange={handleChange}
      >
        <option value="" disabled>
          Selecione uma estação
        </option>
        {stations.map((st) => (
          <option key={st.value} value={st.value}>
            {st.label}
          </option>
        ))}
      </select>
    </div>
  );
}

DropDown.propTypes = {
  setStation: PropTypes.func.isRequired,
  station: PropTypes.string,
};

export default DropDown;
