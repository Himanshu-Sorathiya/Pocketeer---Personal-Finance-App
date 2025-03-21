import {
  type RankingInfo,
  compareItems,
  rankItem,
} from "@tanstack/match-sorter-utils";
import {
  type FilterFn,
  type SortingFn,
  sortingFns,
} from "@tanstack/react-table";

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);
  addMeta({ itemRank });
  return itemRank?.passed;
};

const fuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
  const metaA = rowA.columnFiltersMeta[columnId] as { itemRank?: RankingInfo };
  const metaB = rowB.columnFiltersMeta[columnId] as { itemRank?: RankingInfo };

  let dir = 0;

  if (metaA?.itemRank && metaB?.itemRank) {
    dir = compareItems(metaA.itemRank, metaB.itemRank);
  }

  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
};

export { fuzzyFilter, fuzzySort };
