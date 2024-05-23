import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import QRCode from "qrcode";

export const verifyPdf = async (pdfFile: File, stampLink: string) => {
  const text1 = "Verified By ";
  const text2 = "Unicever";
  const fontSize = 16; // Increased font size
  const textColor = rgb(0.6, 0.6, 0.6); // Muted color for the text
  const specialTextColor = rgb(1, 0, 1); // Fuchsia color for the special text
  const margin = 30;
  const pdfBytes = await pdfFile.arrayBuffer();
  const pdfDoc = await PDFDocument.load(pdfBytes);

  const page = pdfDoc.getPage(0); // Assuming you want to stamp the first page

  const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // Calculate the text width
  const textWidth1 = font.widthOfTextAtSize(text1, fontSize);

  // Get the width and height of the page
  const { width } = page.getSize();

  // Calculate the x and y positions for the bottom left corner
  const textXPosition = margin;
  const textYPosition = margin; // Adjusted y position

  // Draw the text on top of the background rectangle
  page.drawText(text1, {
    x: textXPosition,
    y: textYPosition,
    size: fontSize,
    color: textColor,
    font,
  });

  page.drawText(text2, {
    x: textXPosition + textWidth1,
    y: textYPosition,
    size: fontSize,
    color: specialTextColor,
    font,
  });

  const qrCodeImageData = await QRCode.toDataURL(stampLink);
  const qrCodeImageBuffer = Buffer.from(
    qrCodeImageData.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );

  // Embed QR Code Image in PDF
  const qrCodeImage = await pdfDoc.embedPng(qrCodeImageBuffer);
  const qrCodeSize = 50; // Adjust the size as needed

  const qrXPosition = width - qrCodeSize - margin;
  const qrYPosition = margin;
  // Add the QR Code Image to the page
  page.drawImage(qrCodeImage, {
    x: qrXPosition,
    y: qrYPosition,
    width: qrCodeSize,
    height: qrCodeSize,
  });

  const modifiedPdfBytes = await pdfDoc.save();
  const blob = new Blob([modifiedPdfBytes], { type: "application/pdf" });
  const formData = new FormData();
  formData.append("file", blob);
  return formData;
};
