import Pagination from '@material-ui/lab/Pagination';
import useStyles from "./style";

export type PagenationProps = {
  totalPage: number;
  currentPage: number;
  handleChange: (page: number) => void;
}
export const PaginationControlled = ({totalPage, currentPage, handleChange}: PagenationProps) => {
  const styles = useStyles();

  return (
    <div className={styles.stack}>
      <Pagination count={totalPage} page={currentPage} onChange={(e, page) => handleChange(page)} className={styles.pagenation} />
    </div>
  );
}
