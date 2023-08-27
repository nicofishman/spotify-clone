/** @type {import("eslint").Linter.Config} */
const config = {
	ignorePatterns: ['node_modules', 'dist', 'coverage', 'tailwind.config.cjs'],
	overrides: [
		{
			extends: [
				'plugin:@typescript-eslint/recommended-requiring-type-checking',
			],
			files: ['*.ts', '*.tsx'],
			parserOptions: {
				project: 'tsconfig.json',
			},
		},
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: './tsconfig.json',
	},
	plugins: ['@typescript-eslint'],
	extends: ['next/core-web-vitals', 'plugin:@typescript-eslint/recommended'],
	rules: {
		'@typescript-eslint/no-misused-promises': [
			'error',
			{
				checksVoidReturn: false,
			},
		],
		'@typescript-eslint/consistent-type-imports': [
			'warn',
			{
				prefer: 'type-imports',
				fixStyle: 'inline-type-imports',
			},
		],
		'@typescript-eslint/no-unused-vars': [
			'warn',
			{ argsIgnorePattern: '^_' },
		],
		'@typescript-eslint/ban-ts-comment': 'off',
	},
};

module.exports = config;
