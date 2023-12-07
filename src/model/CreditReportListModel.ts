type CellValue = string | number;

interface RowBackgroundColor {
  startRow: number;
  endRow: number;
  color: string;
}

interface TableFormat {
    removeColumn?: number[];
    boldHeaders?: boolean[];
    boldContent?: boolean[];
    unshiftSubHeader?: boolean;
    mergeCell?: string[];
    rowBackgroundColors?: RowBackgroundColor[];
    alignLeft?: (string | undefined)[];
    subHeaderAlign: string[];
    subHeaderVerticalAlign: string;
    subHeaderHeight: number;
    repeatPosition: number;
    subHeaderRepeat: number;
    columnWidths?: number[];
    rowHeight?: number;
    fontSize?: number;
    fontColor?: string;
    backgroundColor?: string;
    fontWeight?: "bold" | "normal";
    headerBold?: boolean;  // Add this line
    border?: boolean;
}

interface GenerateReportInput {
  headerText: string[];
  subHeader: string[][];
  data: CellValue[][];
  tableFormat: TableFormat;
}

export {
    GenerateReportInput,
};