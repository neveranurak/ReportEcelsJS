type CellValue = string | number;

interface TableFormat {
    removeColumn?: number[];
    boldHeaders?: boolean[];
    boldContent?: boolean[];
    mergeCell?: string[];
    alignLeft?: (string | undefined)[];
    subHeaderAlign: string[];
    subHeaderVerticalAlign: string;
    subHeaderHeight: number;
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