const defaultDelimiters = /[-!$%^&*()_+|~=`{}[\]:";'<>?,./\\ ]/

export default (text) => {
      return text ? String(text).replace(new RegExp(defaultDelimiters, 'g'), '') : text
}