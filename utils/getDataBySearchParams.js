export const getDataBySearchParams = (data, searchParam) => {
  const { country, continent, is_open_to_public } = searchParam;
  if (country) {
    data = data.filter(
      (item) => item.country.toLowerCase() === country.toLowerCase(),
    );
  }
  if (continent) {
    data = data.filter(
      (item) => item.continent.toLowerCase() === continent.toLowerCase(),
    );
  }

  if (is_open_to_public) {
    data = data.filter(
      (item) => item.is_open_to_public === JSON.parse(is_open_to_public),
    );
  }
  return data;
};
