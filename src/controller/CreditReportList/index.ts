import * as ExcelJS from 'exceljs';
import { Credit } from '../../model'

// Modify the applyFormatting function to handle alignment
function applyFormatting(row: ExcelJS.Row, formatOptions: Credit.GenerateReportInput['tableFormat'], rowHederBold = false) {
    const isBoldRow = formatOptions.boldRows && formatOptions.boldRows.includes(row.number);

    if (rowHederBold || isBoldRow) {
        row.font = { bold: true };
    }


    if (formatOptions.boldColumns) {
        row.eachCell((cell, colNumber) => {
            const isBoldColumn = formatOptions.boldColumns?.includes(colNumber);
            if (isBoldColumn) {
                cell.font = { bold: true };
            }
        });
    }
    
    if (formatOptions.alignLeft) {
        row.eachCell((cell, colNumber) => {
            const alignment = formatOptions.alignLeft && formatOptions.alignLeft[colNumber - 1];
            if (alignment) {
                const mappedAlignment = alignment === 'left' ? 'left' : 'right';
                cell.alignment = { horizontal: mappedAlignment };
            }
        });
    }

    if (formatOptions.columnWidths) {
        row.worksheet.columns.forEach((column, colNumber) => {
            const width = formatOptions.columnWidths && formatOptions.columnWidths[colNumber];
            if (width) {
                column.width = width;
            }
        });
    }

    if (formatOptions.rowHeight) {
        row.height = formatOptions.rowHeight;
    }

    if (formatOptions.fontSize) {
        row.font = row.font || {};
        row.font.size = formatOptions.fontSize;
    }

    if (formatOptions.backgroundColor) {
        row.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: formatOptions.backgroundColor },
        };
    }

    if (formatOptions.rowBackgroundColors && formatOptions.rowBackgroundColors.length > 0) {
        formatOptions.rowBackgroundColors.forEach((config) => {
            const { startRow, endRow, color } = config;
            const rowIndex = row.number;
            
            if (rowIndex >= startRow - 1 && rowIndex <= endRow - 1) {
                row.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: color.replace('#','') },
                };
            }
        });
    }
    

    if (formatOptions.fontWeight) {
        row.font = row.font || {};
        row.font.bold = formatOptions.fontWeight === 'bold';
    }

    // Add borders
    if (formatOptions.border) {
        row.eachCell((cell) => {
            cell.border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' },
            };
        });
    }
}

  
function GenerateReportAccountByCreditLine(data: Credit.GenerateReportInput): ExcelJS.Workbook {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Report');

    data.headerText.forEach((headerRow, index) => {
        const header = worksheet.addRow([headerRow]);
        if(data.tableFormat.boldHeaders && data.tableFormat.boldHeaders[index]){
            header.font = { bold: true, size: 12 }
        }else {
            header.font = { bold: false, size: 12 }
        }
    });
    worksheet.addRow([]); // Empty row after headers
     // Add Subheader
    if (data.subHeader) {
        const dataNoRepeat = data.subHeader.filter((item, index) => index != data.tableFormat.repeatPosition - 1 ? item : '')
        dataNoRepeat.forEach((header, rowIndex) => {
            const subHeader = worksheet.addRow(header);
            subHeader.font = { bold: true };
            const mappedAlignment = data.tableFormat.subHeaderAlign[rowIndex] === 'left' ? 'left' : data.tableFormat.subHeaderAlign[rowIndex] === 'right' ? 'right' : 'center';
            const mappedVerticalAlignment = data.tableFormat.subHeaderVerticalAlign === 'bottom' ? 'bottom' : data.tableFormat.subHeaderVerticalAlign === 'top' ? 'top' : 'middle';
            subHeader.alignment = { horizontal: mappedAlignment, vertical: mappedVerticalAlignment};
            if (data.tableFormat.subHeaderHeight) {
                subHeader.height = data.tableFormat.subHeaderHeight;
            }
        })
        if (data.subHeader && data.tableFormat.subHeaderRepeat && data.tableFormat.repeatPosition) {
            const dataRepeat = data.subHeader[data.tableFormat.repeatPosition - 1]
            const repeatedArray = Array.from({ length: data.tableFormat.subHeaderRepeat * 2 }, (_, index) => dataRepeat[index % dataRepeat.length]);
            if (data.tableFormat.unshiftSubHeader) repeatedArray.unshift('');
            [repeatedArray].forEach((header, rowIndex) => {
                const subHeader = worksheet.addRow(header);
                subHeader.font = { bold: true };
                const mappedAlignment = data.tableFormat.subHeaderAlign[rowIndex] === 'left' && data.tableFormat.subHeaderAlign.length != 0 ? 'left' : data.tableFormat.subHeaderAlign[rowIndex] === 'right' && data.tableFormat.subHeaderAlign.length != 0 ? 'right' : 'center';
                const mappedVerticalAlignment = data.tableFormat.subHeaderVerticalAlign === 'bottom' ? 'bottom' : data.tableFormat.subHeaderVerticalAlign === 'top' ? 'top' : 'middle';
                subHeader.alignment = { horizontal: mappedAlignment, vertical: mappedVerticalAlignment};
                if (data.tableFormat.subHeaderHeight) {
                    subHeader.height = data.tableFormat.subHeaderHeight;
                }
            })
        }
    }

    if(data.tableFormat.mergeCell){
        data.tableFormat.mergeCell.forEach((mergeCell) => {
            worksheet.mergeCells(mergeCell);
        })
    }

    data.data.forEach((rowData, rowIndex) => {
        const maskedRowData = rowData.map((value) => {
            if (typeof value === 'number') {
                return value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
            }
            return value;
        });
        const row = worksheet.addRow(maskedRowData);
        rowData.forEach((cellValue, columnIndex) => {
            const isDecimal = Number.isInteger(cellValue) ? false : true;
    
            if (isDecimal) {
                // Apply format for decimal values
                row.getCell(columnIndex + 1).numFmt = '#,##0.00';
            }
        });
        applyFormatting(row, data.tableFormat, data.tableFormat.boldContent && data.tableFormat.boldContent[rowIndex]);
    });

    if (data.tableFormat.removeColumn) {
        worksheet.spliceColumns(data.tableFormat.removeColumn[0], data.tableFormat.removeColumn[1]);
    }

    if(data.tableFormat.boldColumns?.length != 0) {
        data.tableFormat.boldColumns?.forEach((cell) => {
            const col = worksheet.getColumn(cell);
            col.font = { bold: true };
        })
    }

    return workbook;
}
  


module.exports = GenerateReportAccountByCreditLine;