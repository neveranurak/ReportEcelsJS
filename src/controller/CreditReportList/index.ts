import * as ExcelJS from 'exceljs';
import { Credit } from '../../model'

// Modify the applyFormatting function to handle alignment
function applyFormatting(row: ExcelJS.Row, formatOptions: Credit.GenerateReportInput['tableFormat'], rowHederBold = false) {
    if (rowHederBold) {
        row.font = { bold: rowHederBold };
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

    if (formatOptions.fontWeight) {
        row.font = row.font || {};
        row.font.bold = formatOptions.fontWeight === 'bold';
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
        data.subHeader.forEach((header, rowIndex) => {
            const subHeader = worksheet.addRow(header);
            subHeader.font = { bold: true };
            const mappedAlignment = data.tableFormat.subHeaderAlign[rowIndex] === 'left' ? 'left' : data.tableFormat.subHeaderAlign[rowIndex] === 'right' ? 'right' : 'center';
            const mappedVerticalAlignment = data.tableFormat.subHeaderVerticalAlign === 'bottom' ? 'bottom' : data.tableFormat.subHeaderVerticalAlign === 'top' ? 'top' : 'middle';
            subHeader.alignment = { horizontal: mappedAlignment, vertical: mappedVerticalAlignment};
            if (data.tableFormat.subHeaderHeight) {
                subHeader.height = data.tableFormat.subHeaderHeight;
            }
        })
    }

    if(data.tableFormat.mergeCell){
        data.tableFormat.mergeCell.forEach((mergeCell) => {
            worksheet.mergeCells(mergeCell);
        })
    }

    data.data.forEach((rowData, rowIndex) => {
        const maskedRowData = rowData.map((value) => {
            // Apply mask to numeric columns
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

    return workbook;
}
  


module.exports = GenerateReportAccountByCreditLine;