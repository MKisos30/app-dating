export function useAge(dateOfBirth) {
  const today = new Date();
  const birthdate = new Date(dateOfBirth);

  const age = (Date.parse(today) - Date.parse(birthdate)) / (365 * 24 * 3600 * 1000);

  const ageFull = age.toFixed(1);
  // console.log(ageFull);

  //const strAge = age.toString().slice(0, 2);

  //2.546494 - 2.
  // 15.65465465 - 15
  // console.log(strAge);

  return ageFull;

  // const dateParse = Date.parse(today);
  // const birthdateParse = Date.parse(birthdate);
  // const between = dateParse - birthdateParse;
  // const getAge = between / (365 * 24 * 3600 * 1000);

  // let age = today.getFullYear() - birthdate.getFullYear();
  // const m = today.getMonth() - birthdate.getMonth();
  // if (m < 0 || (m === 0 && today.getDate() < birthdate.getDate())) {
  //   age--;
  // }

  // return age;
}
