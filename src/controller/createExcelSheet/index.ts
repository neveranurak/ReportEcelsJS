import * as ExcelJS from 'exceljs';

interface CreditTier {
  tier: string;
  noOfAc: number;
  totalPercent: string;
  totalCreditLine: number;
  percentOfTotalCreditLine: string;
}

interface CustomStyle {
  fontSize?: number;
  bold?: boolean;
  alignment?: {
    vertical?: 'top' | 'middle' | 'bottom';
    horizontal?: 'left' | 'center' | 'right';
  };
}

export interface GenerateReportInput {
  headerText: string[];
  creditTierList: CreditTier[];
  headerStyles?: CustomStyle[];
  dataStyles?: CustomStyle[];
  totalRowStyles?: CustomStyle;
}

function generateReport({
  headerText,
  creditTierList,
  headerStyles = [],
  dataStyles = [],
  totalRowStyles = {},
}: GenerateReportInput): ExcelJS.Workbook {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Report');

  // Add custom header rows
  headerStyles.forEach((style) => {
    const headerRow = worksheet.addRow([]);
    if (style.fontSize) headerRow.font = { ...(headerRow.font || {}), size: style.fontSize };
    if (style.bold) headerRow.font = { ...(headerRow.font || {}), bold: true };
    if (style.alignment) headerRow.alignment = style.alignment;
  });


// Add header rows
  headerText.forEach(headerText => {
    worksheet.addRow([headerText]);
  });

  // Add column headers with custom styles
  const headers = ['Credit Tier', 'No. of A/C', '% of total', 'Total Credit Line (MB)', '% of total'];
  const headerRow = worksheet.addRow(headers);
  headerStyles.forEach((style) => {
    if (style.fontSize) headerRow.font = { ...(headerRow.font || {}), size: style.fontSize };
    if (style.bold) headerRow.font = { ...(headerRow.font || {}), bold: true };
  });

  // Add data rows with custom styles
  creditTierList.forEach((tier) => {
    const dataRow = worksheet.addRow([
      tier.tier,
      tier.noOfAc,
      tier.totalPercent,
      tier.totalCreditLine,
      tier.percentOfTotalCreditLine,
    ]);
    dataStyles.forEach((style) => {
      if (style.fontSize) dataRow.font = { ...(dataRow.font || {}), size: style.fontSize };
      if (style.bold) dataRow.font = { ...(dataRow.font || {}), bold: true };
      if (style.alignment) dataRow.alignment = style.alignment;
    });
  });

  // Add total row with custom styles
  const totalNoOfAc = creditTierList.reduce((total, tier) => total + tier.noOfAc, 0);
  const totalPercent = creditTierList.reduce((total, tier) => total + parseFloat(tier.totalPercent), 0);
  const totalCreditLine = creditTierList.reduce((total, tier) => total + tier.totalCreditLine, 0);
  const totalPercentOfTotalCreditLine = creditTierList.reduce(
    (total, tier) => total + parseFloat(tier.percentOfTotalCreditLine),
    0
  );

  const totalRow: CreditTier = {
    tier: 'Total',
    noOfAc: totalNoOfAc,
    totalPercent: `${totalPercent.toFixed(2)}%`,
    totalCreditLine: parseFloat(totalCreditLine.toFixed(2)),
    percentOfTotalCreditLine: `${totalPercentOfTotalCreditLine.toFixed(2)}%`,
  };

  const totalRowData = worksheet.addRow([
    totalRow.tier,
    totalRow.noOfAc,
    totalRow.totalPercent,
    totalRow.totalCreditLine,
    totalRow.percentOfTotalCreditLine,
  ]);

  if (totalRowStyles.fontSize) totalRowData.font = { ...(totalRowData.font || {}), size: totalRowStyles.fontSize };
  if (totalRowStyles.bold) totalRowData.font = { ...(totalRowData.font || {}), bold: totalRowStyles.bold };
  if (totalRowStyles.alignment) totalRowData.alignment = totalRowStyles.alignment;

  return workbook;
}


module.exports = generateReport;