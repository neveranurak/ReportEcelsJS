import * as ExcelJS from 'exceljs';
import { Comparison } from '../../model'

function GenerateReportComparison(inputComparison:Comparison.ComparisonReport): ExcelJS.Workbook {
    // Create an Excel workbook
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('ComparisonReport');

    // Add headers
    worksheet.addRow(['', '01/12/2565 - 31/12/2565', '', '', '01/01/2566 - 31/01/2566', '', '', 'Change', '']);
    worksheet.addRow(['Status', 'Account', 'Credit Line (MB)', 'Account', 'Credit Line (MB)', 'Account', 'Credit Line (MB)']);

    // Add data rows
    const {
    status,
    beginning: { account: beginningAccount, creditLine: beginningCreditLine },
    newCustomer: { account: newCustomerAccount, creditLine: newCustomerCreditLine },
    reject: { account: rejectAccount, creditLine: rejectCreditLine },
    ending: { account: endingAccount, creditLine: endingCreditLine },
    } = inputComparison.data;

    worksheet.addRow([status, beginningAccount, beginningCreditLine, 0, 0, beginningAccount, beginningCreditLine]);
    worksheet.addRow(['New Customer', newCustomerAccount, newCustomerCreditLine, 15, 30.00, newCustomerAccount - 15, newCustomerCreditLine - 30.00]);
    worksheet.addRow(['Reject', rejectAccount, rejectCreditLine, rejectAccount, rejectCreditLine, 0, 0]);
    worksheet.addRow(['Ending', endingAccount, endingCreditLine, 15, 30.00, endingAccount - 15, endingCreditLine - 30.00]);

    return workbook
}

module.exports = GenerateReportComparison;