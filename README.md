# Rexify Regex Builder

A professional TypeScript library for building readable regular expressions using readable API and method chaining with enterprise-grade architecture.

## Why Rexify Regex Builder?

Regular expressions are powerful but often unreadable and hard to maintain. This library provides a readable, chainable API that makes regex patterns readable, maintainable, and less error-prone.

### Before (Traditional Regex)

```javascript
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const phoneRegex = /^\(?(\d{3})\)?[-.\\s]?(\d{3})[-.\\s]?(\d{4})$/
```

### After (Rexify Regex Builder)

```typescript
const emailRegex = RegexBuilder.create()
  .startOfLine()
  .email()
  .endOfLine()
  .build()

const phoneRegex = RegexBuilder.create()
  .startOfLine()
  .phone()
  .endOfLine()
  .build()
```

## Features

- **🔗 Readable API**: Method chaining for readable regex construction
- **📝 TypeScript First**: Full type safety and IntelliSense support
- **🎯 Common Patterns**: Built-in patterns for email, phone, URL, IP address, etc.
- **🔍 Validation**: Built-in regex validation and error reporting
- **📚 Extensive Documentation**: Complete API documentation and examples

## Installation

```bash
npm install rexify-regex
```

```bash
yarn add rexify-regex
```

```bash
pnpm add rexify-regex
```

## Quick Start

```typescript
import { RegexBuilder, regex } from 'rexify-regex'

// Simple text matching
const pattern = RegexBuilder.create()
  .text('hello')
  .whitespace()
  .text('world')
  .build()

console.log(pattern.test('hello world')) // true

// Using convenience function
const quickPattern = regex().digits().text('-').letters().build()
```

## Basic Usage

### Text and Character Matching

```typescript
import { RegexBuilder } from 'rexify-regex'

// Match specific text
const textPattern = RegexBuilder.create().text('hello').build()

// Match digits
const digitPattern = RegexBuilder.create()
  .digit() // Single digit
  .digits() // One or more digits
  .build()

// Match letters
const letterPattern = RegexBuilder.create()
  .letter() // Single letter
  .letters() // One or more letters
  .build()

// Match word characters
const wordPattern = RegexBuilder.create()
  .word() // Single word character
  .words() // One or more word characters
  .build()
```

### Quantifiers

```typescript
// Optional matching
const optionalPattern = RegexBuilder.create()
  .text('https')
  .text('s')
  .optional() // 's' is optional
  .build()

// Repetition
const repeatPattern = RegexBuilder.create()
  .digit()
  .exactly(3) // Exactly 3 digits
  .text('-')
  .digit()
  .between(2, 4) // Between 2-4 digits
  .letter()
  .atLeast(1) // At least 1 letter
  .build()

// Common quantifiers
const quantifierPattern = RegexBuilder.create()
  .letter()
  .optional() // ? (0 or 1)
  .digit()
  .oneOrMore() // + (1 or more)
  .whitespace()
  .zeroOrMore() // * (0 or more)
  .build()
```

### Character Classes

```typescript
// Character sets
const charSetPattern = RegexBuilder.create()
  .oneOf('aeiou') // Match any vowel
  .noneOf('xyz') // Match anything except x, y, z
  .range('a', 'z') // Match a-z
  .range('0', '9') // Match 0-9
  .build()

// Anchors
const anchorPattern = RegexBuilder.create()
  .startOfLine() // ^
  .text('hello')
  .endOfLine() // $
  .build()

// Word boundaries
const boundaryPattern = RegexBuilder.create()
  .wordBoundary() // \b
  .text('word')
  .wordBoundary()
  .build()
```

### Grouping and Alternation

```typescript
// Grouping
const groupPattern = RegexBuilder.create()
  .group((builder) => builder.digits().exactly(3))
  .text('-')
  .group((builder) => builder.digits().exactly(2))
  .build()

// Non-capturing groups
const nonCapturingPattern = RegexBuilder.create()
  .nonCapturingGroup((builder) =>
    builder.text('Mr').or((inner) => inner.text('Mrs')),
  )
  .text('\\.')
  .whitespace()
  .letters()
  .build()

// Alternation (OR)
const alternationPattern = RegexBuilder.create()
  .text('cat')
  .or((builder) => builder.text('dog'))
  .or((builder) => builder.text('bird'))
  .build()
```

## Common Patterns

The library includes built-in patterns for common use cases:

```typescript
// Email validation
const emailValidator = RegexBuilder.create().email().build()

// Phone number validation
const phoneValidator = RegexBuilder.create().phone().build()

// URL validation
const urlValidator = RegexBuilder.create().url().build()

// IP Address validation
const ipValidator = RegexBuilder.create().ipAddress().build()

// Credit card validation
const creditCardValidator = RegexBuilder.create().creditCard().build()

// Hex color validation
const hexColorValidator = RegexBuilder.create().hexColor().build()
```

## Flags

```typescript
const flaggedPattern = RegexBuilder.create()
  .text('hello')
  .global() // g flag - find all matches
  .ignoreCase() // i flag - case insensitive
  .multiline() // m flag - multiline matching
  .dotAll() // s flag - dot matches newlines
  .unicode() // u flag - unicode support
  .sticky() // y flag - sticky matching
  .build()
```

## Testing and Matching

```typescript
const pattern = RegexBuilder.create().email().global().build()

// Test if pattern matches
console.log(pattern.test('user@example.com')) // true

// Find first match
const match = 'Contact: user@example.com'.match(pattern)
console.log(match) // ['user@example.com']

// Find all matches (requires global flag)
const text = 'Emails: user1@example.com, user2@example.com'
const allMatches = Array.from(text.matchAll(pattern))
console.log(allMatches) // [['user1@example.com'], ['user2@example.com']]

// Replace matches
const cleanText = 'Email: user@example.com'.replace(pattern, '[REDACTED]')
console.log(cleanText) // 'Email: [REDACTED]'

// Split text
const parts = 'word1,word2,word3'.split(RegexBuilder.create().text(',').build())
console.log(parts) // ['word1', 'word2', 'word3']
```

## Advanced Examples

### Form Validation

```typescript
class FormValidator {
  private static readonly patterns = {
    username: RegexBuilder.create()
      .startOfLine()
      .letter()
      .group((builder) =>
        builder
          .range('a-z')
          .optional()
          .range('A-Z')
          .optional()
          .digits()
          .optional()
          .text('_')
          .optional(),
      )
      .between(2, 19)
      .endOfLine()
      .build(),

    password: RegexBuilder.create()
      .startOfLine()
      .group((builder) =>
        builder.oneOf('A-Za-z0-9!@#$%^&*()_+-=[]{}|;:,.<>?').atLeast(8),
      )
      .endOfLine()
      .build(),

    zipCode: RegexBuilder.create()
      .startOfLine()
      .digits()
      .exactly(5)
      .group((builder) => builder.text('-').digits().exactly(4))
      .optional()
      .endOfLine()
      .build(),
  }

  static validateUsername(username: string): boolean {
    return this.patterns.username.test(username)
  }

  static validatePassword(password: string): boolean {
    return this.patterns.password.test(password)
  }

  static validateZipCode(zipCode: string): boolean {
    return this.patterns.zipCode.test(zipCode)
  }
}
```

### Log Parser

```typescript
const logParser = RegexBuilder.create()
  .startOfLine()
  .group((builder) => builder.digits().exactly(4)) // year
  .text('-')
  .group((builder) => builder.digits().exactly(2)) // month
  .text('-')
  .group((builder) => builder.digits().exactly(2)) // day
  .whitespace()
  .group((builder) => builder.digits().exactly(2)) // hour
  .text(':')
  .group((builder) => builder.digits().exactly(2)) // minute
  .text(':')
  .group((builder) => builder.digits().exactly(2)) // second
  .whitespaces()
  .group((builder) => builder.oneOf('INFO|WARN|ERROR|DEBUG')) // level
  .whitespaces()
  .group((builder) => builder.anyChar().oneOrMore()) // message
  .build()

const logEntry = '2023-12-01 14:30:25 ERROR Database connection failed'
const match = logEntry.match(logParser)

if (match) {
  const [, year, month, day, hour, minute, second, level, message] = match
  console.log({
    timestamp: `${year}-${month}-${day} ${hour}:${minute}:${second}`,
    level,
    message,
  })
}
```

## Performance Best Practices

### Pattern Caching

```typescript
class RegexCache {
  private static cache = new Map<string, RegExp>()

  static getEmailValidator(): RegExp {
    const key = 'email'
    if (!this.cache.has(key)) {
      this.cache.set(key, RegexBuilder.create().email().build())
    }
    return this.cache.get(key)!
  }
}

// Reuse compiled patterns
const emailRegex = RegexCache.getEmailValidator()
const emails = ['test1@example.com', 'test2@example.com']
emails.forEach((email) => console.log(emailRegex.test(email)))
```

### Pattern Cloning

```typescript
// Create a base pattern and clone for variations
const basePattern = RegexBuilder.create().startOfLine().letters().endOfLine()

const strictPattern = basePattern.clone().exactly(5)
const flexiblePattern = basePattern.clone().between(3, 10)
```

## Error Handling

The library includes built-in validation to catch regex errors early:

```typescript
try {
  const invalidPattern = RegexBuilder.create()
    .text('(') // Unmatched parenthesis
    .build()
} catch (error) {
  console.error('Regex build failed:', error.message)
  // "Invalid regex pattern: Unmatched parentheses detected"
}
```

## API Reference

### Core Classes

- **RegexBuilder**: Main builder class for constructing regex patterns
- **ComponentFactory**: Factory for creating regex components
- **CommonPatterns**: Pre-built common regex patterns
- **RegexValidator**: Validates regex patterns before compilation

### Character Classes

- `digit()` - Match single digit (\d)
- `digits()` - Match one or more digits (\d+)
- `letter()` - Match single letter ([a-zA-Z])
- `letters()` - Match one or more letters ([a-zA-Z]+)
- `word()` - Match word character (\w)
- `words()` - Match one or more word characters (\w+)
- `whitespace()` - Match whitespace (\s)
- `whitespaces()` - Match one or more whitespaces (\s+)
- `anyChar()` - Match any character (.)

### Quantifiers

- `optional()` - Zero or one (?)
- `oneOrMore()` - One or more (+)
- `zeroOrMore()` - Zero or more (\*)
- `exactly(n)` - Exactly n times ({n})
- `between(min, max)` - Between min and max times ({min,max})
- `atLeast(n)` - At least n times ({n,})

### Character Sets

- `oneOf(chars)` - Match any character in set ([chars])
- `noneOf(chars)` - Match any character not in set ([^chars])
- `range(from, to)` - Match character range ([from-to])

### Anchors

- `startOfLine()` - Start of line (^)
- `endOfLine()` - End of line ($)
- `wordBoundary()` - Word boundary (\b)

### Grouping

- `group(builder)` - Capturing group ()
- `nonCapturingGroup(builder)` - Non-capturing group (?:)

### Flags

- `global()` - Global flag (g)
- `ignoreCase()` - Case insensitive flag (i)
- `multiline()` - Multiline flag (m)
- `dotAll()` - Dot all flag (s)
- `unicode()` - Unicode flag (u)
- `sticky()` - Sticky flag (y)

### Common Patterns

- `email()` - Email address pattern
- `url()` - URL pattern
- `phone()` - Phone number pattern
- `ipAddress()` - IP address pattern
- `creditCard()` - Credit card pattern
- `hexColor()` - Hex color pattern

## Architecture

This library is built with professional software architecture principles:

- **SOLID Principles**: Single responsibility, open/closed, interface segregation
- **Design Patterns**: Builder, Factory, Strategy, Composite patterns
- **Clean Code**: Readable, maintainable, and well-documented code
- **Type Safety**: Full TypeScript support with strict typing
- **Error Handling**: Comprehensive validation and error reporting
- **Testing**: High test coverage with unit and integration tests

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing
