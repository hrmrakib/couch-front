declare module "react-select-country-list" {
  interface Country {
    value: string;
    label: string;
  }

  interface CountryList {
    getData: () => Country[];
  }

  const countryList: () => CountryList;
  export default countryList;
}
