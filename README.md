twitearth
=========

Mashup of Twitter and Google Maps

## Movie

http://youtu.be/luR0oPi8Zes

## Installation

Install npm.

```bash
sudo apt-get install git npm # Ubuntu 12.04
sudo apt-get install git npm nodejs-legacy # Ubuntu 12.10
```

Clone the repository.

```bash
git clone https://github.com/taroyabuki/twitearth.git
```

Install dependent libraries. To run on [AppFog](https://www.appfog.com/), you should install libraries before `af update`.

```bash
cd twitearth
npm install socket.io express
cd node_modules
git clone https://github.com/horixon/immortal-ntwitter.git
cd ..
```

Make config.js that contains Twitter keys.

```bash
cp config.template config.js
vi config.js
```

## Running

```bash
node server.js
```

Request `http://localhost:3000/` from web browsers.

### PaaS

Tested PaaS are following:

- [AppFog](https://www.appfog.com/)

## Licence

Copyright 2013 Taro YABUKI

Licensed under the GNU General Public License, Version 3.0.
See COPYING for more details.

OneMaps is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

OneMaps is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with OneMaps. If not, see <http://www.gnu.org/licenses/>.
