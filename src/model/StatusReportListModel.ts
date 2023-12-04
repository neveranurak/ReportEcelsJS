type AccountData = {
    no: number;
    customerName: string;
    creditLine: number;
    broker: string;
    creditScoring: string;
    age: string;
    riskGroup: string;
    createDate: string;
    approveDate: string;
    editor: string;
    approver: string;
    status: string;
};
  
type ReportInput = {
    period: string;
    createdDate: string;
    accountList: AccountData[];
};

export {
    ReportInput,
}