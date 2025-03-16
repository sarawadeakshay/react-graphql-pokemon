import { createUseStyles } from "react-jss";

type SearchProps = {
  searchStr: string;
  setSearchStr: Function;
  onSearch: React.MouseEventHandler<HTMLButtonElement>
};

export const Search = (props: SearchProps) => {
  const { searchStr, setSearchStr, onSearch } = props;
  const classes = useStyles();

  // Handle the Enter key to filter with the search string
  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSearch(null as any);
    }
  };

  return (<div className={classes.root}>
    <input
      className={classes.input}
      type='text'
      value={searchStr}
      onChange={(e) => { setSearchStr(e.target.value); }}
      onKeyDown={onKeyDown}
    />
    <button
      className={classes.button}
      type='button'
      onClick={props.onSearch}>
      Search
    </button>
  </div>)
};

const useStyles = createUseStyles(
  {
    root: {
      display: 'flex',
      'padding-left': '50px',
    },
    input: {
      color: '#171E2b',
      padding: '10px',
      border: 'none',
    },
    button: {
      color: '#f2f2f2',
      padding: '10px 15px',
      margin: '0 20px',
      'border-radius': '5px',
      cursor: 'pointer',
      background: 'green',
    }
  },
  { name: 'Search' }
);