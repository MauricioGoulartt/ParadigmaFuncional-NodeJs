const fs = require("fs");
const path = require("path");
const fn = require("./func");

const pathWay = path.join(__dirname, "..", "legendas");

const simbols = [
  '.', '?', '-', ',', '"', '♪', "_", '<i>', '</i>', '\r', '[', ']', '(', ')'
]

fn.readDir(pathWay)
  .then(fn.endsFilter(".srt"))
  .then(fn.mapFiles)
  .then(fn.mescElementos)
  .then(fn.separarTextPor('\n'))
  .then(fn.removeVoid)
  .then(fn.removePattern("-->"))
  .then(fn.removeNumber)
  .then(fn.removeChar(simbols))
  .then(fn.mescElementos)
  .then(fn.separarTextPor(' '))
  .then(fn.removeVoid)
  .then(fn.removeNumber)
  .then(fn.agruparElementos)
  .then(fn.ordenarPorAtrNum('qtde', 'dec'))
  .then(console.log);
  
