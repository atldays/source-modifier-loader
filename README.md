# source-modifier-loader

[![npm version](https://img.shields.io/npm/v/source-modifier-loader.svg)](https://www.npmjs.com/package/source-modifier-loader)
[![npm downloads](https://img.shields.io/npm/dm/source-modifier-loader.svg)](https://www.npmjs.com/package/source-modifier-loader)
[![Build Status](https://img.shields.io/github/actions/workflow/status/atldays/source-modifier-loader/ci.yml?branch=master)](https://github.com/atldays/source-modifier-loader/actions)
[![Coverage Status](https://img.shields.io/codecov/c/github/atldays/source-modifier-loader/main.svg)](https://codecov.io/github/atldays/source-modifier-loader)

> A customizable Webpack/Rspack loader to modify source files on-the-fly with your own callback function.

---

## 📦 Installation

```sh
npm install source-modifier-loader --save-dev
# or
yarn add source-modifier-loader --dev
```

---

## 🚀 Usage

### Webpack / Rspack configuration

```javascript
module.exports = {
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'source-modifier-loader',
                        options: {
                            modify: (source, resourcePath) => {
                                return source.replace('foo', 'bar');
                            },
                        },
                    }
                ],
            },
        ],
    },
};
```

---

## ⚙️ Loader Options

| Name     | Type                                              | Description                                            |
|----------|---------------------------------------------------|--------------------------------------------------------|
| `modify` | `(source: string, resourcePath: string) => string \| void \| null \| undefined` | A callback function to modify source contents.         |

### Arguments provided to `modify` callback:

- `source` _(string)_: Original file content.
- `resourcePath` _(string)_: Absolute path to the file being processed.

If the callback returns a string, the original content will be replaced by it. If the callback returns `null`, `undefined`, or anything except a string, the original content remains unchanged.

---

## 🚨 When to use

Use this loader when you need to:

- Dynamically modify file contents based on file path or source code.
- Conditionally insert or alter specific content in source files before other loaders.
- Easily implement custom transformations without writing separate loaders.

---

## 🧪 Testing

This loader includes tests written with Jest:

```bash
npm test
```

---

## 🤝 Compatibility

- ✅ Webpack 5
- ✅ Rspack

Tested and fully compatible with both bundlers.

---

## 🔧 Development

Install dependencies:

```bash
npm install
```

Run tests:

```bash
npm test
```

Build the loader:

```bash
npm run build
```

---

## 📝 Contributing

Feel free to open issues and submit pull requests!

---

**Made with ❤️ by [Your Name or Organization]**

