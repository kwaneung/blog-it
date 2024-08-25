require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  env: { browser: true, es2020: true },
  plugins: ['no-relative-import-paths', 'react', 'react-refresh', 'jsx-a11y', 'prettier'],
  extends: [
    '@rushstack/eslint-config/profile/web-app',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/jsx-runtime',
    'plugin:@tanstack/eslint-plugin-query/recommended',
  ],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    // <img> 엘리먼트에 유의미한 대체 텍스트가 있는지 체크
    'jsx-a11y/alt-text': [
      'warn',
      {
        elements: ['img'],
      },
    ],
    // 유효한 aria-* 속성만 사용
    'jsx-a11y/aria-props': 'warn',
    // 유효한 aria-* 상태/값만 사용
    'jsx-a11y/aria-proptypes': 'warn',
    // DOM에서 지원되는 role, ARIA만 사용
    'jsx-a11y/aria-unsupported-elements': 'warn',
    // 필수 ARIA 속성이 빠져있는지 체크
    'jsx-a11y/role-has-required-aria-props': 'warn',
    // ARIA 속성은 지원되는 role에서만 사용
    'jsx-a11y/role-supports-aria-props': 'warn',
    // DOM에 정의되지 않은 속성을 사용했는지 체크 (emotion css 속성 등 예외 케이스가 있으므로 기본은 off)
    'react/no-unknown-property': 'off',
    // 정의한 props 중에 빠진게 있는지 체크 (NextPage 등 일부 추상화 컴포넌트에서 복잡해지므로 기본은 off)
    'react/prop-types': 'off',

    // 근거: 타입 추론으로 충분한 곳에 타이핑을 강요함
    '@rushstack/typedef-var': 'off',
    // 근거: React 컴포넌트의 경우 17 이하에서는 `undefined`가 아닌
    //      `null`을 리턴할 수 있기 때문에 사용하지 않음
    '@rushstack/no-new-null': 'off',
    // 근거: 상황에 따라 리턴 타입을 타입 추론에 맡기는 것이 나을수도 있음
    '@typescript-eslint/explicit-function-return-type': 'off',
    // 근거: 문서에 의하면 클래스를 많이 사용하는 프로젝트에서 사용할 수 있으나,
    //       팀 내 개발 패턴은 함수형을 지향하므로 불필요함
    '@typescript-eslint/explicit-member-accessibility': 'off',
    // 근거: useEffect 안에서 await 사용 불가
    '@typescript-eslint/no-floating-promises': 'off',
  },
  settings: {
    react: {
      // 현재 React 버전을 명시합니다.
      // 명시하지 않을 경우(기본값 'detect') React 라이브러리 전체를 불러오므로
      // 린트 과정에서 속도가 느려질 수 있습니다.
      version: 'detect',
    },
  },
  overrides: [
    {
      files: ['next.config.mjs', 'postcss.config.mjs'],
      parserOptions: {
        sourceType: 'module',
      },
    },
  ],
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
  },
};
