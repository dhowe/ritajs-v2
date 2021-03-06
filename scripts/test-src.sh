# this is a dirty hack until we can get mocha to work correctly with dynamic imports

check_err() {
    local exit_code=$1
    shift
    [[ $exit_code ]] && ((exit_code != 0)) && {
        printf '\nFATAL: %s\n' "$@" >&2
        exit "$exit_code"
    }
}

cp ./test/before.js /tmp/ || check_err $? "invalid state[1]"
sed 's%\.\./dist/rita%../src/rita%g' /tmp/before.js > ./test/before.js
path=`head -n1 ./test/before.js`
echo Running source tests with: $path

if [ -z "$1" ]
then
    NODE_ENV=dev mocha -r esm
else
    NODE_ENV=dev mocha -r esm -g $1
fi

cp /tmp/before.js ./test/ || check_err $? "invalid state[2]"

trap 'cp /tmp/before.js ./test/' SIGTERM SIGINT EXIT
