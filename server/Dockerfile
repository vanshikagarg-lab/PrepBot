# Use official Node.js 18 image with Debian Bullseye
FROM node:18-bullseye

# Install system dependencies required for whisper.cpp and audio processing
RUN apt-get update && apt-get install -y \
  ffmpeg \
  git \
  build-essential \
  cmake \
  wget \
  && rm -rf /var/lib/apt/lists/*

# Set working directory inside container
WORKDIR /app

# Copy backend source code into the container
COPY . /app

# Clone whisper.cpp repo inside the container
RUN git clone https://github.com/ggerganov/whisper.cpp.git /whisper.cpp

# Build whisper-cli binary
RUN mkdir -p /whisper.cpp/build && cd /whisper.cpp/build && cmake .. && make

# Create models directory inside whisper.cpp repo
RUN mkdir -p /whisper.cpp/models

# Copy your pre-downloaded model into the container
COPY ./whisper-cli/models/ggml-base.en.bin /whisper.cpp/models/ggml-base.en.bin

# Install Node.js dependencies
RUN npm install

# Build your backend (adjust if you use a different build command)
RUN npm run build

# Expose backend port (adjust if your server listens on a different port)
EXPOSE 3000

# Set environment variable for production mode
ENV NODE_ENV production

# Start the backend server
CMD ["node", "dist/index.js"]
