const fs = require("fs");
const path = require("path");
const fn = require("./func");

const pathWay = path.join(__dirname, "..", "legendas");

const simbols = [
  '.', '?', '-', ',', '"', '♪', "_", '<i>', '</i>', '\r', '[', ']', '(', ')'
]

const palavrasMaisUsadas = fn.composicao(
  fn.readDir,
  fn.endsFilter(".srt"),
  fn.mapFiles,
  fn.mescElementos,
  fn.separarTextPor('\n'),
  fn.removeVoid,
  fn.removePattern("-->"),
  fn.removeNumber,
  fn.removeChar(simbols),
  fn.mescElementos,
  fn.separarTextPor(' '),
  fn.removeVoid,
  fn.removeNumber,
  fn.agruparElementos,
  fn.ordenarPorAtrNum('qtde', 'dec'),
)

palavrasMaisUsadas(pathWay)
  .then(console.log)
  
  
