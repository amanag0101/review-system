import { Dialog, DialogProps, DialogTitle } from "@mui/material";
import { useEffect, useState } from "react";
import Tesseract from "tesseract.js";
import wordsToNumbers from "words-to-numbers";
import styles from "./add-review.module.css";
import CircularProgressWithLabel from "../public/common/progressbar/CircularProgressWithLabel";
import { Constants } from "../public/constants/Constants";

interface VerifyAmazonInvoiceRequest {
  productName: string;
  orderNumber: string;
  invoiceNumber: string;
}

interface InvoiceData {
  isAmazon: boolean;
  isProductName: boolean;
  productName: string;
  invoiceDate: string;
  orderNumber: string;
  invoiceNumber: string;
  price: string;
}

export default function AddReview() {
  const [productName, setProductName] = useState<string>("");
  const [productPageLink, setProductPageLink] = useState<string>("");
  const [invoiceImage, setInvoiceImage] = useState<File | null>(null);
  const [invoiceImageData, setInvoiceImageData] = useState<string>("");
  const [invoiceData, setInvoiceData] = useState<InvoiceData>();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    if (progress === 100) setDialogOpen(false);
  }, [progress]);

//   useEffect(() => {
//     console.log(invoiceData);
//   }, [invoiceData]);

  function processInvoiceImage() {
    setDialogOpen(true);
    Tesseract.recognize(invoiceImage ?? "", "eng", {
      logger: (m) => {
        if (m.status === "recognizing text") setProgress(m.progress * 100);
      },
    }).then(({ data: { text } }) => {
      setInvoiceImageData(text);
    });
  }

  async function extractInvoiceDataFromProcessedImage() {
    const productNameRegex = new RegExp(productName, "mi");
    const isProductName =
      invoiceImageData.match(productNameRegex)?.index ?? false;

    const amazonRegex = /a\s*m\s*a\s*z\s*o\s*n/im;
    const isAmazon = invoiceImageData.match(amazonRegex)?.index === 0 ?? false;

    const invoiceDateRegex = /[\n\r][ \t]*Invoice Date :[ \t]*([^\n\r]*)/im;
    const invoiceDate = invoiceImageData.match(invoiceDateRegex)?.[1];

    const orderNumberRegex = /[\n\r][ \t]*Order Number:[ \t]*([^\n\r]*)/im;
    const orderNumber = invoiceImageData
      .match(orderNumberRegex)?.[1]
      .split(" ")[0];

    const invoiceNumber = invoiceImageData
      .match(orderNumberRegex)?.[1]
      .split(" ")[4];

    const amountInWordsRegex =
      /[\n\r][ \t]*Amount in Words:[ \t\s]*([^\n\r]*)/im;
    let amountInWords = invoiceImageData.match(amountInWordsRegex)?.[1];
    let price = wordsToNumbers(amountInWords ?? "") + "";
    price = price.split(" ")[0];

    setInvoiceData({
      isAmazon: isAmazon,
      isProductName: typeof isProductName === "number",
      productName: productName,
      invoiceDate: invoiceDate ?? "",
      orderNumber: orderNumber ?? "",
      invoiceNumber: invoiceNumber ?? "",
      price: price,
    });

    verifyInvoice();
    setDialogOpen(false);
  }

  async function verifyInvoice() {
    let url = `${Constants.API_URL}/amazon-invoice/verify`;
    let payload = {
      productName: invoiceData?.productName,
      orderNumber: invoiceData?.orderNumber,
      invoiceNumber: invoiceData?.invoiceNumber,
    };

    // console.log(payload);

    fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(payload),
    })
      .then(async (res) => await res.json())
    //   .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  return (
    <div className={styles["add-review"]}>
      <div className={styles.container}>
        <input
          type="text"
          placeholder="Enter product name"
          onChange={(e) => setProductName(e.target.value)}
          required
        />

        <input
          type="url"
          placeholder="Enter product page link"
          onChange={(e) => setProductPageLink(e.target.value)}
        />

        <input
          type="file"
          placeholder="Choose file"
          onChange={(e) =>
            setInvoiceImage(e.target.files ? e.target.files[0] : null)
          }
          required
        />

        <textarea rows={15} defaultValue={invoiceImageData}></textarea>

        {progress === 100 ? (
          <button onClick={extractInvoiceDataFromProcessedImage}>
            Verify Invoice
          </button>
        ) : (
          <button onClick={processInvoiceImage}>Extract Text</button>
        )}
      </div>

      <Dialog open={dialogOpen} maxWidth={"xl" as DialogProps["maxWidth"]}>
        <DialogTitle style={{ color: "#000" }}>
          Processing Image ...
        </DialogTitle>
        <CircularProgressWithLabel
          style={{ color: "#000" }}
          variant="determinate"
          value={progress}
        />
      </Dialog>
    </div>
  );
}
