# trunc-text

[![Build Status](https://travis-ci.org/bevacqua/trunc-text.svg?branch=master)](https://travis-ci.org/bevacqua/trunc-text)

> truncate text by length, doesn't cut words

# install

using `npm`.

```shell
npm install -S trunc-text
```

# features

- fast
- truncates by complete words, not just by characters

# `trunc(text, limit)`

Returns the result of truncating the provided `text` by `limit`.

## `limit`

Maximum amount of text characters allowed. When the `limit` is reached, the algorithm will trace back to the last word separator and trim the rest into a `…` glyph.

# license

MIT

[1]: http://github.com/bevacqua/insane
