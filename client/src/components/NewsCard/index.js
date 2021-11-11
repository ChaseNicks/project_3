import React, { useState, useEffect } from "react";
import NewsItem from "../NewsItem";

import { getNews } from "../../utils/API";
import "./styles/newsCard.css";

const NewsCard = (props) => {
  const [newsState, setNewsState] = useState([]);
  const symbol = props.symbol;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const news = await getNews(symbol);
        setNewsState(news.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchNews();
  }, [symbol]);

  const currentNews = newsState;

  return (
    <div className="container news-container">
      <div className="is-capitalized is-size-3 has-text-left">
        Trending Stories
      </div>
      <div className="columns">
        <div className="column">
          <article className="card news-card">
            {currentNews.map((newsItem) => (
              <NewsItem
                key={newsItem.id}
                name={newsItem.name}
                title={newsItem.title}
                description={newsItem.description}
                url={newsItem.url}
                image={newsItem.image}
              />
            ))}
          </article>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
