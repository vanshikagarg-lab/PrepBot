# Use official Node.js 18 image with Debian Bullseye
FROM node:18-bullseye

# Install required system dependencies
RUN apt-get update && apt-get install -y \
  ffmpeg \
  wget \
  && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy backend source code into the container
COPY . /app

# Create directories for whisper binary and model
RUN mkdir -p /whisper.cpp/build /whisper.cpp/models

# Download precompiled whisper-cli binary from GitHub Releases
RUN wget -O /whisper.cpp/build/whisper-cli https://github.com/vanshikagarg-lab/PrepBot/releases/download/v1.0.0/whisper-cli \
    && chmod +x /whisper.cpp/build/whisper-cli

# Download model file from GitHub Releases (add your actual URL here!)
RUN wget -O /whisper.cpp/models/ggml-base.en.bin https://github.com/vanshikagarg-lab/PrepBot/releases/download/v1.0.0/ggml-base.en.bin

# Install Node.js dependencies
RUN npm install

# Build your backend
RUN npm run build

# Expose backend port
EXPOSE 3000

# Set environment variable for production mode
ENV NODE_ENV=production

# Start the backend server
CMD ["node", "dist/index.js"]
