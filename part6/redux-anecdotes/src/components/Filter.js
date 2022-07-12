import { connect } from "react-redux/es/exports"
import { setFilter } from "../reducers/filterReducer";

const Filter = (props) => {
  const handleChange = (event) => {
    const value = event.target.value;
    props.setFilter(value);
  }
  const style = {
    marginBottom: 10
  }
  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = {
  setFilter,
}

export default connect(null, mapDispatchToProps)(Filter);