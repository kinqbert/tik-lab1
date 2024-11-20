import { readFileSync } from "fs";

function calculateEntropy(text) {
  const frequency = {};
  const totalLength = text.length;

  // Підрахунок частоти кожного символу
  for (const char of text) {
    frequency[char] = (frequency[char] || 0) + 1;
  }

  // Обчислення ймовірностей
  const probabilities = Object.entries(frequency).map(([char, count]) => ({
    char,
    count,
    probability: count / totalLength,
  }));

  // Ентропія кожного символу
  const perSymbolEntropy = probabilities.map(({ char, probability }) => ({
    char,
    entropy: -probability * Math.log2(probability),
  }));

  // Загальна ентропія
  const totalEntropy = perSymbolEntropy.reduce(
    (sum, { entropy }) => sum + entropy,
    0
  );

  // Максимальна ентропія
  const maxEntropy = Math.log2(Object.keys(frequency).length);

  // Абсолютна та відносна надмірність
  const absoluteRedundancy = maxEntropy - totalEntropy;
  const relativeRedundancy = absoluteRedundancy / maxEntropy;

  // Кількість інформації
  const informationAmount = totalEntropy * totalLength;

  // Середня ентропія на символ
  const averageEntropy = totalEntropy / totalLength;

  return {
    totalEntropy,
    maxEntropy,
    absoluteRedundancy,
    relativeRedundancy,
    informationAmount,
    averageEntropy,
    frequency,
    perSymbolEntropy,
    totalLength,
  };
}

function analyzeFile(filePath) {
  const text = readFileSync(filePath, "utf8");
  return calculateEntropy(text);
}

// Використання програми
const files = [
  { lang: "uk", lengths: ["short", "mid", "long"] },
  { lang: "en", lengths: ["short", "mid", "long"] },
  { lang: "de", lengths: ["short", "mid", "long"] },
];

const informaticResults = files.map(({ lang, lengths }) => {
  const [short, mid, long] = lengths.map((length) => {
    const filePath = `informatics_${lang
      .slice(0, 2)
      .toLowerCase()}_${length}.txt`;
    return analyzeFile(filePath).totalEntropy.toFixed(5); // Точність до 5 знаків
  });

  return { Мова: lang, Короткий: short, Середній: mid, Довгий: long };
});

console.table({
  Українська: informaticResults[0],
  Англійська: informaticResults[1],
  Німецька: informaticResults[2],
});

const commonResults = files.map(({ lang, lengths }) => {
  const [short, mid, long] = lengths.map((length) => {
    const filePath = `common_${lang.slice(0, 2).toLowerCase()}_${length}.txt`;
    return analyzeFile(filePath).totalEntropy.toFixed(5); // Точність до 5 знаків
  });

  return { Мова: lang, Короткий: short, Середній: mid, Довгий: long };
});

console.table({
  Українська: commonResults[0],
  Англійська: commonResults[1],
  Німецька: commonResults[2],
});
