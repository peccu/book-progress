# docker build -t netlify .docker
docker run --rm -it -p 3000:3000 -p 9999:9999 -v $(pwd):/app netlify
