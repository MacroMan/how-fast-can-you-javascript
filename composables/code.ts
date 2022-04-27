const defaultCode = `function init(data) {
    // All code must reside in this function and return an answer

    return data;
}`

const testOne = {
  description: `// data will be a multi-dimensional array containing numbers
// Return the sum of all numbers

${defaultCode}`,
  data: [
    {
      input: [12, 14],
      output: 26,
      status: false,
    },
    {
      input: [45.65, 66544],
      output: 66589.65,
      status: false,
    },
    {
      input: [[12,"11"], "not a number", [[[[[[['Like this?', 124]]],[9928.124]]],"3.1415"]]],
      output: 10078.2655,
      status: false,
    },
  ],
};

const testTwo = {
  description: `// data will be an array with words
// Return an array sorted by the second letter of each word

${defaultCode}`,
  data: [
    {
      input: ['Lorem', 'ipsum', 'dolor', 'sit', 'amet'],
      output: ['sit', 'amet', 'Lorem', 'dolor', 'ipsum'],
      status: false,
    },
    {
      input: ['mi', 'mattis', 'non', 'scelerisque', 'imperdiet', 'mauris'],
      output: ['mattis', 'mauris', 'scelerisque', 'mi', 'imperdiet', 'non'],
      status: false,
    },
  ],
};

const testThree = {
  description: `// data will be an array numbers
// Return a sum of the numbers

${defaultCode}`,
  data: [
    {
      input: [12, 64, 74.5, "65"],
      output: 215.5,
      status: false,
    },
    {
      input: [14, 5, 123.5, 657885],
      output: 658027.5,
      status: false,
    },
  ],
};

export const tests = [
  testThree,
  testOne,
  testTwo,
]


