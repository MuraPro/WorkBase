import React from 'react';
import { useMockData } from '@shared/lib/dev';
import '../style/main.css';

const Main = () => {
  const { error, initialize, progress, status } = useMockData();
  const handleClick = () => {
    initialize();
  };
  return (
    <div className="container mt-5">
      <div className="d-flex flex-column align-items-center text-center">
        <h1 className="mb-3">Main Page</h1>
        <h3 className="mb-4">Инициализация данных в FireBase</h3>
        <ul className="list-unstyled mb-4">
          <li>
            <strong>Статус загрузки:</strong> {status}
          </li>
          <li>
            <strong>Прогресс загрузки:</strong> {progress}%
          </li>
          {error && (
            <li className="text-danger">
              <strong>Ошибка:</strong> {error.message}
            </li>
          )}
        </ul>
        <button
          className="btn btn-primary custom-init-button"
          onClick={handleClick}
        >
          Инициализировать
        </button>
      </div>
    </div>
  );
};
export default Main;
