# extended-7-1
The 7-1 pattern as described at [Sass Guidelines](https://sass-guidelin.es/#architecture) 
is used for the templates. The orginal boilerplate by Kitty Giraudel can be found here [here](https://github.com/KittyGiraudel/sass-boilerplate).

Extends the basic-7-1 template by some default scss code, like [normalize.css](https://github.com/necolas/normalize.css).

## Development

### Node.js environment

The prod and dev css files are created in the dist directory.
```
  npm install
  npm run build // build dev and prod 
  npm run build:prod // build prod only
```

### Docker-only Environment

Create dev and prod css without installing Node.js and npm in the dist directory. 

```
  docker compose run --rm --service-ports sass
```
