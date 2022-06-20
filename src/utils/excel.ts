import Excel from 'exceljs'

export const cvsToJson = async (path: string) => {
  const result: Record<string, any>[] = [];
  const keys: string[] = [];
  const workbook = new Excel.Workbook();
  await workbook.xlsx.readFile(path);
  const worksheet = workbook.getWorksheet(1);
  worksheet.eachRow((row, rowNumber) => {
    const obj: Record<string, any> = {};
    row.eachCell((cell, colNumber) => {
      const value = cell.value;
      if (rowNumber === 1) {
        keys.push(value as string)
      } else {
        obj[keys[colNumber - 1]] = value;
      }
    });
    if (rowNumber > 1) result.push(obj)
  });
  return result
}