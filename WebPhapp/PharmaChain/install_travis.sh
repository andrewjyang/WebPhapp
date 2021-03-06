set -e
cd ~/build

#Ethereum Base Layer
apt-add-repository -y ppa:ethereum/ethereum
apt-get -y update
apt-get -y install ethereum

#Node version manager
apt-get -y install curl
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
nvm install 10.0
nvm use 10.0

#npm install. This part is currently buggy, and produces warnings
apt-get -y install npm
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
apt-get install -y nodejs
cd ~/build/Pharmachain/WebPhapp/WebPhapp/PharmaChain
# npm config set prefix /usr
sudo npm config set prefix /usr
sudo npm install truffle@4.1.14 -g --allow-root
sudo npm install web3@1.0.0-beta.37 --allow-root --unsafe-perm=true
sudo npm install @babel/runtime@latest
sudo npm install -g ethereumjs-testrpc

#ln -s /usr/bin/nodejs /usr/bin/node
export NODE_PATH=/usr/lib/node_modules

cd ~/build
echo "In top level directory"
pwd
echo "Repos:"
ls

cd ~/build/Pharmachain/WebPhapp/WebPhapp/PharmaChain
echo "In PharmaChain, directories: "
ls

echo "Viewing sudo global npm repository"
sudo npm list -g --depth=0
echo "Viewing local npm repository"
npm list --depth=0


#WebPhapp NPM Initialization
cd ~/build/Pharmachain/WebPhapp/WebPhapp/backend
sudo npm install
cd ~/build/Pharmachain/WebPhapp/WebPhapp/client
sudo npm install
cd ~/build/Pharmachain/WebPhapp/WebPhapp/PharmaChain

