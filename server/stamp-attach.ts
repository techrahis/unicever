import { PDFDocument, StandardFonts, rgb, degrees } from "pdf-lib";
// Replace with your actual file paths
// const inputFilePath = "./test.pdf";
// const outputFilePath = "./your_stamped_pdf.pdf";
import QRCode from "qrcode";

export const verifyPdf = async (pdfFile: File, stampLink: string) => {
  const verifiableText = "Verified by Unicever";
  const fontSize = 10;
  const fontColor = rgb(1, 1, 1); // White color for the text
  const bgColor = rgb(30 / 255, 58 / 255, 138 / 255); // Background color #1E3A8A
  const bgColor2 = rgb(1 / 255, 92 / 255, 45 / 255); // Background color #1E3A8A
  const bottomMargin = 10;
  const rightMargin = 30;
  const leftMargin = 30;
  const bytes = await pdfFile.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const pdfDoc = await PDFDocument.load(buffer);

  const page = pdfDoc.getPage(0); // Assuming you want to stamp the first page

  const font = await pdfDoc.embedFont(StandardFonts.TimesRoman);

  // Calculate the text width
  const textWidth = font.widthOfTextAtSize(stampLink, fontSize);

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
  // page.drawRectangle({
  //   x: xPosition - 4, // Adjust to add padding
  //   y: yPosition - 6, // Adjust to add padding
  //   width: textWidth + 8, // Adjust to add padding
  //   height: fontSize + 8, // Adjust to add padding
  //   color: bgColor,
  //   borderColor: bgColor,
  // });

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
  // page.drawText(stampLink, {
  //   x: xPosition,
  //   y: yPosition,
  //   size: fontSize,
  //   color: fontColor,
  //   font,
  // });

  const qrCodeImageData = await QRCode.toDataURL(stampLink);
  const qrCodeImageBuffer = Buffer.from(
    qrCodeImageData.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );

  // Embed QR Code Image in PDF
  const qrCodeImage = await pdfDoc.embedPng(qrCodeImageBuffer);
  const qrCodeSize = 50; // Adjust the size as needed

  const qrXPosition = width - qrCodeSize - rightMargin;
  const qrYPosition = bottomMargin;
  // Add the QR Code Image to the page
  page.drawImage(qrCodeImage, {
    x: qrXPosition,
    y: qrYPosition,
    width: qrCodeSize,
    height: qrCodeSize,
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
  const blob = new Blob([modifiedPdfBytes], { type: "application/pdf" });
  const formData = new FormData();
  formData.append("file", blob);
  return formData;
};
