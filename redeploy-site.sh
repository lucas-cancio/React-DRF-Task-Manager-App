git fetch
git reset origin/main --hard

source venv/bin/activate
pip install -r requirements.txt

cd frontend
npm run build

sudo chown -R ec2-user:nginx build
chmod -R 750 build 