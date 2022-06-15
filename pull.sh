git stash save \
    && git checkout master \
    && git pull \
    && git checkout me \
    && git merge master \
    && git stash pop
