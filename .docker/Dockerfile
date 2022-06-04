FROM node:16-slim
RUN npm i -g netlify-cli && apt-get update && apt-get install -y git-core
ENTRYPOINT ["/bin/bash"]
WORKDIR "/app"
# --rm -it -p 3000:3000 -p 9999:9999 --entrypoint /bin/bash -v $(pwd):/app -w /app