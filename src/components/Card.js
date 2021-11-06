import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { addComment, removeComment } from "../redux/actions"
import { useParams, useNavigate, Link } from "react-router-dom"
import "./style.css"

const Card = ({ hidden }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [item, setItem] = useState({})
  const [hiddenItems, setHiddenItems] = useState(
    JSON.parse(localStorage.getItem("hiddenFilms"))
  )
  const [showedItems, setShowedItems] = useState(
    JSON.parse(localStorage.getItem("films"))
  )
  const [comment, setComment] = useState("")

  useEffect(() => {
    let element
    if (hidden) {
      element = hiddenItems.filter((e) => e.id == id)
    } else {
      element = showedItems.filter((e) => e.id == id)
    }
    if (element.length === 0) {
      navigate("/")
    }
    setItem(element[0])
  }, [hiddenItems, showedItems])

  const handleChange = (e) => {
    setComment(e.target.value)
  }

  const handleAddComment = () => {
    dispatch(addComment(id, hidden, comment))
    if (hidden) {
      setHiddenItems(JSON.parse(localStorage.getItem("hiddenFilms")))
    } else {
      setShowedItems(JSON.parse(localStorage.getItem("films")))
    }
    setComment('')
  }

  const handleRemoveComment = (e, elementId, commentId) => {
      e.preventDefault()
      dispatch(removeComment(hidden, elementId, commentId))
      if (hidden) {
        setHiddenItems(JSON.parse(localStorage.getItem("hiddenFilms")))
      } else {
        setShowedItems(JSON.parse(localStorage.getItem("films")))
      }
  }

  return (
    <div className="wrapper">
      <h1 className='title'>{item.title}</h1>
      <Link to='/' className='breadcrumb'>К списку фильмов</Link>
      <div className="item-block">
        <img src={item.background_image_original} alt="" />
        <div className="item-info">
          <div className="item-info-row">
            <div className="item-info-label">Summary</div>
            <div className="item-info-value">{item.summary}</div>
          </div>
          <div className="item-info-row">
            <div className="item-info-label">Genres</div>
            <div className="item-info-value">
              {item.genres?.map((item, index) => {
                return <span key={index}>{item}</span>
              })}
            </div>
          </div>
          <div className="item-info-row">
            <div className="item-info-label">Rating</div>
            <div className="item-info-value">{item.rating}</div>
          </div>
          <div className="item-info-row">
            <div className="item-info-label">Duration</div>
            <div className="item-info-value">{item.runtime + " min"}</div>
          </div>
          <div className="item-info-row">
            <div className="item-info-label">Language</div>
            <div className="item-info-value">{item.language}</div>
          </div>
          <div className="item-info-row">
            <div className="item-info-label">Year</div>
            <div className="item-info-value">{item.year}</div>
          </div>
        </div>
      </div>
      <h2>Комментарии</h2>
      <div>
        <input placeholder='Введите комментарий' value={comment} onChange={handleChange} />
        <button className="add-comment-button" onClick={handleAddComment}>Добавить комментарий</button>
      </div>
      <div>
        {item.comments?.map((item) => {
          return (
          <div className='comment' key={item.id}>
              <span>{item.value}</span>
              <a href='#' onClick={(e) => handleRemoveComment(e, id, item.id)}>Удалить</a>
          </div>
          )
        })}
      </div>
    </div>
  )
}

export default Card
