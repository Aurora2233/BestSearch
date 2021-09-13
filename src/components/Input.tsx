import { useState } from "react";
import { useHistory } from "react-router-dom";
import Search from "@material-ui/icons/Search";
import { TextField, Button } from "@material-ui/core";
import { getdata } from "../store/actions/index";
import { useAppDispatch } from "../store/hooks";
import { useParams } from "react-router-dom";
import "./index.css";
interface props {
  id: string;
}
let Input = () => {
  const dispatch = useAppDispatch();
  let { id } = useParams<props>();
  let val = id || "";
  const [name, setName] = useState(val);
  let History = useHistory();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  function onkeydown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Enter" && !!name) {
      let value = name.replace(/\s/g, "+");
      getdata(dispatch, value);
      History.push(`/${value}`);
    }
  }
  function handleSearch() {
    if (name) {
      let value = name.replace(/\s/g, "+");
      getdata(dispatch, value);
      History.push(`/${value}`);
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
