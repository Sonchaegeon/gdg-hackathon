echo "git pull..."
git pull origin main

echo "docker-compose down..."
sudo docker-compose down

echo "docker rmi..."
sudo docker rmi -f gdg-11-nest

echo "docker-compose up..."
sudo docker-compose up -d