import { readData, writeData } from "../firebase.js";

export async function getScoreOfSinhVien(name) {
  const scoreOfSinhVien = await readData(`examinees/${name}/sinhvien`);
  return scoreOfSinhVien;
}

export async function getScoreOfBgk(name) {
  const scoreOfBgk = await readData(`examinees/${name}/giamKhao`);
  //const scoreOfBgk = readData(`exmaniees`);
  return scoreOfBgk;
}

export async function getTotalScore(name) {
  const scoreOfBgk = await readData(`examinees/${name}/totalPoints`);
  return scoreOfBgk;
}


