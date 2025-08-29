import React from 'react';
import { Link } from 'react-router-dom';
import '../style/main.css';

export const MainPage = () => {
  return (
    <main className="main-page w-100">
      <div className="main-header text-center py-5 text-white">
        <h1 className="fw-bold display-3">Online-Анкеты</h1>
        <p className="lead fs-4">
          Размести свою анкету — и заказчики найдут тебя!
        </p>
        <Link to="/login/register" className="btn btn-light btn-lg mt-3 px-5">
          Зарегистрироваться
        </Link>
      </div>
      <section className="advantages-section py-5">
        <div className="row g-4 text-center w-100 m-0">
          <div className="col-12 col-md-4">
            <i className="bi bi-person-lines-fill display-3 text-primary"></i>
            <h3 className="mt-3">Создай анкету</h3>
            <p className="text-muted">
              Заполни данные о себе, укажи профессию, опыт и свои качества.
            </p>
          </div>
          <div className="col-12 col-md-4">
            <i className="bi bi-search display-3 text-primary"></i>
            <h3 className="mt-3">Будь видимым</h3>
            <p className="text-muted">
              Твоя анкета будет доступна заказчикам сразу после регистрации.
            </p>
          </div>
          <div className="col-12 col-md-4">
            <i className="bi bi-hand-thumbs-up-fill display-3 text-primary"></i>
            <h3 className="mt-3">Получай заказы</h3>
            <p className="text-muted">
              Клиенты смогут оставлять отзывы и лайки, а ты — находить новых
              заказчиков.
            </p>
          </div>
        </div>
      </section>
      <section className="cta-section text-center py-5">
        <h2 className="fw-bold display-5">Готов начать?</h2>
        <p className="fs-5 mb-4">Создай свою анкету прямо сейчас!</p>
        <Link to="/login/register" className="btn btn-primary btn-lg px-5">
          Добавить анкету
        </Link>
      </section>
    </main>
  );
};

export default MainPage;

// import React from 'react';
// import { useMockData } from '@shared/lib/dev';
// import '../style/main.css';
// const Main = () => {
//   const { error, initialize, progress, status } = useMockData();
//   const handleClick = () => {
//     initialize();
//   };
//   return (
//     <div className="container mt-5">
//       <div className="d-flex flex-column align-items-center text-center">
//         <h1 className="mb-3">Main Page</h1>
//         <h3 className="mb-4">Инициализация данных в FireBase</h3>
//         <ul className="list-unstyled mb-4">
//           <li>
//             <strong>Статус загрузки:</strong> {status}
//           </li>
//           <li>
//             <strong>Прогресс загрузки:</strong> {progress}%
//           </li>
//           {error && (
//             <li className="text-danger">
//               <strong>Ошибка:</strong> {error.message}
//             </li>
//           )}
//         </ul>
//         <button
//           className="btn btn-primary custom-init-button"
//           onClick={handleClick}
//         >
//           Инициализировать
//         </button>
//       </div>
//     </div>
//   );
// };
// export default Main;
