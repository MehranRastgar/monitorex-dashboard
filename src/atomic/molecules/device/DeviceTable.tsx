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
  UsePaginationInstanceProps,
  UseSortByInstanceProps,
  UsePaginationState,
  UseFiltersInstanceProps,
  UseGlobalFiltersInstanceProps,
  TableState,
  UseGlobalFiltersOptions,
  UseFiltersColumnOptions,
  UseGlobalFiltersColumnOptions,
  UseGroupByColumnOptions,
  UseResizeColumnsColumnOptions,
  UseSortByColumnOptions,
  UseFiltersColumnProps,
  UseGroupByColumnProps,
  UseResizeColumnsColumnProps,
  UseSortByColumnProps,
  Column,
  HeaderGroupPropGetter,
  CellPropGetter,
} from 'react-table';

import mockdata from './MOCK_DATA.json';
// import dynamic from "next/dynamic";
// const SensorUnit = dynamic(() => import("./SensorUnit"));
import classes from './devicetable.module.scss';
import { GlobalFilter } from '../Table/GlobalFilter';
import { useQuery } from 'react-query';
import { GetDevices } from 'src/api/devices';
import ThemeButton from 'src/atomic/atoms/ThemeButton/ThemeButton';

export type TableInstanceWithHooks<T extends object> = TableInstance<T> &
  UseFiltersInstanceProps<T> &
  UseGlobalFiltersInstanceProps<T> &
  TableState &
  UsePaginationInstanceProps<T> &
  UseSortByInstanceProps<T> & {
    state: UsePaginationState<T> & UseGlobalFiltersOptions<T>;
  };

export interface ColumnInstance<
  D extends Record<string, unknown> = Record<string, unknown>,
> extends UseFiltersColumnProps<D>,
    UseGroupByColumnProps<D>,
    UseResizeColumnsColumnProps<D>,
    UseSortByColumnProps<D> {}

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
    pageOptions,
    preGlobalFilteredRows,
    setGlobalFilter,
    state,
  } = useTable<any>(
    {
      columns,
      data,
    },
    useFilters, // useFilters!
    useGlobalFilter, // useGlobalFilter!
    useSortBy,
    usePagination,
  ) as TableInstanceWithHooks<any>;

  const { globalFilter, pageIndex } = state;
  return (
    <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <section className="flex flex-wrap border-[var(--border-color)] border h-[40vh] max-w-[250px] lg:min-w-[20rem] md:min-w-[12rem] min-w-[12rem] mb-4 overflow-y-auto">
        {/* {queryDevices.data[0].DeviceUniqueName} */}
        <table className={classes.table} {...getTableProps()}>
          <thead>
            {headerGroups?.map((headerGroup, indexOne) => (
              <tr
                key={indexOne}
                {...(headerGroup?.getHeaderGroupProps() as HeaderGroupPropGetter<any>)}
              >
                {headerGroup.headers.map((columns: any, colIndex) => (
                  <>
                    {columns?.getSortByToggleProps() !== undefined && (
                      <th
                        key={colIndex}
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
                <tr
                  key={index}
                  {...(row.getRowProps() as HeaderGroupPropGetter<any>)}
                >
                  {row.cells.map((cell, indexw) => (
                    <td
                      key={indexw}
                      className="p-1 border"
                      {...(cell.getCellProps() as CellPropGetter<any>)}
                    >
                      {cell.render('Cell')}
                    </td>
                  ))}
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
