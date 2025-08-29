export const validatorConfig = {
  name: {
    isRequired: {
      message: 'Имя обязательно для заполнения',
    },
    min: {
      message: 'Имя должно состоять минимум из 3 символов',
      value: 3,
    },
  },
  email: {
    noCyrillic: {
      message: 'Используйте английские буквы для ввода',
    },
    isRequired: {
      message: 'Электронная почта обязательна для заполнения',
    },
    isEmail: {
      message: 'Email введен некорректно',
    },
  },
  password: {
    noCyrillic: {
      message: 'Используйте английские буквы для ввода',
    },
    isRequired: {
      message: 'Пароль обязателен для заполнения',
    },
    isCapitalSymbol: {
      message: 'Пароль должен содержать хотя бы одну заглавную букву',
    },
    isContainDigit: {
      message: 'Пароль должен содержать хотя бы одно число',
    },
    min: {
      message: 'Пароль должен состоять минимум из 8 символов',
      value: 8,
    },
  },
  about: {
    minIfNotEmpty: {
      message: 'Минимум 20 символов, если заполняете это поле',
      value: 20,
    },
    max: {
      message: 'Максимум 300 символов',
      value: 300,
    },
    noHTML: {
      message: 'HTML-теги в этом поле запрещены',
    },
  },
  profession: {
    isRequired: {
      message: 'Обязательно выберите вашу профессию',
    },
  },
  qualities: {
    isRequired: {
      message: 'Выберите хотя бы одно качество',
    },
  },
  licence: {
    isRequired: {
      message: 'Требуется подтверждение лицензионного соглашения',
    },
  },
  userId: {
    isRequired: {
      message: 'Выберите от чьего имени вы хотите отправить сообщение',
    },
  },
  content: {
    isRequired: {
      message: 'Сообщение не может быть пустым',
    },
  },
};
