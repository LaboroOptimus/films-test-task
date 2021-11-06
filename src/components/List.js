import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllFilms } from "../redux/thunk"
import { setHiddenFilms } from "../redux/actions"
import { LoadingStatus } from "../redux/types"
import Item from "./Item"
import Preloader from "./Preloader"
import "./style.css"

const List = () => {
  const dispatch = useDispatch()
  const [all, showAll] = useState(true)
  const films = useSelector((state) => state.films)
  const status = useSelector((state) => state.fetchFilmsStatus)
  const isLoad = status === LoadingStatus.Success
  const hidden = useSelector((state) => state.hiddenFilms)

  useEffect(() => {
    dispatch(getAllFilms())
    dispatch(setHiddenFilms())
  }, [dispatch])

  const handleShowAll = (e) => {
    e.preventDefault()
    showAll(true)
  }

  const handleShowHidden = (e) => {
    e.preventDefault()
    showAll(false)
  }

  return (
    <div className="wrapper">
      <h1>Фильмы</h1>
      <div className="tabs">
        <button onClick={handleShowAll}>Все фильмы</button>
        <button onClick={handleShowHidden}>Скрытые</button>
      </div>
      {isLoad ? (
        <table>
          <thead>
            <tr>
              <th scope="col">Название фильма</th>
              <th scope="col">Жанр</th>
              <th scope="col">Рейтинг</th>
              <th scope="col">Год</th>
              <th scope="col">Описание</th>
              <th scope="col">Язык</th>
              <th scope="col">Ссылка на скачивание</th>
              <th scope="col">Действия</th>
            </tr>
          </thead>
          <tbody>
            {all
              ? films?.map((item) => {
                  return <Item key={item.id} data={item} hidden={false} />
                })
              : hidden?.map((item) => {
                  return <Item key={item.id} data={item} hidden={true} />
                })}
          </tbody>
        </table>
      ) : (
        <Preloader />
      )}
    </div>
  )
}

export default List
