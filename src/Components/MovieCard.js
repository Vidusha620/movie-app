import { Col } from "react-bootstrap";

export const MovieCard = ({ title, description, imgUrl }) => {
  return (
    <Col size={12} sm={6} md={4}>
      <div className="movie-imgbox">
        <img src={imgUrl} />
        <div className="movie-txtx">
          <h4>{title}</h4>
          <span>{description}</span>
        </div>
      </div>
    </Col>
  )
}