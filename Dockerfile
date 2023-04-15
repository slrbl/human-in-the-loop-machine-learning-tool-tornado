FROM ruby:2.7

RUN apt-get update
RUN echo "y" | apt-get install libsqlite3-dev
RUN apt-get update && apt-get install -y build-essential nodejs
RUN apt-get -y install wget

RUN apt-get install -y build-essential tk-dev libncurses5-dev \
libncursesw5-dev libreadline6-dev libdb5.3-dev libgdbm-dev libsqlite3-dev \
libssl-dev libbz2-dev libexpat1-dev liblzma-dev zlib1g-dev libffi-dev

RUN wget https://www.python.org/ftp/python/3.8.2/Python-3.8.2.tgz

RUN tar zxf Python-3.8.2.tgz
WORKDIR /Python-3.8.2
RUN ./configure --enable-optimizations
RUN make -j4
RUN make altinstall

RUN apt-get -y install ruby ruby-dev
RUN apt-get -y install git
RUN apt-get install zlib1g-dev
RUN apt-get -y install libxml2
RUN apt-get update && apt-get install -y procps

RUN curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
RUN python3.8 get-pip.py
RUN pip install requests
RUN pip install sklearn
RUN pip install argparse
RUN pip install tensorflow
RUN pip install pillow

RUN mkdir /tornado
COPY . /tornado
WORKDIR /tornado
RUN gem install sqlite3 -v '1.3.13' --source 'https://rubygems.org/'
RUN gem install activesupport -v 6.1.7.3
RUN gem install globalid -v 0.4.2
RUN gem install rails
