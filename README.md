<h1>Tornado Active Learning</h1>
<h2>What is Tornado</h2>
<p>Tornado is an open source human in the loop machine learning tool. It helps you label your dataset on the fly while training your model through a simple user interface.</p>

<div align="center"><img src="https://media.licdn.com/dms/image/C5612AQFG1h7oypt4tA/article-inline_image-shrink_1500_2232/0?e=1568246400&v=beta&t=MLTa63NzMrSFyupkUMSqdPVd_Uzm8erYq8I1zqsMHSE" width="70%"/></div>

<h3>Build Tornado Docker image</h3>
<code>$ docker build . -t tornado</code>

<h3>Launch Tornado image</h3>
<code>$ docker run -p 3000:3000 tornado</code>

<h2>To launch Tornado</h2>
<code>$ sh ./launch_tornado.sh</code>
<p>Tornado will then be available at http://0.0.0.0:3000</p>
  
<h2>To stop Tornado</h2>
<code>$ sh ./stop_tornado.sh</code>
<h2>Details and how to use</h2>
All information are available at:
<br>
https://www.linkedin.com/pulse/tornado-zero-coding-active-learning-ml-tool-walid-daboubi/
