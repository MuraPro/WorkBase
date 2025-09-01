export function validator(data, config) {
  const errors = {};
  function validate(validateMethod, data, config) {
    let statusValidate;
    switch (validateMethod) {
      case 'isRequired': {
        if (typeof data === 'boolean') {
          statusValidate = !data;
        } else if (Array.isArray(data)) {
          statusValidate = data.length === 0;
        } else if (typeof data === 'string') {
          statusValidate = data.trim() === '';
        } else if (data === null || data === undefined) {
          statusValidate = true;
        } else {
          statusValidate = false;
        }
        break;
      }
      case 'isEmail': {
        const emailRegExp = /^\S+@\S+\.\S+$/g;
        statusValidate = !emailRegExp.test(data);
        break;
      }
      case 'isCapitalSymbol': {
        const capitalRegExp = /[A-Z]+/g;
        statusValidate = !capitalRegExp.test(data);
        break;
      }
      case 'isContainDigit': {
        const digitRegExp = /\d+/g;
        statusValidate = !digitRegExp.test(data);
        break;
      }
      case 'min': {
        statusValidate = data.length < config.value;
        break;
      }
      case 'max': {
        statusValidate = (data || '').length > config.value;
        break;
      }
      case 'minIfNotEmpty': {
        const s = (data || '').trim();
        statusValidate = s.length > 0 && s.length < config.value;
        break;
      }
      case 'noHTML': {
        const re = /<\/?[a-z][\s\S]*>/i;
        statusValidate = re.test(String(data || ''));
        break;
      }
      case 'noCyrillic': {
        const cyrillicRegExp = /[\u0400-\u04FF]/;
        statusValidate = cyrillicRegExp.test(String(data || ''));
        break;
      }
      case 'isImageUrl': {
        if (data && typeof data === 'string' && data.trim() !== '') {
          const urlRegExp = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg))$/i;
          statusValidate = !urlRegExp.test(data.trim());
        } else {
          statusValidate = false;
        }
        break;
      }
      default:
        break;
    }
    if (statusValidate) return config.message;
  }
  for (const fieldName in data) {
    if (!config[fieldName]) continue;
    for (const validateMethod in config[fieldName]) {
      const error = validate(
        validateMethod,
        data[fieldName],
        config[fieldName][validateMethod]
      );
      if (error && !errors[fieldName]) {
        errors[fieldName] = error;
      }
    }
  }
  return errors;
}
