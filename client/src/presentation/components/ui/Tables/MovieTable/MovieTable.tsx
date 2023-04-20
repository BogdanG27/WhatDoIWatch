import React, { memo, useMemo, useState } from "react";
import { MovieDTO } from "@infrastructure/apis/client/models/MovieDTO";
import { useIntl } from "react-intl";
import { useAppDispatch, useAppSelector } from "@application/store";
import { useMovieTableController } from "./MovieTable.controller";
import { isUndefined } from "lodash";
import { DataLoadingContainer } from "../../LoadingDisplay";
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { MovieAddDialog } from '../../Dialogs/MovieDialogs/MovieAddDialog';
import { MovieUpdateDialog } from "../../Dialogs/MovieDialogs/MovieUpdateDialog";
import { setToken } from '@application/state-slices';
import { setMovieToUpdate } from "@application/state-slices/movie";
import { Movie } from "@application/state-slices/movie/movieSlice.types";

const useHeader = (): { key: keyof MovieDTO; name: string }[] => {
  const { formatMessage } = useIntl();

  return [
    { key: "name", name: formatMessage({ id: "globals.name" }) },
    { key: "releaseDate", name: formatMessage({ id: "globals.releaseDate" }) },
    { key: "language", name: formatMessage({ id: "globals.language" }) },
    { key: "genre", name: formatMessage({ id: "globals.genre" }) },
    { key: "rating", name: formatMessage({ id: "globals.rating" }) },
    { key: "numberOfRatings", name: formatMessage({ id: "globals.numberOfRatings" }) },
    { key: "duration", name: formatMessage({ id: "globals.duration" }) },
  ];
};

const getRowValues = (entries: MovieDTO[] | null | undefined, orderMap: { [key: string]: number }) =>
  entries?.map(
    entry => {
      return {
        entry: entry,
        data: Object.entries(entry).filter(([e]) => !isUndefined(orderMap[e])).sort(([a], [b]) => orderMap[a] - orderMap[b]).map(([key, value]) => { return { key, value } })
      }
    });

const formatValue = (value: any) => {
  if (value instanceof Date) {
    let day = value.getDate();
    let month = value.getMonth() + 1;
    let year = value.getFullYear();
    const formatedDate = day + "/" + month + "/" + year;
    return formatedDate;
  }

  return value;
}

export const MovieTable = () => {
  const { userId: ownUserId } = useAppSelector(x => x.profileReducer);
  const dispatch = useAppDispatch();
  const { formatMessage } = useIntl();
  const header = useHeader();
  const orderMap = header.reduce((acc, e, i) => { return { ...acc, [e.key]: i } }, {}) as { [key: string]: number };
  const { handleChangePage, handleChangePageSize, pagedData, isError, isLoading, tryReload, labelDisplay, remove } = useMovieTableController();
  const rowValues = getRowValues(pagedData?.data, orderMap);
  const [isUpdate, setIsUpdate] = useState(false);

  const handleOnDoubleClick = (entry: MovieDTO) => {
    dispatch(setMovieToUpdate(entry as Movie))
    setIsUpdate(true);
  }

  return <DataLoadingContainer isError={isError} isLoading={isLoading} tryReload={tryReload}>
    <MovieAddDialog />
    <MovieUpdateDialog isOpen={isUpdate} setIsOpen={setIsUpdate} />
    {!isUndefined(pagedData) && !isUndefined(pagedData?.totalCount) && !isUndefined(pagedData?.page) && !isUndefined(pagedData?.pageSize) &&
      <TablePagination
        component="div"
        count={pagedData.totalCount}
        page={pagedData.totalCount !== 0 ? pagedData.page - 1 : 0}
        onPageChange={handleChangePage}
        rowsPerPage={pagedData.pageSize}
        onRowsPerPageChange={handleChangePageSize}
        labelRowsPerPage={formatMessage({ id: "labels.itemsPerPage" })}
        labelDisplayedRows={labelDisplay}
        showFirstButton
        showLastButton
      />}

    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {header.map(e => <TableCell key={`header_${String(e.key)}`}>{e.name}</TableCell>)}
            <TableCell>{formatMessage({ id: "labels.actions" })}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            rowValues?.map(({ data, entry }, rowIndex) => <TableRow onDoubleClick={() => handleOnDoubleClick(entry)} key={`row_${rowIndex + 1}`}>
              {data.map((keyValue, index) => <TableCell key={`cell_${rowIndex + 1}_${index + 1}`}>
                {formatValue(keyValue.value)}
              </TableCell>)}
              <TableCell>
                {entry.id !== ownUserId && <IconButton color="error" onClick={() => remove(entry.id || '')}>
                  <DeleteIcon color="error" fontSize='small' />
                </IconButton>}
              </TableCell>
            </TableRow>)
          }
        </TableBody>
      </Table>
    </TableContainer>
  </DataLoadingContainer>
}
