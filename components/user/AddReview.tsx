import { Dialog, DialogProps, DialogTitle } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import Tesseract from "tesseract.js";
import wordsToNumbers from "words-to-numbers";
import styles from "./add-review.module.css";
import CircularProgressWithLabel from "../public/common/progressbar/CircularProgressWithLabel";
import { Constants } from "../public/constants/Constants";
import { AppContext } from "../../pages/_app";
import { v4 as uuidv4 } from "uuid";
import pinataSDK from "@pinata/sdk";
import axios from "axios";

interface VerifyAmazonInvoiceRequest {
  productName: string;
  orderNumber: string;
  invoiceNumber: string;
}

interface VerifyAmazonInvoiceResponse {
  valid: boolean;
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
  const { account, reviewContract } = useContext(AppContext);
  const [productName, setProductName] = useState<string>("");
  const [productPageLink, setProductPageLink] = useState<string>("");
  const [reviewTitle, setReviewTitle] = useState<string>("");
  const [review, setReview] = useState<string>("");
  const [invoiceImage, setInvoiceImage] = useState<File | null>(null);
  const [reviewImage, setReviewImage] = useState<File | null>(null);
  const [invoiceImageData, setInvoiceImageData] = useState<string>("");
  const [invoiceData, setInvoiceData] = useState<InvoiceData>();
  const [invoiceBuffer, setInvoiceBuffer] = useState<Buffer>();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [isInvoiceValid, setIsInvoiceValid] = useState<boolean>(false);

  useEffect(() => {
    if (progress === 100) setDialogOpen(false);
  }, [progress]);

  useEffect(() => {
    if (invoiceImageData !== "") extractInvoiceDataFromProcessedImage();
  }, [invoiceImageData]);

  useEffect(() => {
    if (invoiceData !== undefined) {
      console.log(invoiceData);
      verifyInvoice();
    }
  }, [invoiceData]);

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

    // verifyInvoice();
    setDialogOpen(false);
  }

  async function verifyInvoice() {
    let url = `${Constants.API_URL}/amazon-invoice/verify`;
    let payload: VerifyAmazonInvoiceRequest = {
      productName: invoiceData?.productName ?? "",
      orderNumber: invoiceData?.orderNumber ?? "",
      invoiceNumber: invoiceData?.invoiceNumber ?? "",
    };

    console.log(payload);

    fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(payload),
    })
      .then(async (res) => await res.json())
      .then((res) => {
        const response: VerifyAmazonInvoiceResponse = res;
        setIsInvoiceValid(response.valid);
        console.log(res);
      })
      .catch((err) => console.log(err));
  }

  async function addReview() {
    let imgHash = "";
    console.log("Adding image to ipfs");

    try {
      const formData = new FormData();
      formData.append("file", reviewImage as Blob);

      const resFile = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: formData,
        headers: {
          pinata_api_key: "3950d1fcef3a77c4ab54",
          pinata_secret_api_key:
            "fea027a87cd9927be70e44f43089048a3c50904f173e5c36469c57201db311c8",
          "Content-Type": "multipart/form-data",
        },
      });

      imgHash = resFile.data.IpfsHash;
      console.log(`https://gateway.pinata.cloud/ipfs/${imgHash}`);
    } catch (error) {
      console.log("Error sending File to IPFS: ");
      console.log(error);
    }

    console.log("Adding Review");
    reviewContract!!.methods
      .uploadPost(
        imgHash,
        invoiceData?.productName,
        productPageLink,
        invoiceData?.price,
        reviewTitle,
        4,
        review
      )
      .send({ from: account, gas: 900000 });
  }

  async function addImage() {
    try {
      const formData = new FormData();
      formData.append("file", invoiceImage as Blob);

      const resFile = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: formData,
        headers: {
          pinata_api_key: "3950d1fcef3a77c4ab54",
          pinata_secret_api_key:
            "fea027a87cd9927be70e44f43089048a3c50904f173e5c36469c57201db311c8",
          "Content-Type": "multipart/form-data",
        },
      });

      const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
      console.log(ImgHash);
    } catch (error) {
      console.log("Error sending File to IPFS: ");
      console.log(error);
    }
  }

  return (
    <div className={styles["add-review"]}>
      <div className={styles.container}>
        {isInvoiceValid ? (
          <></>
        ) : (
          <>
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
              onChange={(e) => {
                console.log("Inside file");
                setInvoiceImage(e.target.files ? e.target.files[0] : null);
                const data = e.target.files ? e.target.files[0] : null;
                const reader = new window.FileReader();
                reader.readAsArrayBuffer(data as Blob);
                reader.onloadend = () => {
                  console.log("Buffer data: ", Buffer.from(reader.result));
                  setInvoiceBuffer(Buffer.from(reader.result));
                };
              }}
              required
            />
          </>
        )}

        {isInvoiceValid ? (
          <input
            type="text"
            placeholder="Enter review title"
            onChange={(e) => setReviewTitle(e.target.value)}
          />
        ) : (
          <></>
        )}

        {isInvoiceValid ? (
          <textarea
            rows={15}
            defaultValue={review}
            onChange={(e) => setReview(e.target.value)}
          ></textarea>
        ) : (
          <></>
        )}

        {isInvoiceValid ? (
          <input
            type="file"
            placeholder="Choose file"
            onChange={(e) => {
              setReviewImage(e.target.files ? e.target.files[0] : null);
            }}
            required
          />
        ) : (
          <></>
        )}

        {/* {progress === 100 ? (
          <button onClick={extractInvoiceDataFromProcessedImage}>
            Verify Invoice
          </button>
        ) : (
          <button onClick={processInvoiceImage}>Extract Text</button>
        )} */}

        {isInvoiceValid ? (
          <button onClick={addReview}>Add Review</button>
        ) : (
          <button onClick={processInvoiceImage}>Verify Invoice</button>
        )}
      </div>

      <p className={styles["error-msg"]}>{"Error Message"}</p>

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
