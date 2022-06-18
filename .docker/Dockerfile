FROM node:16-slim
RUN npm i -g netlify-cli
RUN apt-get update && apt-get install -y git-core
# https://stackoverflow.com/a/72575533/514411
RUN apt-get install -y git-core libfontconfig1
RUN apt-get install -y libnss3-dev
ENTRYPOINT ["/bin/bash"]
WORKDIR "/app"
# --rm -it -p 3000:3000 -p 9999:9999 --entrypoint /bin/bash -v $(pwd):/app -w /app
