import { RegexBuilder } from './builder/RegexBuilder'

export { RegexBuilder } from './builder/RegexBuilder'
export { ComponentFactory } from './factories/ComponentFactory'
export { CommonPatterns } from './patterns/CommonPatterns'
export { RegexFlags } from './enums/RegexFlags'
export { CharacterClasses } from './enums/CharacterClasses'
export { Quantifier } from './quantifiers/Quantifier'
export { RegexValidator } from './validators/RegexValidator'

// Convenience exports
export const regex = () => RegexBuilder.create()
export const pattern = () => RegexBuilder.create()
