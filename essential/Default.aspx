<%@ Page Language="C#" %>

<script runat="server">
    <%-- This demo page has no server side script --%>
</script>

<!DOCTYPE html>

<html lang="en">

<head>

<meta charset='utf-8' />

<title>Demo Home Page</title>

<link rel="stylesheet" type="text/css" href="css/StyleSheet.css" />

</head>

<body>

<div class="pad">

<form id="form1" runat="server">

<div>

<ul class="master_navigation" id="menu">
    <li><a href="sitestatistics/" target="_blank">SiteStatistics</a></li>
    <li><a href="statistics/" target="_blank">Statistics</a></li>
    <li><a href="source/" target="_blank">Source</a></li>
    <li><a href="search/" target="_blank">Search</a></li>
    <li><a href="searchtree/" target="_blank">SearchTree</a></li>
    <li><a href="textview/" target="_blank">TextView</a></li>
    <li><a href="filelist.aspx" target="_blank">FileList</a></li>
    <li><a href="autofile.aspx" target="_blank">AutoFile</a></li>
    <li><a href="images/autoimage.aspx" target="_blank">Images</a></li>
    <li><a href="blog/Default.aspx" target="_blank">Blog</a></li>
    <li><a href="experiments/index.html" target="_blank">Experiments</a></li>
</ul>

</div>

<div class="profile_pic"></div>



<p id ="first">
   Hi I am Isha Shah. I am pusuing Master's studies in Computer Science at Northeastern University. This website is developed as a part of Web Development course which I am taking under Prof. Jose Annunziato.
</p>

<hr />

<p>
    <button><a href="https://github.com/isha112/webdev" target="_blank">Link to Git</a></button>
</p>
    
<hr />

<p>
Here is a link to the
<a href="story/index.htm" target="_blank">Story Utility</a>
on this site so that you may explore this tool.
</p>

<p>
Here is a link to the
<a href="http://www.northeastern.edu/rasala/webstories.htm"
        target="_blank">Web Development Stories</a>
so that you may see a good collection of online documentation.
</p>

<p>
This provides a model for using stories for documentation and
for collections of experiments.
</p>

<hr />

<p>
None of the hints given above needs to be on your home page
downstream but it is convenient to have them here at startup.
</p>

<hr />



</form>

</div>

</body>
</html>
