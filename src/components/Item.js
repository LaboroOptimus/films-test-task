import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { cutDescription } from "../utils"
import { hideItem, showItem } from "../redux/actions"

const Item = ({ data, hidden }) => {
  const dispatch = useDispatch()

  const {
    id,
    title,
    genres,
    rating,
    year,
    description_full,
    language,
    torrents,
  } = data

  const handleHide = (e, id) => {
    e.preventDefault()
    dispatch(hideItem(id))
  }

  const handleShow = (e, id) => {
    e.preventDefault()
    dispatch(showItem(id))
  }

  return (
    <tr>
      <td data-label="Название фильма">{title}</td>
      <td data-label="Жанр">
        {genres?.map((item, index) => {
          return <span key={index}>{item}</span>
        })}
      </td>
      <td data-label="Рейтинг">{rating}</td>
      <td data-label="Год">{year}</td>
      <td data-label="Описание">{cutDescription(description_full)}</td>
      <td data-label="Язык">{language}</td>
      <td data-label="Ссылка на скачивание">
        {torrents?.map((item, index) => {
          return (
            <div key={item.url}>
              <a href={item.url}>Ссылка {index + 1}</a>
            </div>
          )
        })}
      </td>
      <td data-label="Действия">
        {!hidden && (
          <div>
            <a href="#" onClick={(e) => handleHide(e, id)}>
              Скрыть
            </a>
          </div>
        )}
        {hidden && (
          <div>
            <a href="#" onClick={(e) => handleShow(e, id)}>
              Показать
            </a>
          </div>
        )}
        <div>
          <Link
            to={{
              pathname: `/${hidden ? 'hidden': 'showed'}/${id}`,
            }}
          >
            Перейти
          </Link>
        </div>
      </td>
    </tr>
  )
}

export default Item
