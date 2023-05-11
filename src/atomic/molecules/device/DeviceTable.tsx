import React, { useEffect, useMemo, useState } from 'react';
import { SensorWebsocketRealTimeDataType } from 'src/components/pages/sensors/sensorsTable';
import { socket } from 'src/components/socketio';
import { DevicesReceiveType } from 'src/store/api/devicesApi';
import { useAppSelector } from 'src/store/hooks';
import { selectDevicesData } from 'src/store/slices/devicesSlice';
import { selectSocketObject, socketObType } from 'src/store/slices/socketSlice';
import SensorItem from './SensorItem';
import SensorUnit from './SensorUnit';
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useFilters,
  HeaderGroup,
  HeaderPropGetter,
  TableInstance,
  usePagination,
} from 'react-table';

import mockdata from './MOCK_DATA.json';
// import dynamic from "next/dynamic";
// const SensorUnit = dynamic(() => import("./SensorUnit"));
import classes from './devicetable.module.scss';
import { GlobalFilter } from '../Table/GlobalFilter';
import { useQuery } from 'react-query';
import { GetDevices } from 'src/api/devices';
import ThemeButton from 'src/atomic/atoms/ThemeButton/ThemeButton';
interface Props {
  index?: number;
}
const DeviceTable: React.FC<Props> = (props) => {
  const queryDevices = useQuery('devices', GetDevices);
  const data = React.useMemo(
    () =>
      queryDevices.isSuccess === true
        ? queryDevices.data
        : [{ title: 'no data' }],
    [queryDevices?.data],
  );
  const columns = React.useMemo(
    () => [
      {
        Header: 'device name',
        accessor: 'title',
      },
      {
        Header: 'ports',
        accessor: 'sensors.length',
      },
    ],
    [],
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    prepareRow,
    state,
    pageOptions,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useFilters, // useFilters!
    useGlobalFilter, // useGlobalFilter!
    useSortBy,
    usePagination,
  );
  const { globalFilter, pageIndex } = state;
  return (
    <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <section className="flex flex-wrap border-[var(--border-color)] border h-[40vh] max-w-[250px] lg:min-w-[20rem] md:min-w-[12rem] min-w-[12rem] mb-4 overflow-y-auto">
        {/* {queryDevices.data[0].DeviceUniqueName} */}
        <table className={classes.table} {...getTableProps()}>
          <thead>
            {headerGroups?.map((headerGroup, indexOne) => (
              <tr {...(headerGroup?.getHeaderGroupProps(), { key: indexOne })}>
                {headerGroup.headers.map((columns: any, colIndex) => (
                  <>
                    {columns?.getSortByToggleProps() !== undefined && (
                      <th
                        className=" border  p-1"
                        {...columns.getHeaderProps(
                          columns.getSortByToggleProps() as HeaderPropGetter<object>,
                        )}
                      >
                        {columns.render('Header')}
                        <span className="text-xs mx-1">
                          {columns.isSorted
                            ? columns.isSortedDesc
                              ? '▼'
                              : '▲'
                            : ''}
                        </span>
                      </th>
                    )}
                  </>
                ))}
              </tr>
            ))}
          </thead>
          <tbody
            className="justify-center overflow-y-auto  "
            {...getTableBodyProps()}
          >
            {page.map((row, index) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell, indexw) => {
                    // Apply the cell props
                    return (
                      <td className="p-1 border" {...cell.getCellProps()}>
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
      <ThemeButton
        className=" flex text-center mx-2 text-[12px] h-[30px] items-center"
        type={'activate'}
        onClick={() => previousPage()}
        disabled={!canPreviousPage}
      >
        Prev
      </ThemeButton>
      <span className="mx-2">
        {pageIndex + 1} / {pageOptions?.length}
      </span>
      <ThemeButton
        className=" flex text-center mx-2 text-[12px] h-[30px] items-center"
        type={'activate'}
        onClick={() => nextPage()}
        disabled={!canNextPage}
      >
        next
      </ThemeButton>
    </>
  );
};

export default DeviceTable;
