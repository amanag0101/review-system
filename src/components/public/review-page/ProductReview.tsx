import Image from "next/image";
import styles from "./product_review.module.css";
import { Rating } from "@mui/material";

export default function ProductReview() {
  return (
    <div>
      <div className={styles["review"]}>
        <div className={styles["col-1"]}>
          <Image width={500} height={500} src="/img/iphone.jpg"></Image>
        </div>

        <div className={styles["col-2"]}>
          <h3 style={{ textAlign: "left", marginTop: "20px", marginLeft: "10px" }}>Specifications</h3>
          <div className={styles["specs"]}>
            <div className={styles["col-1"]}>
              <p>
                <b>Display</b>
              </p>
              <p>
                <b>Capacity</b>
              </p>
              <p>
                <b>Splash, Water, and Dust Resistant</b>
              </p>
              <p>
                <b>Camera and Video</b>
              </p>
              <p>
                <b>Front Camera</b>
              </p>
              <p>
                <b>In the Box</b>
              </p>
            </div>
            <div className={styles["col-2"]}>
              <p>6.7-inch Super Retina XDR display</p>
              <p>128GB, 256GB, 512GB, 1TB</p>
              <p>
                Ceramic Shield front, glass back and aluminum design, water and
                dust resistant (rated IP68 - maximum depth of 6 meters up to 30
                minutes)
              </p>
              <p>
                Dual-camera system: 12MP Main, 12MP Ultrawide with Portrait
                mode, Depth Control, Portrait Lighting, Smart HDR 4, and 4K
                Dolby Vision HDR video up to 60 fps
              </p>
              <p>
                12MP TrueDepth front camera with Portrait mode, Depth Control,
                Portrait Lighting, and Smart HDR 4
              </p>
              <p>iPhone with iOS 16, USB-C to Lightning Cable, Documentation</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles["actual"]}>
        <h2>User Reviews</h2>

        <div>
          <h3>Iphone 14 plus is good and outstanding</h3>
          <Rating
            name="half-rating-read"
            defaultValue={3.5}
            precision={0.5}
            readOnly
          />
          <p>
            I switched from android to iphone and found iphone is pretty fast
            and camera quality is good. branded product never fails.
          </p>
        </div>

        <div>
          <h3>Large screen, battery life</h3>
          <Rating
            name="half-rating-read"
            defaultValue={4}
            precision={0.5}
            readOnly
          />
          <p>
            No other phones have this kind of robustness, look n feel, battery
            and the large screen experience. Real surround sounds with
            unexpectedly little base unlike other mobiles. I am using Iphone
            first time. For first timers, this device is nirvana. Battery life
            is amazingly longer than anyone can expect(remember Nokia case)?
            People make fun of Iphones for its high price but trust me you get
            what you paid for. Iphone Plus is best deal for those who want
            everything in their mobile and dont want to spend beyond 1 lac.
          </p>
        </div>

        <div>
          <h3>Excellent product!!!!!</h3>
          <Rating
            name="half-rating-read"
            defaultValue={5}
            precision={0.5}
            readOnly
          />
          <p>
            Hey ! I am big fan apple products.At last I buy new brand new iPhone
            14 plus. I used over a month overall performance is excellent while
            compared to iPhone 13 & iPhone 14 are same but iPhone 14 plus screen
            size big & battery capacity is big .so i buy this mobile. But cost
            is very high this is cron. “In my opinion’s overall performance is
            excellent “ Pros: Display: 5/5 Camera: 5/5 (excellent) Battery: 5/5
            ( very good) Performance: 5/5 Cros: Cost: 3/5 Charger: NO
          </p>
        </div>
      </div>
    </div>
  );
}
