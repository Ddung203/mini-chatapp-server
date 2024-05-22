import {
  N,
  VIETNAMESE_ALPHABET,
  bin2dec,
  binaryToDecimal,
  he10sang2,
  kiemTra2soNTCungNhau,
  sinhSoNguyenToNgauNhien,
} from "./helper.js";
import phanTuNghichDao from "./phanTuNghichDao.js";
import a_mu_b_mod_n from "./a_mu_b_mod_n.js";

const p = sinhSoNguyenToNgauNhien();
const q = sinhSoNguyenToNgauNhien();

console.log("{p,q} = ", { p, q });

const n = p * q;

const phi = (p - 1) * (q - 1);

let e = sinhSoNguyenToNgauNhien(phi);
while (!kiemTra2soNTCungNhau(e, phi)) e = sinhSoNguyenToNgauNhien();

console.log("\ne = ", e);

const d = phanTuNghichDao(e, phi);

console.log("\nPublic key: ", { n, e });
console.log("Private key: ", { n, d });

const VIETNAMESE_ALPHABET_FOR_RSA = VIETNAMESE_ALPHABET + "_"; // 179

const maHoaRSA = (plaintext, isBin = false) => {
  if (typeof plaintext === "string") {
    plaintext = plaintext.trim().replaceAll(" ", "_");

    let c_text = "";

    for (let i = 0; i < plaintext.length; i++) {
      const index = VIETNAMESE_ALPHABET_FOR_RSA.indexOf(plaintext[i]);
      if (index === -1) {
        throw new Error("Tham số đầu vào chứa kí tự không hợp lệ");
      } else {
        c_text += a_mu_b_mod_n(index, e, n) + "-";
      }
    }
    return c_text;
  }

  if (isBin) {
    plaintext = bin2dec(plaintext); // 10
    return he10sang2(a_mu_b_mod_n(plaintext, e, n)); // c
  }

  return a_mu_b_mod_n(plaintext, e, n); // c
};

const giaiMaRSA = (ciphertext, isBin = false) => {
  if (typeof ciphertext === "string" && isBin === false) {
    let plaintext = "";
    ciphertext = ciphertext.trim().split("-");

    for (let i = 0; i < ciphertext.length - 1; i++) {
      let index = a_mu_b_mod_n(Number(ciphertext[i]), d, n);
      plaintext += VIETNAMESE_ALPHABET_FOR_RSA[index];
    }
    return plaintext.replaceAll("_", " ");
  }

  if (isBin) {
    ciphertext = binaryToDecimal(ciphertext);
    return he10sang2(a_mu_b_mod_n(ciphertext, d, n)); // m
  }
  return a_mu_b_mod_n(ciphertext, d, n); // m
};

// TH 1: m = 32
console.log("\n=== TH 1 ==");

const m = 10;
console.log("m input :: ", m);

const C = maHoaRSA(m);
console.log("C :: ", C);

const M = giaiMaRSA(C);
console.log("M :: ", M);

// TH 2: m = 1010
console.log("\n=== TH 2 ==");

const maNhiPhan = 1010;
console.log("\nmaNhiPhan input :: ", maNhiPhan);

const C_maNhiPhan = maHoaRSA(maNhiPhan, true);
console.log("C_maNhiPhan :: ", C_maNhiPhan);

const M_maNhiPhan = giaiMaRSA(C_maNhiPhan, true);
console.log("M_maNhiPhan :: ", M_maNhiPhan);

// TH 3:
console.log("\n=== TH 3 ==");
const input = "Dương Văn Dũng";
console.log("input :>> ", input);

const C_2 = maHoaRSA(input);
console.log("C :: ", C_2);

const M_2 = giaiMaRSA(C_2);
console.log("M :: ", M_2);
