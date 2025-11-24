import React, { useEffect, useState } from "react";
import axios from "axios";

const NewsSection = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const ids = await axios.get(
          "https://hacker-news.firebaseio.com/v0/topstories.json"
        );
        const top = Array.isArray(ids.data) ? ids.data.slice(0, 5) : [];
        const details = await Promise.all(
          top.map((id) =>
            axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
          )
        );
        if (active) {
          setNews(details.map((n) => n.data));
        }
      } catch (e) {
        console.error(e);
      } finally {
        if (active) setLoading(false);
      }
    }

    load();
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="panel">
      <h3 className="panel-heading">Latest Tech News</h3>
      {loading ? (
        <p className="small">Loading...</p>
      ) : (
        <div className="news-list">
          {news.map((story) => (
            <div key={story.id} className="news-item">
              <a
                href={
                  story.url ||
                  `https://news.ycombinator.com/item?id=${story.id}`
                }
                target="_blank"
                rel="noreferrer"
              >
                {story.title}
              </a>
              <div className="news-meta">
                {story.score} points • by {story.by} •{" "}
                {new Date(story.time * 1000).toLocaleString()} • {story.type}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsSection;
