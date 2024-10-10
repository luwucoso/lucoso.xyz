
# don't mind this, just a simple thing to watch changes for me

function build {
  tsc && sass src:dist --update
  cp -r src/* dist/ && find dist/ -type f -name "*.scss" -delete && find dist/ -type f -name "*.ts" -delete
}

function watch {
  while true; do
    inotifywait -m -e modify,create,delete src | while read -r filename; do
      build
    done
  done
}

build
watch