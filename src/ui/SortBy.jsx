import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortby") || "";

  function handleChange(e) {
    searchParams.set("sortby", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      options={options}
      value={sortBy}
      onChange={handleChange}
      type="white"
    ></Select>
  );
}

export default SortBy;
