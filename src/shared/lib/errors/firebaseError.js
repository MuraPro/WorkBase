import { toast } from 'react-toastify';

export function handleFirebaseError(error) {
  const message = error?.response?.data?.error?.message;
  const code = error?.response?.status;
  const commentErrorMessage = error?.response?.data?.error;

  if (code === 401 && commentErrorMessage === 'Permission denied') {
    toast.error('Вы не можете удалить чужой комментарий');
    return;
  }

  switch (message) {
    case 'EMAIL_NOT_FOUND':
      toast.error('Пользователь с таким Email не найден');
      break;

    case 'INVALID_PASSWORD':
      toast.error('Email или пароль введены некорректно');
      break;

    case 'USER_DISABLED':
      toast.error('Этот аккаунт был отключен администратором');
      break;

    case 'EMAIL_EXISTS':
      toast.error('Пользователь с таким Email уже существует');
      break;

    case 'OPERATION_NOT_ALLOWED':
      toast.error('Вход с паролем отключён для этого проекта');
      break;

    case 'TOO_MANY_ATTEMPTS_TRY_LATER':
      toast.error('Слишком много попыток. Попробуйте позже');
      break;

    default:
      if (code === 400) {
        toast.error('Неверный запрос. Проверьте данные.');
      } else if (code === 401) {
        toast.error('Нет доступа. Авторизуйтесь снова.');
      } else if (code === 403) {
        toast.error('Доступ запрещён.');
      } else if (code === 404) {
        toast.error('Ресурс не найден.');
      } else if (code === 500) {
        toast.error('Ошибка сервера. Попробуйте позже.');
      } else {
        toast.error('Произошла неизвестная ошибка. Попробуйте снова.');
      }

      throw new Error('Произошла неизвестная ошибка. Попробуйте снова.');
  }
}
