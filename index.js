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

  const perSymbolProbability = probabilities.map(({ char, probability }) => ({
    char,
    probability: (frequency[char] * (100 / text.length)) / 100,
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

  // Середня ентропія на символ
  const averageEntropy = totalEntropy / totalLength;

  // Кількість інформації (I)
  const informationAmount = totalEntropy * totalLength;

  return {
    averageEntropy,
    informationAmount,
    totalEntropy,
    maxEntropy,
    absoluteRedundancy,
    relativeRedundancy,
    frequency,
    perSymbolEntropy,
    perSymbolProbability,
  };
}

// Дані для аналізу
const text = "Perekhodko_Maksym_Anatoliyovych";

// Результати
const results = calculateEntropy(text);

console.log("Аналіз тексту:", text);
console.log("Частота символів:", results.frequency);
console.log("Середня ентропія на символ:", results.averageEntropy.toFixed(8));
console.log("Кількість інформації (I):", results.informationAmount.toFixed(8));
console.log("Загальна ентропія (H):", results.totalEntropy.toFixed(8));
console.log("Максимальна ентропія:", results.maxEntropy.toFixed(8));
console.log("Абсолютна надмірність:", results.absoluteRedundancy.toFixed(8));
console.log("Відносна надмірність:", results.relativeRedundancy.toFixed(8));

console.log("Ентропія кожного символу:");
results.perSymbolEntropy.forEach(({ char, entropy }) => {
  console.log(`  '${char}': ${entropy.toFixed(5)}`);
});

console.log(
  results.perSymbolEntropy.reduce((sum, { entropy }) => sum + entropy, 0)
);

console.log("Ймовірність кожного символу:");
results.perSymbolProbability.forEach(({ char, probability }) => {
  console.log(`${char}: ${probability.toFixed(10)}`);
});

console.log(
  results.perSymbolProbability.reduce(
    (sum, { probability }) => sum + probability,
    0
  )
);
