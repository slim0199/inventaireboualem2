import React from "react"
import Card from "./card"

const Articles = ({ articles }) => {
  return (
    <div>
      <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
        <div>
          {articles.data.map((article, i) => {
            return <Card article={article} key={`article__${article.id}`} />
          })}
        </div>
      </div>
    </div>
  )
}

export default Articles
