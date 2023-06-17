declare module 'react-table-plugins' {
    import { UseTableState, UseSortByState } from 'react-table';

    export interface UseExportDataState<D extends Record<string, unknown>> extends UseTableState<D>, UseSortByState<D> {
        exportButtonHidden?: boolean;
        fileName?: string;
        sheetName?: string;
        columnDelimiter?: string;
        rowDelimiter?: string;
        onlySelected?: boolean;
        transform?: (data: any[]) => any[];
        rawData?: boolean;
        sortBy?: string;
    }
    // <Record<string, unknown>>({} as UseExportDataState<Record<string, unknown>>)
    export function useExportData<D extends Record<string, unknown>>(options?: UseExportDataState<D>): {
        csv: () => void;
        xlsx: () => void;
        state: UseExportDataState<D>;
    };
}