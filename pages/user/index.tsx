import Layout from "../../src/components/common/layout/Layout";
import Review from "../../src/components/public/review/Review";

export default function User() {
    return (
        <div>
            <Layout children={<Review />} />
        </div>
    );
}