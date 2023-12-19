// eslint.config.js
import antfu from '@antfu/eslint-config'

export default antfu({
  typescript: true,
  rules: {
    // 不打开 import type 校验，避免 controller 中有类型声明导致校验报错
    'ts/consistent-type-imports': 'off',
  },
})
