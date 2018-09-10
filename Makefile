install:
	bash -c "([ -d 'node_modules' ] || npm i -ddd)"

build:
	make install && npm update -ddd && npm rebuild node-sass && npm run build
