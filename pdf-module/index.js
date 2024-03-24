const { PDFDocument, StandardFonts, rgb, degrees } = require("pdf-lib");
const fs = require("fs");

// Replace with your actual file paths
const inputFilePath = "./test.pdf";
const outputFilePath = "./your_stamped_pdf.pdf";

const stampText =
  "Verifiable at: https://chat.openai.com/c/d5805a03-fdf-4c56-dfd-sdfsdggkasdf34324";
const verifiableText = "Verified by Unicever";
const fontSize = 10;
const fontColor = rgb(1, 1, 1); // White color for the text
const bgColor = rgb(30 / 255, 58 / 255, 138 / 255); // Background color #1E3A8A
const bgColor2 = rgb(1 / 255, 92 / 255, 45 / 255); // Background color #1E3A8A
const bottomMargin = 10;
const rightMargin = 30;
const leftMargin = 30;

(async () => {
  const existingPdfBytes = await fs.readFileSync(inputFilePath);
  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  const page = pdfDoc.getPage(0); // Assuming you want to stamp the first page

  const font = await pdfDoc.embedFont(StandardFonts.TimesRoman);

  // Calculate the text width
  const textWidth = font.widthOfTextAtSize(stampText, fontSize);

  // Calculate the text width
  const textWidth2 = font.widthOfTextAtSize(verifiableText, fontSize);

  // Get the width and height of the page
  const { width, height } = page.getSize();
  // Calculate the x and y positions for the bottom right corner
  const xPosition = width - textWidth - rightMargin;
  const yPosition = bottomMargin;

  // Calculate the x and y positions for the bottom left corner
  const xPosition2 = leftMargin;
  const yPosition2 = bottomMargin;

  // Draw a rectangle behind the text for background
  page.drawRectangle({
    x: xPosition - 4, // Adjust to add padding
    y: yPosition - 6, // Adjust to add padding
    width: textWidth + 8, // Adjust to add padding
    height: fontSize + 8, // Adjust to add padding
    color: bgColor,
    borderColor: bgColor,
  });

  // Draw a rectangle behind the text for background
  page.drawRectangle({
    x: xPosition2 - 4, // Adjust to add padding
    y: yPosition2 - 6, // Adjust to add padding
    width: textWidth2 + 8, // Adjust to add padding
    height: fontSize + 8, // Adjust to add padding
    color: bgColor2,
    borderColor: bgColor2,
  });

  // Draw the text on top of the background rectangle
  page.drawText(stampText, {
    x: xPosition,
    y: yPosition,
    size: fontSize,
    color: fontColor,
    font,
  });

  // Draw the text on top of the background rectangle
  page.drawText(verifiableText, {
    x: xPosition2,
    y: yPosition2,
    size: fontSize,
    color: fontColor,
    font,
  });

  const modifiedPdfBytes = await pdfDoc.save();
  await fs.writeFileSync(outputFilePath, modifiedPdfBytes);

  console.log("PDF stamped successfully!");
})();
