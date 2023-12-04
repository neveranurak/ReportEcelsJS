type ComparisonReport = {
    createdDate: string;
    data: {
        status: string;
        beginning: { account: number; creditLine: number };
        newCustomer: { account: number; creditLine: number };
        reject: { account: number; creditLine: number };
        ending: { account: number; creditLine: number };
    };
};

export {
    ComparisonReport
};