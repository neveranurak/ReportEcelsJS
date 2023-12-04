
import { Credit } from '../../model/index';

const inputComparisonReport: Credit.GenerateReportInput = {
    headerText: [
        'รายงานเปรียบเทียบตามผลการอนุมัติ (Comparision Report)',
        'วัน/เวลาที่สร้างรายงาน: 25/05/2566 เวลา 16:25',
    ],
    subHeader: [
        ['','01/12/2565 - 31/12/2565','', '01/01/2566 - 31/01/2566','', 'Change'],
        ['สถานะ', 'Account', 'Credit Line (MB)', 'Account', 'Credit Line (MB)', 'Account', 'Credit Line (MB)'],
    ],
    data: [
        ['Beginning', 15, 30.00, 0, '-', 15, 30.00],
        ['New Customer', 40, 60.00, 15, 30.00, 25, 30.00],
        ['Reject', 10, '-', 10, '-', 0, '-'],
        ['Ending', 55, 90.00, 15, 30.00, 40, 60.00],
    ],
    tableFormat: {
        // removeColumn: [6, 1],
        subHeaderAlign: ['center', 'left'],
        mergeCell: ['B4:C4', 'D4:E4', 'F4:G4'],
        subHeaderHeight: 20,
        subHeaderVerticalAlign: 'bottom',
        boldHeaders: [true, false, false],
        boldContent: [false, false, false, false, false, false, true],
        alignLeft: ['left', 'right', 'right', 'right', 'right', 'right', 'right'],
        columnWidths: [15, 15, 15, 15, 15, 15, 15],
        rowHeight: 15,
        fontSize: 10,
        fontColor: '000000',
        backgroundColor: '',
        border: true,
      },
};

export default inputComparisonReport;