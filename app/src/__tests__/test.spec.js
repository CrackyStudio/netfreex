import { ToCamelCase } from 'functions/stringCase';

describe('Convert string to camelCase', () => {
	test('Returns "myWord" for "my word', () => {
		expect(ToCamelCase('my word')).toBe('myWord');
	});
});
