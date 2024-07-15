git fetch
git reset origin/dev --hard

source venv/bin/activate
python3.12 -m pip install -r requirements.txt

cd frontend
npm run build

cd /home/React-DRF-Task-Manager-App

# Set appropriate permissions for repo
sudo chown -R ec2-user:nginx /home/React-DRF-Task-Manager-App
chmod -R 770 /home/React-DRF-Task-Manager-App

# Set appropriate permissions for React build files
chmod -R 750 /home/React-DRF-Task-Manager-App/frontend/build
