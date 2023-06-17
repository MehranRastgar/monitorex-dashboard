import React from 'react';
import { useTranslation } from 'react-i18next';
import { Row } from 'react-table';
interface Props {
  filter?:
  | string
  | ((rows: Row<any>[], columnIds: string[], filterValue: any) => Row<any>[])
  | undefined;
  setFilter: any;
}
export const GlobalFilter: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  return (
    <span className="flex bg-[var(--bgc)] p-2 h-fit  w-fit ml-[7px] ">
      {t('search')}:{' '}
      <input
        className="mx-2 bg-[var(--bgc-table)] focus:bg-[var(--bgc-table)]"
        value={props.filter?.toString() || ''}
        onChange={(e) => props.setFilter(e.target.value)}
      />
    </span>
  );
};
