import React, { memo, useMemo, useState } from "react";
import { ActorDTO } from "@infrastructure/apis/client/models/ActorDTO";
import { useIntl } from "react-intl";
import { useAppDispatch, useAppSelector } from "@application/store";
import { useActorTableController } from "./ActorTable.controller";
import { isUndefined } from "lodash";
import { DataLoadingContainer } from "../../LoadingDisplay";
import { IconButton, Input, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { ActorAddDialog } from '../../Dialogs/ActorDialogs/ActorAddDialog';
import { ActorUpdateDialog } from "../../Dialogs/ActorDialogs/ActorUpdateDialog";
import { setToken } from '@application/state-slices';
import { setActorToUpdate } from "@application/state-slices/actor";
import { Actor } from "@application/state-slices/actor/actorSlice.types";
import useDebounce from "@infrastructure/hooks/useDebounce";

const useHeader = (): { key: keyof ActorDTO; name: string }[] => {
  const { formatMessage } = useIntl();

  return [
    { key: "firstName", name: formatMessage({ id: "globals.firstName" }) },
    { key: "lastName", name: formatMessage({ id: "globals.lastName" }) },
    { key: "birthdate", name: formatMessage({ id: "globals.birthdate" }) },
    { key: "gender", name: formatMessage({ id: "globals.gender" }) },
  ];
};

const getRowValues = (entries: ActorDTO[] | null | undefined, orderMap: { [key: string]: number }) =>
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

export const ActorTable = () => {
  const { userId: ownUserId } = useAppSelector(x => x.profileReducer);
  const dispatch = useAppDispatch();
  const { formatMessage } = useIntl();
  const header = useHeader();
  const orderMap = header.reduce((acc, e, i) => { return { ...acc, [e.key]: i } }, {}) as { [key: string]: number };
  const [search, setSearch] = useState("");
  const { handleChangePage, handleChangePageSize, pagedData, isError, isLoading, tryReload, labelDisplay, remove } = useActorTableController(search);
  const rowValues = getRowValues(pagedData?.data, orderMap);
  const [isUpdate, setIsUpdate] = useState(false);

  const handleOnDoubleClick = (entry: ActorDTO) => {
    dispatch(setActorToUpdate(entry as Actor))
    setIsUpdate(true);
  }

  return <DataLoadingContainer isError={isError} isLoading={isLoading} tryReload={tryReload}>
    <ActorAddDialog />
    <Input value={search} onChange={(e: any) => {
      setSearch(e.target.value);
      tryReload();
    }} />

    <ActorUpdateDialog isOpen={isUpdate} setIsOpen={setIsUpdate} />
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
