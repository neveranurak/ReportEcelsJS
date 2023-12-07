

import { Credit } from '../../model';

const inputAccountByCreditLine: Credit.GenerateReportInput = {
    headerText: [
        'รายงานการเปิดบัญชีตามวงเงินอนุมัติ (Account by Credit Line)',
        'ช่วงเวลา: 01/01/2565 - 31/12/2565',
        'วัน/เวลาที่สร้างรายงาน: 25/05/2566 เวลา 16:25',
      ],
      subHeader: [
        ['Credit Tier', 'No. of A/C', '% of total', 'Total Credit Line (MB)', '% of total'],
      ],
      data: [
        ['100,000,001 - 300,000,000', 0, '0.00%', '-', '0.00%'],
        ['3,000,001 - 100,000,000', 5, '10.87%', 20.49, '25.46%'],
        ['2,000,001 - 3,000,000', 10, '21.74%', 30.00, '37.27%'],
        ['1,000,001 - 2,000,000', 5, '10.87%', 10.00, '12.42%'],
        ['500,002 - 1,000,000', 15, '32.61%', 14.00, '17.39%'],
        ['0 - 500,000', 11, '23.91%', 6.00, '7.45%'],
        ['Total', 46, '100.00%', 80.49, '100.00%'],
      ],
      tableFormat: {
        removeColumn: [6, 1],
        subHeaderAlign: ['left'],
        subHeaderHeight: 10,
        unshiftSubHeader: false,
        subHeaderRepeat: 0,
        repeatPosition: 0,
        subHeaderVerticalAlign: 'bottom',
        boldHeaders: [true, false, false],
        boldContent: [false],
        alignLeft: ['left', 'right', 'right', 'right', 'right'],
        columnWidths: [20, 10, 10, 20, 10],
        rowHeight: 10,
        fontSize: 10,
        fontColor: '000000',
        backgroundColor: '',
        border: false,
      },
};

export default inputAccountByCreditLine;