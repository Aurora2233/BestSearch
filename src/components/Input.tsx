import { useState } from "react";
import { useHistory } from "react-router-dom";
import Search from "@material-ui/icons/Search";
import { TextField, Button } from "@material-ui/core";
import { getProducts } from "src/store/actions/index";
import { useAppDispatch } from "src/store/hooks";
import { useParams } from "react-router-dom";
import "./index.css";
interface props {
  keyword: string;
}
let Input = () => {
  const dispatch = useAppDispatch();
  let { keyword } = useParams<props>();
  let val = keyword || "";
  const [name, setName] = useState(val);
  let History = useHistory();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  function onkeydown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Enter" && !!name) {
      let value = name.replace(/\s/g, "+");
      getProducts(dispatch, value);
      History.push(`/search/${value}`);
    }
  }
  function handleSearch() {
    if (name) {
      let value = name.replace(/\s/g, "+");
      getProducts(dispatch, value);
      History.push(`/search/${value}`);
    }
  }
  return (
    <span className="SearchContent">
      <TextField
        id="outlined-basic"
        className="SearchBox"
        variant="outlined"
        size="small"
        style={{ margin: 8 }}
        placeholder="Search for new products in 961K stores"
        value={name}
        color="secondary"
        fullWidth
        onChange={handleChange}
        onKeyDown={onkeydown}
      />
      <Button variant="outlined" size="large" onClick={handleSearch}>
        <Search />
      </Button>
    </span>
  );
};

export default Input;
