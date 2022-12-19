const fs = require("fs");
const path = require("path");

function composicao(...fns) {
  return function(valor) {
      return fns.reduce(async (acc, fn) => {
          if(Promise.resolve(acc) === acc) {
              return fn(await acc)
          } else {
              return fn(acc)
          }
      }, valor)
  }
}

function readDir(pathRoad) {
  return new Promise((resolve, reject) => {
    let path_var = fs.readdirSync(pathRoad);
    try {
      path_var = path_var.map((files) => path.join(pathRoad, files));
      resolve(path_var);
    } catch (e) {
      reject(e);
    }
  });
}

function readFile(file) {
  return new Promise((resolve, reject) => {
    try {
      const conteudo = fs.readFileSync(file, { encoding: "utf-8" });
      resolve(conteudo.toString());
    } catch (e) {
      reject(console.error(e));
    }
  });
}

function mapFiles(files) {
  return Promise.all(files.map((file) => readFile(file)));
}

function endsFilter(pattern) {
  return (arr) => arr.filter((arr) => arr.endsWith(pattern));
}

function removeVoid(array) {
  return array.filter((el) => el.trim());
}

function removePattern(stringPattern) {
  return function (array) {
    return array.filter((el) => !el.includes(stringPattern));
  };
}

function removeNumber(array) {
  return array.filter((el) => {
    const num = parseInt(el.trim());
    return num !== num;
  });
}

function removeChar(simbols) {
  return function (arr) {
    return arr.map((el) => {
      let newText = el;
      simbols.forEach((simbols) => {
        newText = newText.split(simbols).join("");
      });
      return newText
    });
  };
}

function mescElementos(array) {
  return array.join(' ')
}

function separarTextPor(simbolo) {
  return function(texto) {
    return texto.split(simbolo)
  }
}

function agruparElementos(palavras) {
  return Object.values(palavras.reduce((acc, palavra) => {
    const p = palavra.toLowerCase()
    const qtde = acc[p] ? acc[p].qtde + 1 : 1
    acc[p] = { elemento: p, qtde }

    return acc
  }, {}))
}

function ordenarPorAtrNum(attr, ordem = 'asc') {
  return function(arr) {
    const asc = (obj1, obj2) => obj1[attr] - obj2[attr]
    const dec = (obj1, obj2) => obj2[attr] - obj1[attr]
    return arr.sort(ordem === 'asc' ? asc : dec)
  }
}

module.exports = {
  composicao,
  readDir,
  endsFilter,
  mapFiles,
  readFile,
  removeVoid,
  removePattern,
  removeNumber,
  removeChar,
  separarTextPor,
  mescElementos,
  agruparElementos,
  ordenarPorAtrNum
};
