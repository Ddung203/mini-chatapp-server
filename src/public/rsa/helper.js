// ! 1 - Hàm tìm UCLN của 2 số
const gcd = (a, b) => {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new Error("Tham số phải là số");
  }
  if (b === 0) {
    return a;
  } else {
    return gcd(b, a % b);
  }
};

//! 2 - Hàm kiểm tra 2 số có phải là số nguyên tố cùng nhau hay không
const kiemTra2soNTCungNhau = (a, b) => {
  return gcd(a, b) === 1;
};

//! 6 - Hàm tạo ra 2 số nguyên tố khác nhau có 6 chữ số
const ktraSoNguyenTo = (number) => {
  if (typeof number !== "number" || number !== Math.floor(number)) {
    throw new Error("Tham số đầu vào không hợp lệ");
  }
  for (let i = 2; i <= Math.floor(Math.sqrt(number)); i++) {
    if (number % i === 0) return false;
  }

  return number >= 2;
};

//! 6.1 - Hàm tạo số nguyên tố có 6 chữ số ngẫu nhiên

const sinhSoNguyenToNgauNhien = () => {
  let min = 1000;
  let max = 9999;
  let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  while (!ktraSoNguyenTo(randomNumber)) {
    randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return randomNumber; // number
};

const sinhSoNgauNhien = () => {
  let min = 2;
  let max = 99;
  let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  return randomNumber; // number
};

// Hàm chuyển đổi từ hệ hex sang bin

const hex2bin = (s) => {
  // string
  const mp = {
    0: "0000",
    1: "0001",
    2: "0010",
    3: "0011",
    4: "0100",
    5: "0101",
    6: "0110",
    7: "0111",
    8: "1000",
    9: "1001",
    A: "1010",
    B: "1011",
    C: "1100",
    D: "1101",
    E: "1110",
    F: "1111",
  };
  let bin = "";
  for (let i = 0; i < s.length; i++) {
    bin += mp[s[i]];
  }
  return bin; // string
};

// Hàm chuyển đổi từ hệ bin sang hex
function bin2hex(s) {
  // string
  const mp = {
    "0000": "0",
    "0001": "1",
    "0010": "2",
    "0011": "3",
    "0100": "4",
    "0101": "5",
    "0110": "6",
    "0111": "7",
    1000: "8",
    1001: "9",
    1010: "A",
    1011: "B",
    1100: "C",
    1101: "D",
    1110: "E",
    1111: "F",
  };
  let hex = "";
  for (let i = 0; i < s.length; i += 4) {
    let ch = "";
    ch += s[i];
    ch += s[i + 1];
    ch += s[i + 2];
    ch += s[i + 3];
    hex += mp[ch];
  }
  return hex; // string
}

// Hàm chuyển đổi từ hệ bin sang thập phân
function bin2dec(binary) {
  // number
  let decimal = 0;
  let i = 0;
  while (binary !== 0) {
    const dec = binary % 10;
    decimal += dec * Math.pow(2, i);
    binary = Math.floor(binary / 10);
    i++;
  }
  return decimal; // number
}

function binaryToDecimal(binaryNumber) {
  // string
  let decimalNumber = 0;
  let base = 1; // Base bắt đầu từ 2^0 = 1

  // Lặp qua từng bit của số nhị phân, bắt đầu từ phải sang trái
  for (let i = binaryNumber.length - 1; i >= 0; i--) {
    // Nếu bit là 1, thì cộng vào kết quả
    if (binaryNumber[i] === "1") {
      decimalNumber += base;
    }
    // Di chuyển sang bit tiếp theo bằng cách nhân cơ số lên 2
    base *= 2;
  }

  return decimalNumber; // number
}

function he10sang2(number) {
  // number
  if (number === 0) {
    return "0";
  }

  let binary = "";

  while (number > 0) {
    binary = (number % 2) + binary;
    number = Math.floor(number / 2);
  }

  // return Number(binary);
  return binary; // string
}

const VIETNAMESE_ALPHABET =
  "aAáÁạẠàÀảẢãÃăĂắẮặẶằẰẳẲẵẴâÂấẤậẬầẦẩẨẫẪbBcCdDđĐeEéÉẹẸèÈẻẺẽẼêÊếẾệỆềỀểỂễỄgGhHiIíÍịỊìÌỉỈĩĨkKlLmMnNoOóÓọỌòÒỏỎõÕôÔốỐộỘồỒổỔỗỖơƠớỚợỢờỜởỞỡỠpPqQrRsStTuUúÚụỤùÙủỦũŨưƯứỨựỰừỪửỬữỮvVxXyYýÝỵỴỳỲỷỶỹỸ" +
  "0123456789!@#$%^&*()_+-=[]{},.<>/?;:'\"\\|`~"; // 220

const N = VIETNAMESE_ALPHABET.length;
// console.log("N :>> ", N);

export {
  gcd,
  ktraSoNguyenTo,
  kiemTra2soNTCungNhau,
  sinhSoNguyenToNgauNhien,
  hex2bin,
  bin2hex,
  bin2dec,
  binaryToDecimal,
  he10sang2,
  VIETNAMESE_ALPHABET,
  N,
  sinhSoNgauNhien,
};
