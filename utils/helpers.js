module.exports = {
    format_date: date => {
      return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    },
    format_time: (date) => {
        return date.toLocaleTimeString();
    }
  };
  