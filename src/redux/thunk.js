import { fetchFilmCall, fetchFilmError, fetchFilmSuccess } from "./actions"
import { getAllFilmsAPI } from "./api"

export const getAllFilms = () => {
  return async (dispatch) => {
    dispatch(fetchFilmCall())
    try {
      let data;
      if (localStorage.getItem("films") !== null ) {
        data = localStorage.getItem("films")
        dispatch(fetchFilmSuccess(JSON.parse(data)))
      } else {
        const response = await getAllFilmsAPI()
        data = response.data
        if (data.status === "ok") {
          dispatch(fetchFilmSuccess(data.data.movies))
          localStorage.setItem("films", JSON.stringify(data.data.movies))
        } else {
          throw new Error("Что-то пошло не так")
        }
      }
    } catch (error) {
      dispatch(fetchFilmError(error.message))
    }
  }
}
