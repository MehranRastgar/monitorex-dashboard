import { TableOptions } from 'react-table';

declare module 'react-table' {
  export interface TableOptions<D extends Record<string, unknown>> {
    getExportFileBlob?: ({ columns, data, fileType, fileName }: {
      columns: any;
      data: any;
      fileType: any;
      fileName: any;
    }) => false | Blob;
  }
}