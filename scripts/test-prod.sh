echo "... building production"
yarn build >/dev/null 

echo "... testing production"
cp test/before.js /tmp/ 
sed 's%\.\./src/rita%../dist/rita%g' /tmp/before.js > test/before.js
#echo "test.prod:" && head -n1 test/before.js
yarn test.prod 
cp /tmp/before.js test/
#echo "restored:" && head -n1 test/before.js
