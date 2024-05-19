import { gcd } from "./helper.js";

//! 2 - Hàm kiểm tra 2 số có phải là số nguyên tố cùng nhau hay không
const kiemTra2soNTCungNhau = (a, b) => {
  return gcd(a, b) === 1;
};

//! 3 - Hàm tính a mũ -1 mod b (Tìm phần tử nghịch đảo)
const phanTuNghichDao = (a, b) => {
  if (
    typeof a !== "number" ||
    typeof b !== "number" ||
    !kiemTra2soNTCungNhau(a, b)
  ) {
    throw new Error(
      "Tham số đầu vào không hợp lệ, không thể tìm phần tử nghịch đảo"
    );
  }

  let r_i_tru_2 = b;
  let r_i_tru_1 = a;

  let x_i_tru_2 = 0;
  let x_i_tru_1 = 1;

  for (let i = 1; r_i_tru_1 !== 1; i++) {
    let q = Math.floor(r_i_tru_2 / r_i_tru_1);
    // console.log("r_i_tru_2 | r_i_tru_1 :: ", r_i_tru_2, r_i_tru_1);

    let tmp_r = r_i_tru_1;
    r_i_tru_1 = r_i_tru_2 - q * r_i_tru_1;
    r_i_tru_2 = tmp_r;

    let tmp_x = x_i_tru_1;
    x_i_tru_1 = x_i_tru_2 - q * x_i_tru_1;
    x_i_tru_2 = tmp_x;
  }

  while (x_i_tru_1 < 0) {
    x_i_tru_1 += b;
  }

  return x_i_tru_1;
};

// console.log("phanTuNghichDao(18,23) = 9 = ", phanTuNghichDao(18, 23));
// console.log("phanTuNghichDao(35,79) = -9 | 70 = ", phanTuNghichDao(35, 79));
//console.log("phanTuNghichDao(6,6) =  ", phanTuNghichDao(6, 8)); // Không thể tìm phần tử nghịch đảo vì không phải 2 số nguyên tố cùng nhau

export default phanTuNghichDao;
