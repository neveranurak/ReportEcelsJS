import { Credit } from '../../model';

const inputAccountByStatus: Credit.GenerateReportInput = {
    headerText: [
        'รายงานการเปิดบัญชีตามสถานะคำขอ (Account by status)',
        'ช่วงเวลา: 01/01/2565 - 31/12/2565',
        'วัน/เวลาที่สร้างรายงาน: 25/05/2566 เวลา 16:25',
    ],
    subHeader: [
        ['No.', 'Customer Name', 'Credit Line', 'Broker', 'Credit Scoring', 'อายุ', 'กลุ่มเสี่ยง', 'Create Date', 'Approve Date', 'Editor', 'Approver', 'Status'],
    ],
    data: [
        [1, 'นาย สมหมาย จริงใจ', 3000000, 'TISCO', '','', 'A','','', 'เจ้าหน้าที่ ก', '', 'รอพิจารณา'],
        [2, 'นาง สมหญิง ใจงาม', 1500000, 'KKPS', '','', 'B','','', 'เจ้าหน้าที่ ข', 'เจ้าหน้าที่ ข', 'อนุมัติ'],
        [3, 'นางสาว มดแดง ตัวน้อย', 2000000, 'BYD', '','', 'C','','', 'เจ้าหน้าที่ ค', 'เจ้าหน้าที่ ง', 'ไม่อนุมัติ'],
        [4, 'นาย หมาก ปริญญาใจ', 2500000, 'KSS', '','', '','','', 'เจ้าหน้าที่ ก', '', 'รอเอกสาร'],
        [5, 'นาง ดอกไม้ ประดับ', 1000000, 'Pi', '','', '','','', 'เจ้าหน้าที่ ข', 'เจ้าหน้าที่ ข', 'ชำระอากรแล้ว'],
        [6, 'นางสาว', 1200000, 'Pi', '', '','','','', 'เจ้าหน้าที่ ค', 'เจ้าหน้าที่ ง', 'รออนุมัติ'],
        ['','Total', 11200000],
    ],
      tableFormat: {
        // removeColumn: [6, 1],
        subHeaderAlign: ['left'],
        subHeaderHeight: 20,
        subHeaderVerticalAlign: 'bottom',
        boldHeaders: [true, false, false],
        boldContent: [false, false, false, false, false, false, true],
        alignLeft: ['right', 'left', 'right', 'left', 'right'],
        columnWidths: [5, 20, 15, 8, 15, 5, 10, 10, 13, 10 ,10 ,12],
        rowHeight: 15,
        fontSize: 10,
        fontColor: '000000',
        backgroundColor: '',
        border: true,
      },
}

export default inputAccountByStatus;