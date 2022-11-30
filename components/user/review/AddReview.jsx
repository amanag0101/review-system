import { useState } from 'react';
import Tesseract from 'tesseract.js';
import wordsToNumbers from 'words-to-numbers';
import styles from "./add_review.module.css";

export default function AddReview() {
    const [isLoading, setIsLoading] = useState(false);
    const [image, setImage] = useState();
    const [data, setData] = useState('');
    const [productName, setProductName] = useState(''); 
    // const [product, setProduct] = useState<{
    //     productName: '',
    //     isProductName: false,
    //     isAmazon: false,
    //     price: 0,
    //     orderNumber: '',
    //     invoiceNumber: ''
    // }>({});
    
    const verifyInvoice = () => {
        setIsLoading(true);
        Tesseract.recognize(
          image,
          'eng',
          { logger: m => console.log(m) }
        ).then(({ data: { text } }) => {
          console.log(text);
          setData(text);
          setIsLoading(false)
        })
    }

    const getInvoiceDetails = () => {
        let result = data?.match(new RegExp(productName, 'mi'));
        const isProductName = result?.index >= 0; 
        let temp = result?.index >= 0;
        // console.log("isProductNameCorrect: " + temp);

        let amazon = /a\s*m\s*a\s*z\s*o\s*n/mi;
        const isAmazon = data?.match(amazon).index === 0; 
        temp = data?.match(amazon).index === 0;
        // console.log("isAmazonPresent: " + temp);

        let invoiceDate = /[\n\r][ \t]*Invoice Date :[ \t]*([^\n\r]*)/mi;
        temp = data?.match(invoiceDate)?.[1];
        let invoiceDate1 = temp;
        // console.log("Invoice Date: " + temp);

        let orderNumber = /[\n\r][ \t]*Order Number:[ \t]*([^\n\r]*)/mi;
        temp = data?.match(orderNumber)?.[1];
        let orderNumber1 = temp;
        // console.log("Order Number: " + temp);
        // console.log(data.match(orderNumber));

        let amountInWords = /[\n\r][ \t]*Amount in Words:[ \t\s]*([^\n\r]*)/mi;
        temp = data?.match(amountInWords)?.[1];
        let price = wordsToNumbers(temp);
        let price1 = price.split(" ")[0];
        // console.log("Amount in words: " + temp);
        // console.log(data.match(amountInWords));
        // console.log("Price: " + price.split(" ")[0]);

        const productTemp = {
            isAmazon: isAmazon,
            productName: productName,
            isProductName: isProductName,
            invoiceDate: invoiceDate1,
            orderNumber: orderNumber1.split(" ")[0],
            invoiceNumber: orderNumber1.split(" ")[3],
            price: price1
        }

        console.log(productTemp);
    }

    return (
        <div className={styles["add-review"]}>
            <div className={styles.container}> 
                <input type="text" placeholder="Enter product name" value={productName} onChange={e => setProductName(e.target.value)} />
                <input type="url" placeholder="Enter product page link" />
                <input type="file" placeholder="Choose file" onChange={e => setImage(URL.createObjectURL(e.target.files[0]))}/>
                
                <textarea rows={15} value={data}></textarea> 

                <button onClick={verifyInvoice}>Verify Invoice</button>
                <button onClick={getInvoiceDetails}>Get invoice details</button>
            </div>
        </div>
    )
}

/*

am azon_l n Tax Invoice/Bill of Supply/Cash Memo
N’ (Original for Recipient)
Sold By : Billing Address :
Appario Retail Private Ltd Yuvam Sharma
"Kh No 18//21, 19//25, 34//5, 6, 7/1 min, 14/2/2 A-4/415, Paschim Vihar
min, 15/1 min, 27, 35//1, 7, 8, 9/1, 9/2, 10/1, 10/2, New Delhi, DELHI, 110063
11 min, 12, 13, 14, Village - Jamalpur IN
Gurgaon, Haryana, 122503 State/UT Code:07
IN
Shipping Address :
PAN No:AALCAO0171E Yuvam Sharma
GST Registration No:06AALCA0171E1Z3 Yuvam Sharma
Dynamic QR Code: A-4/415, Paschim Vihar
Ess i New Delhi, DELHI, 110063
e IN
,gg‘ State/UT Code:07
‘jﬁ’ Place of supply:DELHI
o Place of delivery:DELHI
Order Number:408-4817272-6325939 Invoice Number :DEL4-2169488
Order Date:26.09.2022 Invoice Details :HR-DEL4-1034-2223
Invoice Date :26.09.2022
o Tax |Tax (Tax Total
Mpeserpton il ool e Benouni Ao |
1 |boAt Newly Launched Wave Style with 1.69" Square
HD Display, HR & SpO2 Monitoring, 7 Days Battery
Life, Multiple Watch Faces, Crest App Health _ -l g0, -
Ecosystem, Multiple Sports Modes, IP68(Active Black) | 11,100.85| 20.00 | 1 [31,100.85/18% IGST| 3198.15|31,209.00
BOB7JTQM6Y ( BOB7JTQM6Y )
HSN:85176290
Shipping Charges 12712 [ -R127.12 20.00 [18%|IGST| R0.00 | R0.00
Amount in Words:
One Thousand Two Hundred Ninety-nine only
For Appario Retail Private Ltd:
4.
Authorized Signatory
Whether tax is payable under reverse charge - No
c,u:u:;; s desil km s ‘;’m:\ \», t:u H u‘;"\ credit are um;gu: 0 :ru\h;‘ :\ Business L\::Vw“w and p \a U;Y n:j:cu‘ ’, business from Busi ‘;;;4:\‘;\;\‘:4:‘1 ers
Please note that this invoice is not a demand for payment o


*/