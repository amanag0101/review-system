import Searchbar from "../common/searchbar/Searchbar";
import Filter from "../common/filter/Filter";
import styles from "./review.module.css";
import ItemBox from "./ItemBox";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../pages/_app";
import { useRouter } from "next/router";

export interface Image {
  hash: string;
  description: string;
}

export interface Post {
  id: string,
  productName: string,
  productLink: string,
  price: number,
  rating: number,
  reviewTitle: string
  review: string,
  image: Image,
  author: string
}

export default function Review() {
  const { account, reviewContract } = useContext(AppContext);
  const [postCount, setPostCount] = useState<number>(0);
  const [posts, setPosts] = useState<Post[]>([]);
  const router = useRouter();

  useEffect(() => {
    getPosts();
  }, []);

  async function getPosts() {
    const postCount: number = await reviewContract?.methods.postCount().call();
    setPostCount(postCount);

    let posts: Post[] = [];
    for (let i = 1; i <= postCount; i++) {
      const post = (await reviewContract?.methods.posts(i).call()) as Post;
      console.log(post);
      posts.push(post);
    }

    setPosts(posts);
  }

  return (
    <div className={styles.review}>
      <div className={styles.searchbar}>
        <Searchbar width={50} />
      </div>

      <div className={styles["container"]}>
        <div className={styles["col-1"]}>
          <Filter />
        </div>
        <div className={styles["col-2"]}>
          {posts.map((post) => {
            return (
              <div
                key={post.id}
                className={styles["item"]}
                onClick={() => {
                  router.push(`/reviews/${post.id}`);
                }}
              >
                <ItemBox
                  productName={post.productName}
                  productLink={post.productLink}
                  price={post.price}
                  rating={post.rating}
                  imageHash={post.image.hash}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
