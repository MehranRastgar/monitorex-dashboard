import React, { useEffect, useMemo, useState } from 'react';
import { SensorWebsocketRealTimeDataType } from 'src/components/pages/sensors/sensorsTable';
import { socket } from 'src/components/socketio';
import { DevicesReceiveType } from 'src/store/api/devicesApi';
import { useAppSelector } from 'src/store/hooks';
import { selectDevicesData } from 'src/store/slices/devicesSlice';
import { selectSocketObject, socketObType } from 'src/store/slices/socketSlice';
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
  useRowSelect,
} from 'react-table';

// import dynamic from "next/dynamic";
// const SensorUnit = dynamic(() => import("./SensorUnit"));
import classes from './table.module.scss';
import { GlobalFilter } from '../Table/GlobalFilter';
import { useQuery } from 'react-query';
import { GetDevices } from 'src/api/devices';
import ThemeButton from 'src/atomic/atoms/ThemeButton/ThemeButton';
import { useTranslation } from 'react-i18next';

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
  hasPagination?: boolean;
  hasSearch?: boolean;
  data: object[];
  columns: Column<any>[];
  tHeight?: string;
  setSelectedRow?: any;
  selectedRow: string;
  index?: number;
}

const ReactTable: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const data = React.useMemo(() => props.data, [props.data]);
  const columns = React.useMemo(
    () => props.columns,

    [props.columns],
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    rows,
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
      <div className="flex flex-wrap w-full h-fit relative">
        {props?.hasSearch && (
          <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        )}
        {/* {queryDevices.data[0].DeviceUniqueName} */}
        <div
          className={`flex flex-wrap w-full overflow-y-scroll ${
            props?.tHeight !== undefined ? ` ${props?.tHeight} ` : ' h-[15rem] '
          } `}
        >
          <div className="w-full">
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
                {props?.hasPagination ? (
                  <>
                    {page.map((row, index) => {
                      prepareRow(row);
                      return (
                        <tr
                          key={index}
                          {...(row.getRowProps() as HeaderGroupPropGetter<any>)}
                        >
                          {row.cells.map((cell, indexw) => (
                            <td
                              onClick={() => {
                                console.log('clicked', row.original._id);
                                props?.setSelectedRow(row.original._id);
                              }}
                              key={indexw}
                              className={
                                'p-1 border' &&
                                row.original._id === props.selectedRow
                                  ? classes.table_selected
                                  : ''
                              }
                              {...(cell.getCellProps() as CellPropGetter<any>)}
                            >
                              {cell.render('Cell')}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </>
                ) : (
                  <>
                    {rows.map((row, index) => {
                      prepareRow(row);
                      return (
                        <tr
                          key={index}
                          {...(row.getRowProps() as HeaderGroupPropGetter<any>)}
                        >
                          {row.cells.map((cell, indexw) => (
                            <td
                              onClick={() => {
                                console.log('clicked', row.original._id);
                                props?.setSelectedRow(row.original._id);
                              }}
                              key={indexw}
                              className={
                                'p-1 border' &&
                                row.original._id === props.selectedRow
                                  ? classes.table_selected
                                  : ''
                              }
                              {...(cell.getCellProps() as CellPropGetter<any>)}
                            >
                              {cell.render('Cell')}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
        {props.hasPagination && (
          <div className="flex justify-center w-full h-10 mt-2 scale-75">
            <ThemeButton
              className=" flex text-center mx-2 text-[12px] items-center"
              type={'activate'}
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
              {t('prev')}
            </ThemeButton>
            <span className="mx-2">
              {pageIndex + 1} / {pageOptions?.length}
            </span>
            <ThemeButton
              className=" flex text-center mx-2 text-[12px] items-center"
              type={'activate'}
              onClick={() => nextPage()}
              disabled={!canNextPage}
            >
              {t('next')}
            </ThemeButton>
          </div>
        )}
      </div>
    </>
  );
};

export default ReactTable;
