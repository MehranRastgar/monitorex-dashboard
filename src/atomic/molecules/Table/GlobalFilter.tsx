import React from 'react';
import { useTranslation } from 'react-i18next';
interface Props {
  filter?: string;
  setFilter: any;
}
export const GlobalFilter: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  return (
    <span className="flex bg-[var(--bgc)] p-2 h-fit">
      {t('search')}:{' '}
      <input
        className="mx-2 bg-[var(--bgc)]"
        value={props.filter || ''}
        onChange={(e) => props.setFilter(e.target.value)}
      />
    </span>
  );
};
