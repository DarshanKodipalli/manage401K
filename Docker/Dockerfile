FROM ubuntu:latest

LABEL maintainer="darshan.kodipalli@gmail.com"

RUN apt-get update && apt-get upgrade -y
RUN apt-get install sudo
RUN sudo apt-get install -y curl wget
RUN curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
RUN apt-get install -y nodejs
RUN node -v
RUN npm install -g @angular/cli
RUN sudo DEBIAN_FRONTEND=noninteractive apt-get -y install mysql-server
RUN mkdir applicationFiles
EXPOSE 80 3000 4200