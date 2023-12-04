import * as ExcelJS from 'exceljs';
import { Status } from '../../model'


function GenerateReportAccountByStatus(inputAccountByStatus: Status.ReportInput): ExcelJS.Workbook {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('AccountStatusReport');

    const headers = Object.keys(inputAccountByStatus.accountList[0]);
    worksheet.addRow(headers);

    inputAccountByStatus.accountList.forEach((account) => {
    worksheet.addRow(Object.values(account));
    });

    const totalCreditLine = inputAccountByStatus.accountList.reduce((sum, account) => sum + account.creditLine, 0);
    worksheet.addRow(['Total', '', totalCreditLine]);

    return workbook
}

module.exports = GenerateReportAccountByStatus;