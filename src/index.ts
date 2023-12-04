import { inputAccountByCreditLine, inputAccountByStatus, inputComparison } from './constant';
const GenerateReportAccountByCreditLine = require('./controller/CreditReportList');
const GenerateReportAccountByStatus = require('./controller/StatusReportList');
const GenerateReportComparison = require('./controller/ComparisonReportList');



const excelWorkbookCreditLine = GenerateReportAccountByCreditLine(inputAccountByCreditLine);
const excelWorkbookStatus = GenerateReportAccountByCreditLine(inputAccountByStatus);
const excelWorkbookComparison = GenerateReportAccountByCreditLine(inputComparison);

// Save the workbook to a file
// //------------------------------------------------------------------------------------
excelWorkbookCreditLine.xlsx.writeFile('output/CreditReportList.xlsx').then(() => {
    console.log('Excel file written successfully');
}).catch((error: any) => {
    console.error('Error writing Excel file:', error);
});
// //------------------------------------------------------------------------------------
excelWorkbookStatus.xlsx.writeFile('output/AccountStatusReport.xlsx')
.then(() => {
    console.log('Excel file written successfully');
})
.catch((error: any) => {
    console.error('Error writing Excel file:', error);
});
// //------------------------------------------------------------------------------------
excelWorkbookComparison.xlsx.writeFile('output/ComparisonReport.xlsx')
.then(() => {
    console.log('Excel file written successfully');
})
.catch((error: any) => {
    console.error('Error writing Excel file:', error);
});