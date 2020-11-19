
export const ENDPOINT = "https://happy-home-ipl-2020.herokuapp.com/";
// export const ENDPOINT = "http://localhost:4000";

export function socketPoint() {
	return ENDPOINT;
}

export function validateSpecialCharacters(sss) {
    var sts = false;
    if (!sss.includes("\\"))
    if (!sss.includes("^"))
    if (!sss.includes("~"))
    if (!sss.includes("/"))
      sts = true;
    return sts;
}

export function validateEmail(sss) {
    let sts = false;
    if (validateSpecialCharacters(sss)) {
      let xxx = sss.split("@");
      if (xxx.length === 2) {
        if (xxx[1].includes(".")) 
          sts = true;
      }
    }
    return sts;
}

export function hasGroup() {
  return ((localStorage.getItem("gid") !== "") && (localStorage.getItem("gid") !== "0"));
}
