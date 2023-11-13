export default function tableHeadingFix(table) {
  const firstRow = table.querySelector("tr:first-of-type");
  if (!firstRow) return;

  // Find the first cell within the first row
  const firstCell = firstRow.querySelector("> *");

  // Check if a valid cell element is found
  if (firstCell && typeof firstCell.getAttribute === 'function') {
    if (firstCell.rawTagName !== "th") {
      const rowSpan = firstCell.getAttribute("rowspan") || "1";
      const rowSpanToNum = parseInt(rowSpan);

      for (let i = 0; i < rowSpanToNum; i++) {
        const conversionRow = table.querySelector(`tr:nth-of-type(${i + 1})`);
        if (!conversionRow) return;

        const conversionCells = conversionRow.querySelectorAll("td");
        conversionCells.forEach((cell) => {
          cell.rawTagName = "th";
        });
      }
    }
  }
}