module.exports = {
    roots: ['<rootDir>'],
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
    preset: 'ts-jest',
    testEnvironment: 'node',
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
    testPathIgnorePatterns: ['/dist/', '/__tests__/helper/', '/__tests__/fixtures/'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
}
